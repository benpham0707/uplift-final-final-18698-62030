/**
 * PIQ Chat API Client
 *
 * Frontend client for calling the PIQ chat edge function
 * Handles API communication with Supabase backend
 */

import { supabase } from '@/lib/supabaseClient';
import { AnalysisResult } from '@/components/portfolio/extracurricular/workshop/backendTypes';
import { ChatMessage } from './piqChatService';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface PIQChatRequest {
  userMessage: string;
  essayText: string;
  promptId: string;
  promptText: string;
  promptTitle: string;
  analysisResult: AnalysisResult | null;
  conversationHistory?: ChatMessage[];
  options?: {
    currentScore: number;
    initialScore: number;
    hasUnsavedChanges: boolean;
    needsReanalysis: boolean;
    versionHistory?: Array<{ timestamp: number; nqi: number; note?: string }>;
    maxTokens?: number;
    temperature?: number;
  };
}

export interface PIQChatResponse {
  message: ChatMessage;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens?: number;
    cost: number;
  };
}

// ============================================================================
// API CLIENT
// ============================================================================

/**
 * Call the PIQ chat edge function
 */
export async function callPIQChatAPI(request: PIQChatRequest): Promise<PIQChatResponse> {
  console.log('🌐 Calling PIQ chat API...', {
    promptId: request.promptId,
    userMessage: request.userMessage.substring(0, 50) + '...',
    conversationLength: request.conversationHistory?.length || 0,
  });

  const startTime = Date.now();

  try {
    const { data, error } = await supabase.functions.invoke('piq-chat', {
      body: request,
    });

    const duration = Date.now() - startTime;

    if (error) {
      console.error('❌ PIQ Chat API Error:', error);
      throw new Error(`PIQ Chat API Error: ${error.message}`);
    }

    console.log('✅ PIQ chat response received', {
      duration: `${duration}ms`,
      messageLength: data.message?.content?.length || 0,
      cost: data.usage?.cost || 0,
    });

    return data as PIQChatResponse;
  } catch (error) {
    console.error('❌ PIQ Chat API call failed:', error);
    throw error;
  }
}
