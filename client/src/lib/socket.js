//Socket Connection
import socketIO from "socket.io-client";
let socket;

export const initializeSocket = (userId) => {
  if (!socket) {
    socket = socketIO.connect("http://localhost:3000", { query: { userId } });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error(
      "Socket is not initialized. Please call initializeSocket first."
    );
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
