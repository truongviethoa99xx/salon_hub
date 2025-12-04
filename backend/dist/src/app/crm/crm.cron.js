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
var CrmCronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmCronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let CrmCronService = CrmCronService_1 = class CrmCronService {
    constructor(remindersQueue) {
        this.remindersQueue = remindersQueue;
        this.logger = new common_1.Logger(CrmCronService_1.name);
    }
    async handleCron() {
        this.logger.debug('Running daily CRM reminder cron job...');
        await this.remindersQueue.add('send-daily-reminders', {
            timestamp: new Date().toISOString(),
        });
        this.logger.debug('Added "send-daily-reminders" job to queue.');
    }
};
exports.CrmCronService = CrmCronService;
__decorate([
    (0, schedule_1.Cron)('0 9 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CrmCronService.prototype, "handleCron", null);
exports.CrmCronService = CrmCronService = CrmCronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)('reminders')),
    __metadata("design:paramtypes", [bullmq_2.Queue])
], CrmCronService);
//# sourceMappingURL=crm.cron.js.map