// apps/backend/src/app/queue/queue.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow any origin for development
  },
})
export class QueueGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('QueueGateway');

  afterInit(server: Server) {
    this.logger.log('Socket.IO Gateway Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // This method will be called by the service to broadcast updates
  broadcastQueueUpdate(queueState: any) {
    this.server.emit('queue_updated', queueState);
    this.logger.log('Broadcasted queue_updated event');
  }
}
