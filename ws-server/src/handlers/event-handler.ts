/**
 * Event Handlers for WebSocket Server
 */

import type { WebSocket } from 'ws';
import type {
  ClientEvent,
  ServerEvent,
  ErrorCode,
  Session,
  BroadcastMessageEvent,
} from '../types';
import { SessionManager } from '../managers';
import { RateLimiter, sanitizeMessage, generateID, Logger } from '../utils';

export class EventHandler {
  private sessionManager: SessionManager;
  private rateLimiter: RateLimiter;
  private logger: Logger;
  private maxMessageLength: number;

  constructor(
    sessionManager: SessionManager,
    logger: Logger,
    maxMessageLength: number = 5000,
    maxMessagesPerMinute: number = 60
  ) {
    this.sessionManager = sessionManager;
    this.logger = logger;
    this.maxMessageLength = maxMessageLength;
    this.rateLimiter = new RateLimiter(60000, maxMessagesPerMinute);
  }

  handleEvent(socket: WebSocket, session: Session, data: ClientEvent): void {
    // Rate limiting
    if (this.rateLimiter.isRateLimited(session.id)) {
      this.sendError(socket, 'RATE_LIMIT_EXCEEDED', 'Too many requests. Please slow down.');
      return;
    }

    switch (data.event) {
      case 'requestGuestID':
        this.handleRequestGuestID(socket, session, data.payload);
        break;
      case 'submitUserID':
        this.handleSubmitUserID(socket, session, data.payload);
        break;
      case 'message':
        this.handleMessage(socket, session, data.payload);
        break;
      case 'requestCustomerSupport':
        this.handleRequestCustomerSupport(socket, session, data.payload);
        break;
      case 'joinDiscussion':
        this.handleJoinDiscussion(socket, session, data.payload);
        break;
      case 'leaveDiscussion':
        this.handleLeaveDiscussion(socket, session, data.payload);
        break;
      case 'typing':
        this.handleTypingIndicator(socket, session, data.payload);
        break;
      case 'markAsRead':
        this.handleMarkAsRead(socket, session, data.payload);
        break;
      default:
        this.sendError(socket, 'INVALID_EVENT', `Unknown event type: ${(data as any).event}`);
    }
  }

  private handleRequestGuestID(
    socket: WebSocket,
    session: Session,
    payload: { randomID: string }
  ): void {
    this.logger.info(`Guest ID requested with randomID: ${payload.randomID}`);

    this.send(socket, {
      event: 'responseGuestID',
      payload: {
        userID: session.user.id,
        recipient: payload.randomID,
      },
    });
  }

  private handleSubmitUserID(
    socket: WebSocket,
    session: Session,
    payload: { userID: string; passkey?: string; userType: 'customer' | 'support' | 'admin'; storeID?: string }
  ): void {
    const updatedSession = this.sessionManager.updateSession(session.id, {
      user: {
        ...session.user,
        id: payload.userID,
        displayName: payload.userID,
        userType: payload.userType,
      },
    });

    if (!updatedSession) {
      this.sendError(socket, 'INTERNAL_ERROR', 'Failed to update session');
      return;
    }

    this.logger.success(`User authenticated: ${payload.userID} (${payload.userType})`);

    // Broadcast updated user list
    const users = this.sessionManager.getAllSessions().map(s => s.user);
    this.sessionManager.broadcast({
      event: 'updateUsers',
      payload: { users },
    });
  }

  private handleMessage(
    socket: WebSocket,
    session: Session,
    payload: { message: string; discussionID?: string; replyToMessageID?: string }
  ): void {
    const sanitized = sanitizeMessage(payload.message, this.maxMessageLength);
    if (!sanitized) {
      this.sendError(socket, 'INVALID_PAYLOAD', 'Message cannot be empty');
      return;
    }

    const messageEvent: BroadcastMessageEvent = {
      event: 'message',
      payload: {
        messageID: generateID(),
        sender: session.user,
        message: sanitized,
        discussionID: payload.discussionID,
        replyToMessageID: payload.replyToMessageID,
        timestamp: Date.now(),
      },
    };

    if (payload.discussionID) {
      // Send to discussion participants only
      this.sessionManager.broadcastToDiscussion(payload.discussionID, messageEvent);
      this.sessionManager.incrementMessageCount(payload.discussionID);
    } else {
      // Broadcast to all users
      this.sessionManager.broadcast(messageEvent);
    }
  }

  private handleRequestCustomerSupport(
    socket: WebSocket,
    session: Session,
    payload: { userID: string; storeID: string; orderID?: string; topic?: string }
  ): void {
    this.logger.info(`Customer support requested by ${payload.userID} for store ${payload.storeID}`);

    const discussion = this.sessionManager.createDiscussion(
      payload.storeID,
      payload.orderID,
      payload.topic
    );

    // Auto-join the customer to the discussion
    this.sessionManager.joinDiscussion(session.id, discussion.id);

    // Notify the customer
    this.send(socket, {
      event: 'supportRequestCreated',
      payload: {
        discussionID: discussion.id,
        customerID: payload.userID,
        storeID: payload.storeID,
        orderID: payload.orderID,
        topic: payload.topic,
        createdAt: discussion.createdAt,
      },
    });

    // Notify support agents (users with support/admin type)
    this.sessionManager.broadcast(
      {
        event: 'supportRequestCreated',
        payload: {
          discussionID: discussion.id,
          customerID: payload.userID,
          storeID: payload.storeID,
          orderID: payload.orderID,
          topic: payload.topic,
          createdAt: discussion.createdAt,
        },
      },
      s => s.user.userType === 'support' || s.user.userType === 'admin'
    );
  }

  private handleJoinDiscussion(
    socket: WebSocket,
    session: Session,
    payload: { discussionID: string }
  ): void {
    const result = this.sessionManager.joinDiscussion(session.id, payload.discussionID);

    if (!result) {
      this.sendError(socket, 'DISCUSSION_NOT_FOUND', 'Discussion not found');
      return;
    }

    const participants = this.sessionManager.getDiscussionParticipants(payload.discussionID);

    // Notify the user who joined
    this.send(socket, {
      event: 'discussionJoined',
      payload: {
        discussionID: payload.discussionID,
        user: session.user,
        participants,
      },
    });

    // Notify other participants
    this.sessionManager.broadcastToDiscussion(
      payload.discussionID,
      {
        event: 'discussionJoined',
        payload: {
          discussionID: payload.discussionID,
          user: session.user,
          participants,
        },
      },
      session.id
    );
  }

  private handleLeaveDiscussion(
    socket: WebSocket,
    session: Session,
    payload: { discussionID: string }
  ): void {
    this.sessionManager.leaveDiscussion(session.id, payload.discussionID);

    // Notify other participants
    this.sessionManager.broadcastToDiscussion(payload.discussionID, {
      event: 'discussionLeft',
      payload: {
        discussionID: payload.discussionID,
        user: session.user,
      },
    });
  }

  private handleTypingIndicator(
    _socket: WebSocket,
    session: Session,
    payload: { discussionID: string; isTyping: boolean }
  ): void {
    this.sessionManager.broadcastToDiscussion(
      payload.discussionID,
      {
        event: 'userTyping',
        payload: {
          discussionID: payload.discussionID,
          user: session.user,
          isTyping: payload.isTyping,
        },
      },
      session.id
    );
  }

  private handleMarkAsRead(
    _socket: WebSocket,
    session: Session,
    payload: { discussionID: string; messageID: string }
  ): void {
    this.sessionManager.broadcastToDiscussion(
      payload.discussionID,
      {
        event: 'messageRead',
        payload: {
          discussionID: payload.discussionID,
          messageID: payload.messageID,
          readBy: session.user,
          readAt: Date.now(),
        },
      },
      session.id
    );
  }

  // Utility methods
  private send(socket: WebSocket, event: ServerEvent): void {
    try {
      if (socket.readyState === 1) {
        socket.send(JSON.stringify(event));
      }
    } catch (error) {
      this.logger.error('Failed to send message:', error);
    }
  }

  private sendError(socket: WebSocket, code: ErrorCode | string, message: string): void {
    this.send(socket, {
      event: 'error',
      payload: {
        code: code as ErrorCode,
        message,
      },
    });
  }

  cleanup(sessionId: string): void {
    this.rateLimiter.clear(sessionId);
  }
}
