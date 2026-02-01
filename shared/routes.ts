import { z } from 'zod';

export const api = {};
export const errorSchemas = {};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  return path;
}
