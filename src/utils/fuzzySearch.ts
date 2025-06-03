
/**
 * Calculates the Levenshtein distance between two strings
 * Used for fuzzy matching to handle typos and similar text
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => 
    Array(str1.length + 1).fill(null)
  );

  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[str2.length][str1.length];
}

/**
 * Calculates a fuzzy match score between two strings
 * Returns a score between 0 and 1, where 1 is an exact match
 */
export function fuzzyMatchScore(searchTerm: string, target: string): number {
  if (!searchTerm || !target) return 0;
  
  const search = searchTerm.toLowerCase().trim();
  const text = target.toLowerCase().trim();
  
  // Exact match gets highest score
  if (search === text) return 1;
  
  // Contains match gets high score
  if (text.includes(search)) {
    return 0.9 - (Math.abs(text.length - search.length) / text.length) * 0.1;
  }
  
  // Starts with match gets good score
  if (text.startsWith(search)) {
    return 0.8;
  }
  
  // Fuzzy match using Levenshtein distance
  const distance = levenshteinDistance(search, text);
  const maxLength = Math.max(search.length, text.length);
  
  if (maxLength === 0) return 1;
  
  const similarity = 1 - (distance / maxLength);
  
  // Only consider it a match if similarity is above threshold
  return similarity > 0.6 ? similarity * 0.7 : 0;
}

/**
 * Performs fuzzy search on a text value
 * Returns true if the search term fuzzy matches the text
 */
export function fuzzyMatch(searchTerm: string, target: string, threshold: number = 0.3): boolean {
  return fuzzyMatchScore(searchTerm, target) >= threshold;
}

/**
 * Searches for partial words within a text
 * Handles cases like "stattion" matching "station"
 */
export function partialWordMatch(searchTerm: string, target: string): boolean {
  if (!searchTerm || !target) return false;
  
  const search = searchTerm.toLowerCase().trim();
  const text = target.toLowerCase().trim();
  
  // Split both into words
  const searchWords = search.split(/\s+/);
  const targetWords = text.split(/\s+/);
  
  // Check if any search word fuzzy matches any target word
  return searchWords.some(searchWord => 
    targetWords.some(targetWord => 
      fuzzyMatchScore(searchWord, targetWord) >= 0.5
    )
  );
}
