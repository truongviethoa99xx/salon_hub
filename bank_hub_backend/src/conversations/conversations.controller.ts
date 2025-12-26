import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { Conversation } from '../entities/conversation.entity';
import { Message } from '../entities/message.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/enums';

@ApiTags('conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo conversation mới' })
  @ApiResponse({ status: 201, description: 'Conversation được tạo thành công', type: Conversation })
  async createConversation(
    @Body() createConversationDto: CreateConversationDto,
  ): Promise<Conversation> {
    return this.conversationsService.createConversation(createConversationDto);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.RECEPTIONIST)
  @ApiOperation({ summary: 'Lấy danh sách conversations (Admin/Receptionist only)' })
  @ApiResponse({ status: 200, description: 'Danh sách conversations', type: [Conversation] })
  async findAllConversations(): Promise<Conversation[]> {
    return this.conversationsService.findAllConversations();
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.RECEPTIONIST)
  @ApiOperation({ summary: 'Lấy chi tiết conversation kèm messages (Admin/Receptionist only)' })
  @ApiResponse({ status: 200, description: 'Chi tiết conversation', type: Conversation })
  @ApiResponse({ status: 404, description: 'Không tìm thấy conversation' })
  async findOneConversation(@Param('id') id: string): Promise<Conversation> {
    return this.conversationsService.findOneConversation(+id);
  }

  @Post('messages')
  @ApiOperation({ summary: 'Tạo message mới trong conversation' })
  @ApiResponse({ status: 201, description: 'Message được tạo thành công', type: Message })
  @ApiResponse({ status: 404, description: 'Không tìm thấy conversation' })
  async createMessage(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.conversationsService.createMessage(createMessageDto);
  }

  @Get(':id/messages')
  @ApiOperation({ summary: 'Lấy danh sách messages trong conversation' })
  @ApiResponse({ status: 200, description: 'Danh sách messages', type: [Message] })
  async getMessagesByConversation(
    @Param('id') id: string,
  ): Promise<Message[]> {
    return this.conversationsService.getMessagesByConversation(+id);
  }
}

