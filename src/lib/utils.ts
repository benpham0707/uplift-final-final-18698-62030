import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Centralized API base and fetch helper
// If VITE_API_BASE is set, use it.
// Otherwise, if in DEV mode, use empty string (relative path to use Vite proxy).
// In production, we expect VITE_API_BASE to be set.
const API_BASE = ((import.meta as any)?.env?.VITE_API_BASE as string) || 
  ((import.meta as any)?.env?.DEV ? '' : '');

export async function apiFetch(path: string, init: RequestInit = {}) {
  // Warn if in production and no API base is set (unless using a same-domain proxy)
  if (!API_BASE && !(import.meta as any)?.env?.DEV && !path.startsWith('http')) {
     console.warn('Warning: VITE_API_BASE is not set in production. API calls to relative paths may fail if not proxied.');
  }

  const url = path.startsWith('http') ? path : `${API_BASE || ''}${path.startsWith('/') ? path : `/${path}`}`;
  return fetch(url, init);
}
