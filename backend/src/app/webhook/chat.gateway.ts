// apps/backend/src/app/webhook/chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Conversation } from '../common/entities';

@WebSocketGateway({
  namespace: '/chat', // Separate namespace for chat events
  cors: {
    origin: '*', // Allow any origin for development
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server) {
    this.logger.log('Chat Gateway Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Chat client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Chat client disconnected: ${client.id}`);
  }

  // This method will be called by the WebhookService to broadcast new messages
  broadcastNewMessage(message: Conversation) {
    this.server.emit('new_message', message);
    this.logger.log(`Broadcasted new_message event for message ${message.id}`);
  }
}
