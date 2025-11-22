import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Centralized API base and fetch helper
// If VITE_API_BASE is set, use it.
// Otherwise, if in DEV mode, use empty string (relative path to use Vite proxy).
// Fallback to production URL only in build/production mode.
const API_BASE = ((import.meta as any)?.env?.VITE_API_BASE as string) || 
  ((import.meta as any)?.env?.DEV ? '' : 'https://uplift-final-final-18698.onrender.com');

export async function apiFetch(path: string, init: RequestInit = {}) {
  const url = `${API_BASE || ''}${path.startsWith('/') ? path : `/${path}`}`;
  // console.log('Fetching:', url); // Helpful for debugging
  return fetch(url, init);
}
