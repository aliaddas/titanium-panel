/**
 * Utility functions for the WebSocket server
 */

import type { UserInfo } from '../types';

// Guest name generation
const ADJECTIVES = [
  'Swift', 'Brave', 'Clever', 'Mysterious', 'Witty', 'Lucky', 'Daring',
  'Noble', 'Fierce', 'Shadowy', 'Lively', 'Quiet', 'Cheerful', 'Bold',
  'Cosmic', 'Crystal', 'Digital', 'Electric', 'Frozen', 'Golden', 'Hollow',
  'Iron', 'Jade', 'Lunar', 'Magnetic', 'Neon', 'Obsidian', 'Phantom',
];

const ANIMALS = [
  'Fox', 'Eagle', 'Lion', 'Raven', 'Wolf', 'Falcon', 'Panther', 'Hawk',
  'Cobra', 'Jaguar', 'Viper', 'Otter', 'Badger', 'Sparrow', 'Phoenix',
  'Dragon', 'Tiger', 'Bear', 'Dolphin', 'Owl', 'Crow', 'Lynx', 'Shark',
];

export function generateGuestName(usedNames: Set<string>): string {
  let attempts = 0;
  const maxAttempts = ADJECTIVES.length * ANIMALS.length;

  while (attempts < maxAttempts) {
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    const name = `guest_${adj}-${animal}`;

    if (!usedNames.has(name)) {
      return name;
    }
    attempts++;
  }

  // Fallback with UUID suffix
  return `guest_${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

export function generateID(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

export function createUserInfo(
  id: string,
  displayName: string,
  userType: UserInfo['userType'] = 'guest'
): UserInfo {
  return {
    id,
    displayName,
    userType,
    status: 'online',
    joinedAt: Date.now(),
  };
}

export function sanitizeMessage(message: string, maxLength: number): string {
  return message
    .trim()
    .slice(0, maxLength)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''); // Remove control characters
}

export class RateLimiter {
  private timestamps: Map<string, number[]> = new Map();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 60) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isRateLimited(sessionId: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    let requests = this.timestamps.get(sessionId) || [];
    requests = requests.filter(ts => ts > windowStart);
    requests.push(now);
    this.timestamps.set(sessionId, requests);

    return requests.length > this.maxRequests;
  }

  clear(sessionId: string): void {
    this.timestamps.delete(sessionId);
  }
}

export class Logger {
  private readonly enabled: boolean;
  private readonly prefix: string;

  constructor(prefix: string = '[WS]', enabled: boolean = true) {
    this.prefix = prefix;
    this.enabled = enabled;
  }

  info(message: string, ...args: unknown[]): void {
    if (this.enabled) {
      console.log(`${this.prefix} ℹ️  ${message}`, ...args);
    }
  }

  success(message: string, ...args: unknown[]): void {
    if (this.enabled) {
      console.log(`${this.prefix} ✅ ${message}`, ...args);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (this.enabled) {
      console.warn(`${this.prefix} ⚠️  ${message}`, ...args);
    }
  }

  error(message: string, ...args: unknown[]): void {
    if (this.enabled) {
      console.error(`${this.prefix} ❌ ${message}`, ...args);
    }
  }

  connection(action: 'connect' | 'disconnect', userId?: string): void {
    const emoji = action === 'connect' ? '🔵' : '🔴';
    const msg = action === 'connect' ? 'Connected' : 'Disconnected';
    this.info(`${emoji} ${msg}${userId ? `: ${userId}` : ''}`);
  }
}
