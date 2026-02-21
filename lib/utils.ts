import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standard utility for merging tailwind classes.
 * It merges 'clsx' logic with 'tailwind-merge' to handle
 * conflicting classes (e.g., 'p-4 p-2' becomes 'p-2').
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}