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
var CrmProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../common/entities");
const enums_1 = require("../common/enums");
let CrmProcessor = CrmProcessor_1 = class CrmProcessor extends bullmq_1.WorkerHost {
    constructor(serviceRecordRepository, notificationHistoryRepository, userRepository) {
        super();
        this.serviceRecordRepository = serviceRecordRepository;
        this.notificationHistoryRepository = notificationHistoryRepository;
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(CrmProcessor_1.name);
    }
    async process(job) {
        if (job.name !== 'send-daily-reminders') {
            return;
        }
        this.logger.debug(`Processing job ${job.id} of type ${job.name} with data: ${JSON.stringify(job.data)}`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const serviceRecords = await this.serviceRecordRepository.find({
            where: {
                recommended_return_date: (0, typeorm_2.LessThanOrEqual)(today.toISOString().split('T')[0]),
            },
            relations: ['customer', 'booking'],
        });
        for (const record of serviceRecords) {
            if (!record.customer) {
                this.logger.warn(`Service record ${record.id} has no associated customer.`);
                continue;
            }
            const message = `Chào ${record.customer.full_name}, 30 ngày rồi bạn chưa cắt tóc, ghé tiệm nhận ưu đãi nhé!`;
            this.logger.log(`[Zalo Mock API] Sending reminder to ${record.customer.phone_number}: "${message}"`);
            const notificationStatus = Math.random() > 0.1 ? enums_1.NotificationStatus.SUCCESS : enums_1.NotificationStatus.FAILED;
            const newNotification = this.notificationHistoryRepository.create({
                customer: record.customer,
                message: message,
                status: notificationStatus,
                sent_at: new Date(),
            });
            await this.notificationHistoryRepository.save(newNotification);
            if (notificationStatus === enums_1.NotificationStatus.SUCCESS) {
                this.logger.log(`Reminder sent successfully to ${record.customer.full_name}`);
            }
            else {
                this.logger.error(`Failed to send reminder to ${record.customer.full_name}`);
            }
        }
        this.logger.debug(`Finished processing job ${job.id}. ${serviceRecords.length} reminders processed.`);
    }
};
exports.CrmProcessor = CrmProcessor;
exports.CrmProcessor = CrmProcessor = CrmProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('reminders'),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ServiceRecord)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.NotificationHistory)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CrmProcessor);
//# sourceMappingURL=crm.processor.js.map