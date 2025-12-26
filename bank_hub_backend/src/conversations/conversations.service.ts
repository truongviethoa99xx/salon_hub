import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../entities/conversation.entity';
import { Message } from '../entities/message.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async createConversation(
    createConversationDto: CreateConversationDto,
  ): Promise<Conversation> {
    const conversation = this.conversationRepository.create(
      createConversationDto,
    );
    return this.conversationRepository.save(conversation);
  }

  async findAllConversations(): Promise<Conversation[]> {
    return this.conversationRepository.find({
      order: { last_message_at: 'DESC' },
      relations: ['messages'],
    });
  }

  async findOneConversation(id: number): Promise<Conversation> {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
      relations: ['messages'],
      order: { messages: { created_at: 'ASC' } },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${id} not found`);
    }

    return conversation;
  }

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: createMessageDto.conversation_id },
    });

    if (!conversation) {
      throw new NotFoundException(
        `Conversation with ID ${createMessageDto.conversation_id} not found`,
      );
    }

    const message = this.messageRepository.create(createMessageDto);
    const savedMessage = await this.messageRepository.save(message);

    // Update conversation last_message_at
    conversation.last_message_at = new Date();
    await this.conversationRepository.save(conversation);

    return savedMessage;
  }

  async getMessagesByConversation(conversationId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { conversation_id: conversationId },
      order: { created_at: 'ASC' },
    });
  }
}

