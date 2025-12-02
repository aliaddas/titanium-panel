# WS Server

WebSocket server for real-time communication between panel operators and customers.

## Quick Start

```bash
yarn install
yarn dev
```

Runs on port 4000.

## Architecture

```
src/
├── server.ts             # Main WebSocket server
├── types/
│   ├── events.ts         # Event type definitions
│   └── session.ts        # Session/connection types
├── managers/
│   └── session-manager.ts
├── handlers/
│   └── event-handler.ts
└── utils/
    └── index.ts          # Logger, rate limiter, etc.
```

## Events

Client → Server: `requestGuestID`, `submitUserID`, `message`, `typing`, etc.  
Server → Client: `welcome`, `message`, `updateUsers`, `error`, etc.

## Usage

```javascript
const ws = new WebSocket('ws://localhost:4000');
ws.send(JSON.stringify({
  event: 'submitUserID',
  payload: { userID: 'customer-123', userType: 'customer', storeID: 'store-abc' }
}));
```

## Scripts

```bash
yarn dev      # Development with hot reload
yarn build    # Compile TypeScript
yarn start    # Run compiled server
```

---

Back to [main README](../README.md)
