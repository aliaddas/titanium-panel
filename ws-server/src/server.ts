/**
 * Titanium WebSocket Server
 *
 * Real-time communication server for the Titanium E-Commerce platform.
 * Handles customer support chat, live updates, and real-time notifications.
 */

import { WebSocketServer, WebSocket } from 'ws';
import type { ServerConfig, ClientEvent, ServerEvent } from './types';
import { DEFAULT_CONFIG, isClientEvent, ErrorCode } from './types';
import { SessionManager } from './managers';
import { EventHandler } from './handlers';
import { Logger } from './utils';

export class TitaniumWebSocketServer {
  private wss: WebSocketServer;
  private sessionManager: SessionManager;
  private eventHandler: EventHandler;
  private logger: Logger;
  private config: ServerConfig;
  private heartbeatInterval?: NodeJS.Timeout;

  constructor(config: Partial<ServerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.logger = new Logger('[Titanium WS]', this.config.enableLogging);
    this.sessionManager = new SessionManager(this.logger);
    this.eventHandler = new EventHandler(
      this.sessionManager,
      this.logger,
      this.config.maxMessageLength,
      this.config.maxMessagesPerMinute
    );

    this.wss = new WebSocketServer({ port: this.config.port });
    this.setupServer();
  }

  private setupServer(): void {
    this.wss.on('connection', (socket: WebSocket) => {
      const session = this.sessionManager.createSession(socket);

      // Send welcome message
      this.send(socket, {
        event: 'welcome',
        payload: {
          message: 'Welcome to Titanium Panel',
          serverVersion: '2.0.0',
          capabilities: [
            'chat',
            'discussions',
            'typing-indicators',
            'read-receipts',
            'customer-support',
          ],
        },
      });

      socket.on('message', (rawMessage) => {
        try {
          const data = JSON.parse(rawMessage.toString());

          if (!isClientEvent(data)) {
            this.send(socket, {
              event: 'error',
              payload: {
                code: ErrorCode.INVALID_EVENT,
                message: 'Invalid event format',
              },
            });
            return;
          }

          this.eventHandler.handleEvent(socket, session, data as ClientEvent);
        } catch (error) {
          this.logger.error('Failed to parse message:', error);
          this.send(socket, {
            event: 'error',
            payload: {
              code: ErrorCode.INVALID_PAYLOAD,
              message: 'Invalid JSON payload',
            },
          });
        }
      });

      socket.on('close', () => {
        this.eventHandler.cleanup(session.id);
        this.sessionManager.removeSession(session.id);

        // Broadcast updated user list
        const users = this.sessionManager.getAllSessions().map(s => s.user);
        this.sessionManager.broadcast({
          event: 'updateUsers',
          payload: { users },
        });
      });

      socket.on('error', (error) => {
        this.logger.error(`Socket error for ${session.user.displayName}:`, error);
      });
    });

    // Setup heartbeat to detect dead connections
    this.setupHeartbeat();

    this.logger.success(`Server running on ws://localhost:${this.config.port}`);
  }

  private setupHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      const now = Date.now();
      const sessions = this.sessionManager.getAllSessions();

      for (const session of sessions) {
        // Check for inactive sessions
        if (now - session.lastActivity > this.config.sessionTimeout) {
          this.logger.warn(`Session ${session.id} timed out`);
          session.socket.close();
          continue;
        }

        // Send ping
        if (session.socket.readyState === 1) {
          session.socket.ping();
        }
      }
    }, this.config.heartbeatInterval);
  }

  private send(socket: WebSocket, event: ServerEvent): void {
    try {
      if (socket.readyState === 1) {
        socket.send(JSON.stringify(event));
      }
    } catch (error) {
      this.logger.error('Failed to send message:', error);
    }
  }

  getStats() {
    return this.sessionManager.getStats();
  }

  close(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    this.wss.close(() => {
      this.logger.info('Server closed');
    });
  }
}

// Start server when run directly
if (require.main === module) {
  const port = parseInt(process.env.WS_PORT || '4000', 10);
  const server = new TitaniumWebSocketServer({ port });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n');
    server.close();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    server.close();
    process.exit(0);
  });
}

export default TitaniumWebSocketServer;
