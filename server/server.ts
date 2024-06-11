export {}

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// server/server.js
const http = require('http');
const server = http.createServer((req:any, res:any) => {
  // Handle HTTP requests if needed
});

const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Allow requests from your Next.js app
      methods: ["GET", "POST"], // Allow these HTTP methods
    }
  });
io.on('connection', (socket:any) => {
  console.log('A user connected');
  
  // Handle chat messages
  socket.on('chat message', async (message:any) => {
  console.log('Message content:', message.content);
  console.log('User ID:', message.userId);
  console.log('Room ID:', message.roomId);
  console.log('User Name:', message.userName);
      try {
      await prisma.message.create({
        data: {
          userName: message.username,
          content: message.content,
          userId: message.userId,
          roomId: message.roomId
        }
      })
      console.log("done")
      io.emit('chat message', message); // Broadcast the message to all connected clients
    } catch (error) {
      console.error('Error creating message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3001, () => {
  console.log('WebSocket server listening on port 3001');
});