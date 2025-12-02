/**
 * Session and Connection Types for WebSocket Server
 */

import type { WebSocket } from 'ws';
import type { UserInfo } from './events';

export interface Session {
  id: string;
  socket: WebSocket;
  user: UserInfo;
  connectedAt: number;
  lastActivity: number;
  currentDiscussions: Set<string>;
  metadata?: Record<string, unknown>;
}

export interface Discussion {
  id: string;
  storeID: string;
  orderID?: string;
  topic?: string;
  participants: Map<string, Session>;
  createdAt: number;
  lastMessageAt: number;
  messageCount: number;
}

export interface ServerState {
  sessions: Map<string, Session>;
  discussions: Map<string, Discussion>;
  guestNames: Set<string>;
}

export interface ServerConfig {
  port: number;
  heartbeatInterval: number;
  sessionTimeout: number;
  maxMessagesPerMinute: number;
  maxMessageLength: number;
  enableLogging: boolean;
}

export const DEFAULT_CONFIG: ServerConfig = {
  port: 4000,
  heartbeatInterval: 30000,
  sessionTimeout: 300000, // 5 minutes
  maxMessagesPerMinute: 60,
  maxMessageLength: 5000,
  enableLogging: true,
};
