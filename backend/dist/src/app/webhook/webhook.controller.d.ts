import { WebhookService } from './webhook.service';
import { Response } from 'express';
export declare class WebhookController {
    private readonly webhookService;
    constructor(webhookService: WebhookService);
    verifyFacebookWebhook(mode: string, token: string, challenge: string, res: Response): any;
    handleFacebookWebhook(payload: any): Promise<{
        status: string;
    }>;
    verifyZaloWebhook(token: string, challenge: string, res: Response): any;
    handleZaloWebhook(payload: any): Promise<{
        status: string;
    }>;
}
