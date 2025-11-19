/**
 * Sanitization utilities for ChefShare
 * These functions help prevent XSS attacks by escaping HTML special characters
 * 
 * IMPORTANT: In production, sanitization should happen on both frontend AND backend
 * This is just the frontend layer of defense
 */

/**
 * Escapes HTML special characters to prevent XSS attacks
 * Converts: < > & " ' / to their HTML entity equivalents
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return input.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Sanitizes user input for display in the UI
 * Trims whitespace and escapes HTML
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return sanitizeHtml(input.trim());
}

/**
 * Sanitizes an array of strings
 */
export function sanitizeArray(arr: string[]): string[] {
  return arr.map(item => sanitizeInput(item));
}

/**
 * Removes potentially dangerous characters from URLs
 * This is a basic implementation - in production, use a proper URL validation library
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  
  // Remove javascript: protocol and other dangerous protocols
  const dangerous = /^(javascript|data|vbscript):/i;
  if (dangerous.test(url)) {
    return '';
  }
  
  return url.trim();
}

/**
 * Sanitizes text content but preserves line breaks
 * Useful for multi-line content like recipe steps
 */
export function sanitizeMultiline(input: string): string {
  if (!input) return '';
  
  // Split by line breaks, sanitize each line, then rejoin
  return input
    .split('\n')
    .map(line => sanitizeHtml(line.trim()))
    .join('\n');
}
