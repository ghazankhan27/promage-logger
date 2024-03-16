import fs from "fs";
import io from "socket.io-client";

// Socket.IO connection options
const socketOptions = {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
};

// Connect to the Socket.IO server
const socket = io("http://localhost:4000", socketOptions);

// Log file path
const logFilePath = "event_log.txt";

// Event listener
socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("project_end", (msg: string) => {
  logEvent(msg);
});

socket.on("project_update", (msg: string) => {
  logEvent(msg);
});

// Log event to file
function logEvent(event: string): void {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${event}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    } else {
      console.log("Event logged:", event);
    }
  });
}
