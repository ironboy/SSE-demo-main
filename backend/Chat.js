export default class Chat {

  constructor(app) {
    this.app = app;
    this.openConnections = [];
    this.chatMessages = [];
    this.addApiRouteForReceivingNewMessages();
    this.addApiRouteForMessageStreamViaSSE();
    this.broadCastKeepAliveToOpenConnections();
  }

  addApiRouteForReceivingNewMessages() {
    this.app.post('/api/chat-message', (req, res) => {
      this.chatMessages.push({ timestamp: Date.now(), ...req.body });
      // broadcast messages
      this.broadcastMessagesToOpenConnections();
      res.json({ status: 'ok' });
    });
  }

  addApiRouteForMessageStreamViaSSE() {
    this.app.get('/api/chat-sse', (req, res) => {
      // add the connection to this.openConnections
      this.openConnections.push({ req, res, timestampOfLastMessageSent: 0 });
      // if this connection closes, remove it from this.openConnections
      req.on('close', () => this.openConnections =
        this.openConnections.filter(x => x.req !== req));
      // set the correct headers for SSE
      res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
      });
      // write a welcome comment
      res.write(': welcome\n\n');
      // broadcast messages
      this.broadcastMessagesToOpenConnections();
    });
  }

  broadcastMessagesToOpenConnections() {
    for (const connection of this.openConnections) {
      // send all messages not sent previously to this connection
      for (const message of this.chatMessages) {
        if (message.timestamp > connection.timestampOfLastMessageSent) {
          connection.res.write(`data:${JSON.stringify(message)}\n\n`);
          connection.timestampOfLastMessageSent = message.timestamp;
        }
      }
    }
  }

  broadCastKeepAliveToOpenConnections() {
    // to keep the connection open broadcast a comment every 15:th second
    setInterval(() => {
      for (const connection of this.openConnections) {
        connection.res.write(': keepalive\n\n');
      }
    }, 15000);
  }

}