"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookController = void 0;
const common_1 = require("@nestjs/common");
const webhook_service_1 = require("./webhook.service");
const express_1 = require("express");
let WebhookController = class WebhookController {
    constructor(webhookService) {
        this.webhookService = webhookService;
    }
    verifyFacebookWebhook(mode, token, challenge, res) {
        const result = this.webhookService.verifyFacebookWebhook(mode, token, challenge);
        if (result) {
            return res.status(common_1.HttpStatus.OK).send(result);
        }
        return res.status(common_1.HttpStatus.FORBIDDEN).send('Verification failed');
    }
    async handleFacebookWebhook(payload) {
        await this.webhookService.processFacebookMessage(payload);
        return { status: 'success' };
    }
    verifyZaloWebhook(token, challenge, res) {
        const result = this.webhookService.verifyZaloWebhook(token, challenge);
        if (result) {
            return res.status(common_1.HttpStatus.OK).send(result);
        }
        return res.status(common_1.HttpStatus.FORBIDDEN).send('Verification failed');
    }
    async handleZaloWebhook(payload) {
        await this.webhookService.processZaloMessage(payload);
        return { status: 'success' };
    }
};
exports.WebhookController = WebhookController;
__decorate([
    (0, common_1.Get)('facebook'),
    __param(0, (0, common_1.Query)('hub.mode')),
    __param(1, (0, common_1.Query)('hub.verify_token')),
    __param(2, (0, common_1.Query)('hub.challenge')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], WebhookController.prototype, "verifyFacebookWebhook", null);
__decorate([
    (0, common_1.Post)('facebook'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "handleFacebookWebhook", null);
__decorate([
    (0, common_1.Get)('zalo'),
    __param(0, (0, common_1.Query)('token')),
    __param(1, (0, common_1.Query)('challenge')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], WebhookController.prototype, "verifyZaloWebhook", null);
__decorate([
    (0, common_1.Post)('zalo'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "handleZaloWebhook", null);
exports.WebhookController = WebhookController = __decorate([
    (0, common_1.Controller)('webhook'),
    __metadata("design:paramtypes", [webhook_service_1.WebhookService])
], WebhookController);
//# sourceMappingURL=webhook.controller.js.map