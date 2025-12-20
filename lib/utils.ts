import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Generates two-letter initials from a user's name for a fallback avatar.
 * 
 * @param {string} name - The user's full name (e.g., "John Doe").
 * @returns {string} Two uppercase letters (or '??' if no valid name).
 */
export function getAvatarInitials(name: string) {
  if (!name || typeof name !== 'string') {
    return '??';
  }

  // Split on whitespace and filter out empty parts
  const parts = name.trim().split(/\s+/).filter(part => part.length > 0);

  if (parts.length === 0) {
    return '??';
  }

  if (parts.length === 1) {
    // Single word: take first two letters
    return parts[0].slice(0, 2).toUpperCase();
  }

  // Multiple words: first letter of first + first letter of last
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}