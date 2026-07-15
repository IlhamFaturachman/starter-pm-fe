import { Server as SocketIOServer } from "socket.io";
import { Server as HttpServer } from "http";

class SocketService {
  private static instance: SocketService;
  private io: SocketIOServer | null = null;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public init(server: HttpServer): void {
    if (this.io) {
      console.warn("SocketService is already initialized.");
      return;
    }

    this.io = new SocketIOServer(server, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket) => {
      console.log(`🔌 Client connected: ${socket.id}`);

      socket.on("project:subscribe", (projectId: string) => {
        if (projectId) {
          socket.join(`project:${projectId}`);
          console.log(`🔌 Client ${socket.id} subscribed to project:${projectId}`);
        }
      });

      socket.on("project:unsubscribe", (projectId: string) => {
        if (projectId) {
          socket.leave(`project:${projectId}`);
          console.log(`🔌 Client ${socket.id} unsubscribed from project:${projectId}`);
        }
      });

      socket.on("ping", () => {
        socket.emit("pong");
      });

      socket.on("disconnect", () => {
        console.log(`🔌 Client disconnected: ${socket.id}`);
      });
    });
  }

  public broadcastProjectCreated(project: any): void {
    if (!this.io) {
      console.error("Socket.io is not initialized.");
      return;
    }
    this.io.emit("project:created", project);
  }

  public broadcastProjectUpdated(project: any): void {
    if (!this.io) {
      console.error("Socket.io is not initialized.");
      return;
    }
    this.io.emit("project:updated", project);
  }

  public broadcastTaskCreated(task: any): void {
    if (!this.io) {
      console.error("Socket.io is not initialized.");
      return;
    }
    this.io.to(`project:${task.projectId}`).emit("task:created", task);
    this.io.emit("task:created", task);
  }

  public broadcastTaskUpdated(task: any): void {
    if (!this.io) {
      console.error("Socket.io is not initialized.");
      return;
    }
    this.io.to(`project:${task.projectId}`).emit("task:updated", task);
    this.io.emit("task:updated", task);
  }

  public broadcastTaskMoved(task: any): void {
    if (!this.io) {
      console.error("Socket.io is not initialized.");
      return;
    }
    this.io.to(`project:${task.projectId}`).emit("task:moved", task);
    this.io.emit("task:moved", task);
  }
}

export const socketService = SocketService.getInstance();
