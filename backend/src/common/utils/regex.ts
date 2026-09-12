/**
 * Escapes special regex characters in a string to safely use in RegExp construction or MongoDB $regex queries.
 */
export function escapeRegex(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
