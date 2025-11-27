-- Credits Deduction Function
-- Provides atomic credit deduction with transaction logging
-- Returns the new balance, or -1 if insufficient credits

-- Function to atomically deduct credits
CREATE OR REPLACE FUNCTION deduct_credits(
  p_user_id uuid,
  p_amount integer,
  p_type text,
  p_description text
) RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_balance integer;
  v_new_balance integer;
BEGIN
  -- Get current balance with row lock to prevent race conditions
  SELECT credits INTO v_current_balance
  FROM public.profiles
  WHERE user_id = p_user_id
  FOR UPDATE;
  
  -- Check if user exists
  IF v_current_balance IS NULL THEN
    RETURN -1;
  END IF;
  
  -- Check if sufficient credits
  IF v_current_balance < p_amount THEN
    RETURN -1;
  END IF;
  
  -- Calculate new balance
  v_new_balance := v_current_balance - p_amount;
  
  -- Update the balance
  UPDATE public.profiles
  SET credits = v_new_balance
  WHERE user_id = p_user_id;
  
  -- Log the transaction
  INSERT INTO public.credit_transactions (user_id, amount, type, description)
  VALUES (p_user_id, -p_amount, p_type, p_description);
  
  RETURN v_new_balance;
END;
$$;

-- Function to check credit balance
CREATE OR REPLACE FUNCTION check_credits(
  p_user_id uuid,
  p_required_amount integer
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_balance integer;
BEGIN
  SELECT credits INTO v_current_balance
  FROM public.profiles
  WHERE user_id = p_user_id;
  
  IF v_current_balance IS NULL THEN
    RETURN false;
  END IF;
  
  RETURN v_current_balance >= p_required_amount;
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION deduct_credits(uuid, integer, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION check_credits(uuid, integer) TO authenticated;

-- Add comment for documentation
COMMENT ON FUNCTION deduct_credits IS 'Atomically deduct credits from a user balance and log the transaction. Returns new balance or -1 if insufficient.';
COMMENT ON FUNCTION check_credits IS 'Check if user has sufficient credits for an action.';
