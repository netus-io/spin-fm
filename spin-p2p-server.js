const WebSocket = require('ws')

const P2P_PORT = process.env.P2P_PORT || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []
// HTTP_PORT=3002 P2P_PORT=5003 npm run dev
// HTTP_PORT=3002 P2P_PORT=5003 PEERS=ws://10.0.1.28:5003 npm run dev
// HTTP_PORT=3002 P2P_PORT=5003 PEERS=ws://10.0.1.28:5003, ws://10.0.0.222:5003 npm run dev
// HTTP_PORT=3002 P2P_PORT=5003 PEERS=ws://10.0.1.28:5003, ws://10.0.0.208:5003 npm run dev
// HTTP_PORT=3002 P2P_PORT=5003 PEERS=ws://localhost:5003, ws://localhost:5003 npm run dev

const MESSAGE_TYPES = {
  djNew:          'DJ_NEW',
  djLeft:         'DJ_LEFT',
  djNext:         'DJ_NEXT',
  djDancing:      'DJ_DANCING',
  djWelcome:      'DJ_WELCOME',
  songNew:        'SONG_NEW',
  songRemoved:    'SONG_REMOVED',
  metadataShare:  'METADATA_SHARE',
  metadataClear:  'METADATA_CLEAR',
  netState:       'NET_STATE'
};

class P2PServer {
  constructor(metadata) {
    this.metadata   = metadata
    this.sockets    = []
    this.server     = null
  }

  listen() {
    this.server = new WebSocket.Server({ port: P2P_PORT})
    this.server.on('connection', (socket) => this.connectSocket(MESSAGE_TYPES.djWelcome, socket))

    this.connectToPeers()
    console.log(`Listening for peer-to-peer connetions on: ${P2P_PORT}`)

    const interval = setInterval(() => {
      this.server.clients.forEach(function each(socket) {
        if (socket.isAlive === false) return socket.terminate();
     
        socket.isAlive = false;
        socket.ping(() => {console.log('Pinging...')});
      });
    }, 5000);
  }

  connectToPeers() {
    peers.forEach(peer => {
      // ws://localhost:5001 // example
      const socket = new WebSocket(peer)
      socket.on('open', () => this.connectSocket(MESSAGE_TYPES.djNew, socket))
    })
  }
 
  heartbeat() {
    this.isAlive = true;
    console.log('\tHEARTBEAT..')
  }

  connectSocket(messageType, socket) {
    // this.sockets.push(socket)
    console.log('Connecting to socket...')
    socket.isAlive = true
    // We recieve a pong-heartbeat from a peer
    socket.on('pong', this.heartbeat);

    this.messageHandler(socket)
    this.sendMetadata(messageType, socket)
  }

  messageHandler(socket) {
    socket.on('message', (message) => {
      const data = JSON.parse(message)
      console.log('data', data)
      // this.roomMetadata.replaceMetadata(data)
      switch(data.type) {
        case MESSAGE_TYPES.djNew:
          this.sendMetadata(MESSAGE_TYPES.metadataShare, socket)
          break
        case MESSAGE_TYPES.djNext:
          break
        case MESSAGE_TYPES.djDancing:
          break
        case MESSAGE_TYPES.songNew:
          break
        case MESSAGE_TYPES.netState:
          break
      }
    })
  }

  sendMetadata(messageType, socket) {
    socket.send(JSON.stringify({ type: messageType, metadata: this.metadata })) // could send array/binary-data
  }

  syncMetadata() {
    this.server.clients.forEach(socket => {
      this.sendMetata(socket)
    })
  }

  broadcastMetadata(messageType, transaction) {
    this.server.clients.forEach(socket => {
      this.sendMetata(messageType, socket)
    })
  }

  broadcastClearMetadata(messageType, transaction) {
    this.server.clients.forEach(socket => {
      this.sendMetata(MESSAGE_TYPES.metadataClear, socket)
    })
  }
}

module.exports = P2PServer