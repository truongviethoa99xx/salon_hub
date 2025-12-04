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
var WebhookService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../common/entities");
const enums_1 = require("../common/enums");
const chat_gateway_1 = require("./chat.gateway");
let WebhookService = WebhookService_1 = class WebhookService {
    constructor(socialAccountRepository, conversationRepository, userRepository, configService, chatGateway) {
        this.socialAccountRepository = socialAccountRepository;
        this.conversationRepository = conversationRepository;
        this.userRepository = userRepository;
        this.configService = configService;
        this.chatGateway = chatGateway;
        this.logger = new common_1.Logger(WebhookService_1.name);
        this.FACEBOOK_VERIFY_TOKEN = this.configService.get('FACEBOOK_VERIFY_TOKEN', 'YOUR_FACEBOOK_VERIFY_TOKEN');
        this.ZALO_VERIFY_TOKEN = this.configService.get('ZALO_VERIFY_TOKEN', 'YOUR_ZALO_VERIFY_TOKEN');
    }
    verifyFacebookWebhook(mode, token, challenge) {
        if (mode === 'subscribe' && token === this.FACEBOOK_VERIFY_TOKEN) {
            this.logger.log('Facebook webhook verified!');
            return challenge;
        }
        return null;
    }
    verifyZaloWebhook(token, challenge) {
        if (token === this.ZALO_VERIFY_TOKEN) {
            this.logger.log('Zalo webhook verified!');
            return challenge;
        }
        return null;
    }
    async processFacebookMessage(payload) {
        var _a, _b, _c, _d;
        this.logger.log(`Received Facebook message: ${JSON.stringify(payload)}`);
        const entry = (_a = payload.entry) === null || _a === void 0 ? void 0 : _a[0];
        const messaging = (_b = entry === null || entry === void 0 ? void 0 : entry.messaging) === null || _b === void 0 ? void 0 : _b[0];
        const senderId = (_c = messaging === null || messaging === void 0 ? void 0 : messaging.sender) === null || _c === void 0 ? void 0 : _c.id;
        const messageText = (_d = messaging === null || messaging === void 0 ? void 0 : messaging.message) === null || _d === void 0 ? void 0 : _d.text;
        const messageTimestamp = new Date(messaging === null || messaging === void 0 ? void 0 : messaging.timestamp);
        if (!senderId || !messageText) {
            this.logger.warn('Invalid Facebook message payload received.');
            return;
        }
        await this.handleIncomingMessage(enums_1.SocialPlatform.FACEBOOK, senderId, messageText, messageTimestamp);
    }
    async processZaloMessage(payload) {
        var _a, _b;
        this.logger.log(`Received Zalo message: ${JSON.stringify(payload)}`);
        const senderId = (_a = payload === null || payload === void 0 ? void 0 : payload.sender) === null || _a === void 0 ? void 0 : _a.id;
        const messageText = (_b = payload === null || payload === void 0 ? void 0 : payload.message) === null || _b === void 0 ? void 0 : _b.text;
        const messageTimestamp = new Date(payload === null || payload === void 0 ? void 0 : payload.timestamp);
        if (!senderId || !messageText) {
            this.logger.warn('Invalid Zalo message payload received.');
            return;
        }
        await this.handleIncomingMessage(enums_1.SocialPlatform.ZALO, senderId, messageText, messageTimestamp);
    }
    async handleIncomingMessage(platform, socialUserId, messageText, messageTimestamp) {
        let user = null;
        let socialAccount = await this.socialAccountRepository.findOne({
            where: { platform, social_user_id: socialUserId },
            relations: ['user'],
        });
        if (socialAccount) {
            user = socialAccount.user;
        }
        else {
            this.logger.log(`New social user detected for ${platform}: ${socialUserId}. Creating placeholder user.`);
            user = this.userRepository.create({
                full_name: `Guest (${platform} ${socialUserId.slice(-4)})`,
                phone_number: `${platform}-${socialUserId}`,
                role: enums_1.UserRole.CUSTOMER,
            });
            user = await this.userRepository.save(user);
            socialAccount = this.socialAccountRepository.create({
                user: user,
                platform: platform,
                social_user_id: socialUserId,
            });
            await this.socialAccountRepository.save(socialAccount);
        }
        const conversation = this.conversationRepository.create({
            customer: user,
            platform: platform,
            social_user_id: socialUserId,
            message_text: messageText,
            message_timestamp: messageTimestamp,
            is_read: false,
        });
        const savedConversation = await this.conversationRepository.save(conversation);
        this.chatGateway.broadcastNewMessage(savedConversation);
        this.logger.log(`Message saved and broadcasted: ${savedConversation.id}`);
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = WebhookService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.SocialAccount)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Conversation)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService,
        chat_gateway_1.ChatGateway])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map