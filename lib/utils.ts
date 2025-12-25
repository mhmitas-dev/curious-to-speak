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

/**
 * @param min Minimum Number
 * @param max Maximum Number
 * @returns {number} Returns a random integer between min and max (inclusive).
 */
export function getRandomInt(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;
}

/**
 * A simple helper function to generate a random user identity.
 */
export function generateRandomUserId() {
  return `test-identity-${String(Math.random() * 100_000).slice(0, 5)}` as const;
}