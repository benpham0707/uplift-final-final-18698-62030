/**
 * PIQ Chat Helper Functions
 *
 * Utility functions for conversation context and cost calculation
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

// ============================================================================
// CONVERSATION CONTEXT BUILDING
// ============================================================================

export function buildConversationContext(history: ChatMessage[]): string {
  if (history.length === 0) return '';

  // Only include last 6 messages to keep context manageable
  const recentHistory = history.slice(-6);

  return recentHistory
    .filter(msg => msg.role !== 'system')
    .map(msg => `**${msg.role === 'user' ? 'Student' : 'Coach'}**: ${msg.content}`)
    .join('\n\n');
}

// ============================================================================
// COST CALCULATION
// ============================================================================

export function calculateCost(usage: {
  input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens?: number;
}): number {
  // Claude Sonnet 4 pricing (as of 2025)
  // Input: $3.00 per million tokens
  // Output: $15.00 per million tokens
  // Cache read: $0.30 per million tokens (10x cheaper)

  const inputCost = (usage.input_tokens / 1_000_000) * 3.00;
  const outputCost = (usage.output_tokens / 1_000_000) * 15.00;
  const cacheCost = ((usage.cache_read_input_tokens || 0) / 1_000_000) * 0.30;

  const total = inputCost + outputCost + cacheCost;

  // Round to 6 decimal places
  return Math.round(total * 1_000_000) / 1_000_000;
}
