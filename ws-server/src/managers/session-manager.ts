/**
 * Session Manager - Handles WebSocket client sessions
 */

import type { WebSocket } from 'ws';
import type { Session, Discussion, ServerState, UserInfo, ServerEvent } from '../types';
import { generateID, generateGuestName, createUserInfo, Logger } from '../utils';

export class SessionManager {
  private state: ServerState = {
    sessions: new Map(),
    discussions: new Map(),
    guestNames: new Set(),
  };

  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  // Session Management
  createSession(socket: WebSocket): Session {
    const guestName = generateGuestName(this.state.guestNames);
    this.state.guestNames.add(guestName);

    const session: Session = {
      id: generateID(),
      socket,
      user: createUserInfo(guestName, guestName, 'guest'),
      connectedAt: Date.now(),
      lastActivity: Date.now(),
      currentDiscussions: new Set(),
    };

    this.state.sessions.set(session.id, session);
    this.logger.connection('connect', session.user.displayName);
    return session;
  }

  updateSession(sessionId: string, updates: Partial<Pick<Session, 'user' | 'metadata'>>): Session | null {
    const session = this.state.sessions.get(sessionId);
    if (!session) return null;

    if (updates.user) {
      session.user = { ...session.user, ...updates.user };
    }
    if (updates.metadata) {
      session.metadata = { ...session.metadata, ...updates.metadata };
    }
    session.lastActivity = Date.now();

    return session;
  }

  getSession(sessionId: string): Session | undefined {
    return this.state.sessions.get(sessionId);
  }

  getSessionBySocket(socket: WebSocket): Session | undefined {
    for (const session of this.state.sessions.values()) {
      if (session.socket === socket) {
        return session;
      }
    }
    return undefined;
  }

  removeSession(sessionId: string): void {
    const session = this.state.sessions.get(sessionId);
    if (!session) return;

    // Leave all discussions
    for (const discussionId of session.currentDiscussions) {
      this.leaveDiscussion(sessionId, discussionId);
    }

    // Remove guest name from pool
    if (session.user.userType === 'guest') {
      this.state.guestNames.delete(session.user.id);
    }

    this.state.sessions.delete(sessionId);
    this.logger.connection('disconnect', session.user.displayName);
  }

  getAllSessions(): Session[] {
    return Array.from(this.state.sessions.values());
  }

  // Discussion Management
  createDiscussion(storeID: string, orderID?: string, topic?: string): Discussion {
    const discussion: Discussion = {
      id: generateID(),
      storeID,
      orderID,
      topic,
      participants: new Map(),
      createdAt: Date.now(),
      lastMessageAt: Date.now(),
      messageCount: 0,
    };

    this.state.discussions.set(discussion.id, discussion);
    this.logger.info(`Discussion created: ${discussion.id}`);
    return discussion;
  }

  getDiscussion(discussionId: string): Discussion | undefined {
    return this.state.discussions.get(discussionId);
  }

  joinDiscussion(sessionId: string, discussionId: string): { discussion: Discussion; session: Session } | null {
    const session = this.state.sessions.get(sessionId);
    const discussion = this.state.discussions.get(discussionId);

    if (!session || !discussion) return null;

    discussion.participants.set(sessionId, session);
    session.currentDiscussions.add(discussionId);

    this.logger.info(`User ${session.user.displayName} joined discussion ${discussionId}`);
    return { discussion, session };
  }

  leaveDiscussion(sessionId: string, discussionId: string): void {
    const session = this.state.sessions.get(sessionId);
    const discussion = this.state.discussions.get(discussionId);

    if (session) {
      session.currentDiscussions.delete(discussionId);
    }

    if (discussion) {
      discussion.participants.delete(sessionId);

      // Clean up empty discussions
      if (discussion.participants.size === 0) {
        this.state.discussions.delete(discussionId);
        this.logger.info(`Discussion ${discussionId} removed (no participants)`);
      }
    }
  }

  getDiscussionParticipants(discussionId: string): UserInfo[] {
    const discussion = this.state.discussions.get(discussionId);
    if (!discussion) return [];

    return Array.from(discussion.participants.values()).map(s => s.user);
  }

  incrementMessageCount(discussionId: string): void {
    const discussion = this.state.discussions.get(discussionId);
    if (discussion) {
      discussion.messageCount++;
      discussion.lastMessageAt = Date.now();
    }
  }

  // Broadcast utilities
  broadcast(event: ServerEvent, filter?: (session: Session) => boolean): void {
    const message = JSON.stringify(event);
    for (const session of this.state.sessions.values()) {
      if (!filter || filter(session)) {
        this.sendToSession(session, message);
      }
    }
  }

  broadcastToDiscussion(discussionId: string, event: ServerEvent, excludeSessionId?: string): void {
    const discussion = this.state.discussions.get(discussionId);
    if (!discussion) return;

    const message = JSON.stringify(event);
    for (const [sessionId, session] of discussion.participants) {
      if (sessionId !== excludeSessionId) {
        this.sendToSession(session, message);
      }
    }
  }

  sendToSession(session: Session, message: string): void {
    try {
      if (session.socket.readyState === 1) { // OPEN
        session.socket.send(message);
      }
    } catch (error) {
      this.logger.error(`Failed to send to session ${session.id}:`, error);
    }
  }

  // Stats
  getStats() {
    return {
      activeSessions: this.state.sessions.size,
      activeDiscussions: this.state.discussions.size,
      usedGuestNames: this.state.guestNames.size,
    };
  }
}
