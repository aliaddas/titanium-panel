/**
 * WebSocket Event Types for Titanium E-Commerce Platform
 *
 * This module defines all the event types and payloads used for
 * real-time communication between clients and the WebSocket server.
 */

// ============================================
// Base Event Types
// ============================================

export interface BaseEvent<T extends string, P = unknown> {
  event: T;
  payload: P;
  timestamp?: number;
}

// ============================================
// Client -> Server Events
// ============================================

export type ClientEvent =
  | RequestGuestIDEvent
  | SubmitUserIDEvent
  | MessageEvent
  | RequestCustomerSupportEvent
  | JoinDiscussionEvent
  | LeaveDiscussionEvent
  | TypingIndicatorEvent
  | MarkAsReadEvent;

export interface RequestGuestIDEvent extends BaseEvent<'requestGuestID', {
  randomID: string;
}> {}

export interface SubmitUserIDEvent extends BaseEvent<'submitUserID', {
  userID: string;
  passkey?: string;
  userType: 'customer' | 'support' | 'admin';
  storeID?: string;
}> {}

export interface MessageEvent extends BaseEvent<'message', {
  message: string;
  discussionID?: string;
  replyToMessageID?: string;
}> {}

export interface RequestCustomerSupportEvent extends BaseEvent<'requestCustomerSupport', {
  userID: string;
  storeID: string;
  orderID?: string;
  topic?: string;
}> {}

export interface JoinDiscussionEvent extends BaseEvent<'joinDiscussion', {
  discussionID: string;
}> {}

export interface LeaveDiscussionEvent extends BaseEvent<'leaveDiscussion', {
  discussionID: string;
}> {}

export interface TypingIndicatorEvent extends BaseEvent<'typing', {
  discussionID: string;
  isTyping: boolean;
}> {}

export interface MarkAsReadEvent extends BaseEvent<'markAsRead', {
  discussionID: string;
  messageID: string;
}> {}

// ============================================
// Server -> Client Events
// ============================================

export type ServerEvent =
  | WelcomeEvent
  | ResponseGuestIDEvent
  | UpdateUsersEvent
  | BroadcastMessageEvent
  | SupportRequestCreatedEvent
  | DiscussionJoinedEvent
  | DiscussionLeftEvent
  | UserTypingEvent
  | MessageReadEvent
  | ErrorEvent
  | UserStatusEvent;

export interface WelcomeEvent extends BaseEvent<'welcome', {
  message: string;
  serverVersion: string;
  capabilities: string[];
}> {}

export interface ResponseGuestIDEvent extends BaseEvent<'responseGuestID', {
  userID: string;
  recipient: string;
}> {}

export interface UpdateUsersEvent extends BaseEvent<'updateUsers', {
  users: UserInfo[];
  discussionID?: string;
}> {}

export interface UserInfo {
  id: string;
  displayName: string;
  userType: 'customer' | 'support' | 'admin' | 'guest';
  status: 'online' | 'away' | 'busy';
  joinedAt: number;
}

export interface BroadcastMessageEvent extends BaseEvent<'message', {
  messageID: string;
  sender: UserInfo;
  message: string;
  discussionID?: string;
  replyToMessageID?: string;
  timestamp: number;
}> {}

export interface SupportRequestCreatedEvent extends BaseEvent<'supportRequestCreated', {
  discussionID: string;
  customerID: string;
  storeID: string;
  orderID?: string;
  topic?: string;
  createdAt: number;
}> {}

export interface DiscussionJoinedEvent extends BaseEvent<'discussionJoined', {
  discussionID: string;
  user: UserInfo;
  participants: UserInfo[];
}> {}

export interface DiscussionLeftEvent extends BaseEvent<'discussionLeft', {
  discussionID: string;
  user: UserInfo;
}> {}

export interface UserTypingEvent extends BaseEvent<'userTyping', {
  discussionID: string;
  user: UserInfo;
  isTyping: boolean;
}> {}

export interface MessageReadEvent extends BaseEvent<'messageRead', {
  discussionID: string;
  messageID: string;
  readBy: UserInfo;
  readAt: number;
}> {}

export interface ErrorEvent extends BaseEvent<'error', {
  code: ErrorCode;
  message: string;
  details?: Record<string, unknown>;
}> {}

export interface UserStatusEvent extends BaseEvent<'userStatus', {
  user: UserInfo;
  previousStatus?: 'online' | 'away' | 'busy' | 'offline';
}> {}

// ============================================
// Error Codes
// ============================================

export enum ErrorCode {
  INVALID_EVENT = 'INVALID_EVENT',
  INVALID_PAYLOAD = 'INVALID_PAYLOAD',
  UNAUTHORIZED = 'UNAUTHORIZED',
  DISCUSSION_NOT_FOUND = 'DISCUSSION_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

// ============================================
// Type Guards
// ============================================

export function isClientEvent(data: unknown): data is ClientEvent {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return typeof obj.event === 'string' && obj.payload !== undefined;
}

export function hasEventType<T extends ClientEvent['event']>(
  data: ClientEvent,
  eventType: T
): data is Extract<ClientEvent, { event: T }> {
  return data.event === eventType;
}
