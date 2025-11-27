/**
 * Credits Service - Barrel Export
 */

export {
  // Constants
  CREDIT_COSTS,
  
  // Types
  type CreditTransactionType,
  type CreditBalance,
  type CreditDeductionResult,
  type CreditCheckResult,
  
  // Functions
  getCredits,
  hasEnoughCredits,
  canAnalyzeEssay,
  canSendChatMessage,
  deductCredits,
  deductForEssayAnalysis,
  deductForChatMessage,
  formatCreditCost,
} from './creditsService';
