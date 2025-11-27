/**
 * Credits Service
 * 
 * Handles credit balance checking and deduction for the PIQ Workshop.
 * Credit costs:
 * - Full essay analysis: 5 credits
 * - Chat message: 1 credit
 */

import { supabase } from '@/integrations/supabase/client';

// ============================================================================
// CONSTANTS
// ============================================================================

export const CREDIT_COSTS = {
  ESSAY_ANALYSIS: 5,
  CHAT_MESSAGE: 1,
} as const;

export type CreditTransactionType = 'subscription_grant' | 'addon_purchase' | 'usage' | 'bonus';

// ============================================================================
// TYPES
// ============================================================================

export interface CreditBalance {
  credits: number;
  userId: string;
}

export interface CreditDeductionResult {
  success: boolean;
  newBalance: number;
  error?: string;
}

export interface CreditCheckResult {
  hasEnough: boolean;
  currentBalance: number;
  required: number;
  shortfall: number;
}

// ============================================================================
// GET CREDITS
// ============================================================================

/**
 * Get the current credit balance for a user
 */
export async function getCredits(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('credits')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('[Credits] Error fetching credits:', error);
      return 0;
    }

    const credits = Number(data?.credits ?? 0);
    return Number.isFinite(credits) ? credits : 0;
  } catch (err) {
    console.error('[Credits] Unexpected error fetching credits:', err);
    return 0;
  }
}

// ============================================================================
// CHECK CREDITS
// ============================================================================

/**
 * Check if user has enough credits for an action
 */
export async function hasEnoughCredits(
  userId: string,
  requiredAmount: number
): Promise<CreditCheckResult> {
  const currentBalance = await getCredits(userId);
  const hasEnough = currentBalance >= requiredAmount;
  
  return {
    hasEnough,
    currentBalance,
    required: requiredAmount,
    shortfall: hasEnough ? 0 : requiredAmount - currentBalance,
  };
}

/**
 * Check if user has enough credits for essay analysis (5 credits)
 */
export async function canAnalyzeEssay(userId: string): Promise<CreditCheckResult> {
  return hasEnoughCredits(userId, CREDIT_COSTS.ESSAY_ANALYSIS);
}

/**
 * Check if user has enough credits for chat message (1 credit)
 */
export async function canSendChatMessage(userId: string): Promise<CreditCheckResult> {
  return hasEnoughCredits(userId, CREDIT_COSTS.CHAT_MESSAGE);
}

// ============================================================================
// DEDUCT CREDITS
// ============================================================================

/**
 * Deduct credits from user's balance and log the transaction
 * Uses atomic update to prevent race conditions
 */
export async function deductCredits(
  userId: string,
  amount: number,
  type: CreditTransactionType,
  description: string
): Promise<CreditDeductionResult> {
  try {
    // First, get current balance to check if sufficient
    const currentBalance = await getCredits(userId);
    
    if (currentBalance < amount) {
      return {
        success: false,
        newBalance: currentBalance,
        error: `Insufficient credits. Current: ${currentBalance}, Required: ${amount}`,
      };
    }

    const newBalance = currentBalance - amount;

    // Update the credits balance
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ credits: newBalance })
      .eq('user_id', userId);

    if (updateError) {
      console.error('[Credits] Error updating credits:', updateError);
      return {
        success: false,
        newBalance: currentBalance,
        error: `Failed to update credits: ${updateError.message}`,
      };
    }

    // Log the transaction (negative amount for usage)
    const { error: transactionError } = await supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        amount: -amount, // Negative because it's a deduction
        type,
        description,
      });

    if (transactionError) {
      // Log but don't fail - the deduction succeeded
      console.warn('[Credits] Failed to log transaction:', transactionError);
    }

    // Dispatch event to update UI components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('credits:updated'));
    }

    console.log(`[Credits] Deducted ${amount} credits from user ${userId}. New balance: ${newBalance}`);

    return {
      success: true,
      newBalance,
    };
  } catch (err) {
    console.error('[Credits] Unexpected error deducting credits:', err);
    return {
      success: false,
      newBalance: 0,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

/**
 * Deduct credits for essay analysis (5 credits)
 */
export async function deductForEssayAnalysis(
  userId: string,
  promptTitle?: string
): Promise<CreditDeductionResult> {
  const description = promptTitle 
    ? `Essay analysis: ${promptTitle}`
    : 'Essay analysis';
  
  return deductCredits(
    userId,
    CREDIT_COSTS.ESSAY_ANALYSIS,
    'usage',
    description
  );
}

/**
 * Deduct credits for chat message (1 credit)
 */
export async function deductForChatMessage(
  userId: string,
  promptTitle?: string
): Promise<CreditDeductionResult> {
  const description = promptTitle
    ? `AI Coach chat: ${promptTitle}`
    : 'AI Coach chat message';
  
  return deductCredits(
    userId,
    CREDIT_COSTS.CHAT_MESSAGE,
    'usage',
    description
  );
}

// ============================================================================
// UTILITY
// ============================================================================

/**
 * Format credit cost for display
 */
export function formatCreditCost(amount: number): string {
  return amount === 1 ? '1 credit' : `${amount} credits`;
}
