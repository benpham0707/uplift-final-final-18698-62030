/**
 * Text Processing Utilities
 *
 * Common text manipulation functions used by feature detectors.
 */

/**
 * Split text into paragraphs
 *
 * @param text - Full text
 * @returns Array of paragraphs (empty paragraphs removed)
 */
export function splitIntoParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
}

/**
 * Split text into sentences
 *
 * @param text - Text to split
 * @returns Array of sentences
 */
export function splitIntoSentences(text: string): string[] {
  // Split on period, exclamation, question mark followed by space or end
  return text
    .split(/[.!?]+(?:\s+|$)/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

/**
 * Find pattern matches in text
 *
 * @param text - Text to search
 * @param patterns - Array of regex patterns or strings
 * @returns Array of matches
 */
export function findMatches(
  text: string,
  patterns: Array<RegExp | string>
): string[] {
  const matches: string[] = [];

  patterns.forEach(pattern => {
    if (typeof pattern === 'string') {
      // String literal search
      if (text.toLowerCase().includes(pattern.toLowerCase())) {
        matches.push(pattern);
      }
    } else {
      // Regex search
      const regexMatches = text.match(pattern);
      if (regexMatches) {
        matches.push(...regexMatches);
      }
    }
  });

  return matches;
}

/**
 * Count words in text
 *
 * @param text - Text to count
 * @returns Word count
 */
export function countWords(text: string): number {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Extract quotes from text
 *
 * @param text - Text containing quotes
 * @returns Array of quoted strings
 */
export function extractQuotes(text: string): Array<{
  quote: string;
  fullContext: string;
}> {
  const quotes: Array<{ quote: string; fullContext: string }> = [];

  // Match double quotes
  const doubleQuoteMatches = text.matchAll(/"([^"]+)"/g);
  for (const match of doubleQuoteMatches) {
    quotes.push({
      quote: match[1],
      fullContext: match[0]
    });
  }

  // Match single quotes (but not apostrophes)
  const singleQuoteMatches = text.matchAll(/'([^']{3,})'/g);
  for (const match of singleQuoteMatches) {
    quotes.push({
      quote: match[1],
      fullContext: match[0]
    });
  }

  return quotes;
}

/**
 * Get sentence containing substring
 *
 * @param text - Full text
 * @param substring - Substring to find
 * @returns Sentence containing substring, or null
 */
export function getSentenceContaining(text: string, substring: string): string | null {
  const sentences = splitIntoSentences(text);

  for (const sentence of sentences) {
    if (sentence.toLowerCase().includes(substring.toLowerCase())) {
      return sentence;
    }
  }

  return null;
}

/**
 * Get context around match (n sentences before and after)
 *
 * @param text - Full text
 * @param matchIndex - Character index of match
 * @param contextSize - Number of sentences before/after (default: 1)
 * @returns Context string
 */
export function getContext(text: string, matchIndex: number, contextSize: number = 1): string {
  const sentences = splitIntoSentences(text);

  // Find which sentence contains the match
  let charCount = 0;
  let targetSentenceIdx = 0;

  for (let i = 0; i < sentences.length; i++) {
    charCount += sentences[i].length + 1; // +1 for period
    if (charCount >= matchIndex) {
      targetSentenceIdx = i;
      break;
    }
  }

  // Get context window
  const startIdx = Math.max(0, targetSentenceIdx - contextSize);
  const endIdx = Math.min(sentences.length, targetSentenceIdx + contextSize + 1);

  return sentences.slice(startIdx, endIdx).join('. ') + '.';
}

/**
 * Normalize whitespace
 *
 * @param text - Text with irregular whitespace
 * @returns Text with normalized whitespace
 */
export function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Remove formatting artifacts (e.g., from PDF extraction)
 *
 * @param text - Text with artifacts
 * @returns Cleaned text
 */
export function removeArtifacts(text: string): string {
  return text
    .replace(/\r\n/g, '\n') // Normalize line endings
    .replace(/\u00A0/g, ' ') // Replace non-breaking spaces
    .replace(/[^\S\n]+/g, ' ') // Collapse horizontal whitespace
    .trim();
}
