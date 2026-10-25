import type { LogEntry } from '../types';

const LATENCY_MS = 1500;
const FAILURE_RATE = 0.1;

// Gerçek sunucu yok: POST /api/logs isteğini taklit ediyoruz.
export async function postLog(_entry: LogEntry): Promise<{ success: true }> {
  await new Promise((resolve) => setTimeout(resolve, LATENCY_MS));

  if (Math.random() < FAILURE_RATE) {
    throw new Error('Sunucuya ulaşılamadı');
  }

  return { success: true };
}