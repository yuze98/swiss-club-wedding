/**
 * Validates a guest name:
 * - Must be a non-empty string
 * - Only letters, spaces, hyphens, and apostrophes allowed
 * - No special characters or numbers
 * - Minimum 2 characters, maximum 100
 */
export function validateGuestName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Name is required.' };
  }

  const trimmed = name.trim();

  if (trimmed.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters.' };
  }

  if (trimmed.length > 100) {
    return { valid: false, error: 'Name must be 100 characters or less.' };
  }

  // Allow letters (including accented), spaces, hyphens, apostrophes
  const validNamePattern = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/;

  if (!validNamePattern.test(trimmed)) {
    return { valid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes.' };
  }

  return { valid: true, error: null };
}
