// apps/backend/src/app/webhook/webhook.controller.ts
import { Controller, Get, Post, Body, Query, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Response } from 'express';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  // --- Facebook Webhook ---
  @Get('facebook')
  verifyFacebookWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: Response,
  ) {
    const result = this.webhookService.verifyFacebookWebhook(mode, token, challenge);
    if (result) {
      return res.status(HttpStatus.OK).send(result);
    }
    return res.status(HttpStatus.FORBIDDEN).send('Verification failed');
  }

  @Post('facebook')
  @HttpCode(HttpStatus.OK) // Facebook expects a 200 OK
  async handleFacebookWebhook(@Body() payload: any) {
    await this.webhookService.processFacebookMessage(payload);
    return { status: 'success' };
  }

  // --- Zalo Webhook ---
  @Get('zalo')
  verifyZaloWebhook(
    @Query('token') token: string,
    @Query('challenge') challenge: string,
    @Res() res: Response,
  ) {
    const result = this.webhookService.verifyZaloWebhook(token, challenge);
    if (result) {
      return res.status(HttpStatus.OK).send(result);
    }
    return res.status(HttpStatus.FORBIDDEN).send('Verification failed');
  }

  @Post('zalo')
  @HttpCode(HttpStatus.OK) // Zalo expects a 200 OK
  async handleZaloWebhook(@Body() payload: any) {
    await this.webhookService.processZaloMessage(payload);
    return { status: 'success' };
  }
}
