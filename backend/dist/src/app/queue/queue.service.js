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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../common/entities");
const queue_gateway_1 = require("./queue.gateway");
const enums_1 = require("../common/enums");
let QueueService = class QueueService {
    constructor(bookingRepository, queueRepository, queueGateway) {
        this.bookingRepository = bookingRepository;
        this.queueRepository = queueRepository;
        this.queueGateway = queueGateway;
    }
    async joinQueue(bookingId) {
        const booking = await this.bookingRepository.findOne({ where: { id: bookingId } });
        if (!booking) {
            throw new common_1.NotFoundException(`Booking with ID ${bookingId} not found.`);
        }
        const existingEntry = await this.queueRepository.findOne({ where: { booking: { id: bookingId } } });
        if (existingEntry) {
            throw new common_1.ConflictException(`Booking ${bookingId} is already in the queue.`);
        }
        booking.status = enums_1.BookingStatus.IN_PROGRESS;
        await this.bookingRepository.save(booking);
        const newQueueEntry = this.queueRepository.create({
            booking,
            status: enums_1.QueueStatus.WAITING,
        });
        const savedEntry = await this.queueRepository.save(newQueueEntry);
        await this.broadcastCurrentQueueState(booking.branch.id);
        return savedEntry;
    }
    async getNextCustomer(branchId) {
        return this.queueRepository.findOne({
            where: {
                booking: { branch: { id: branchId } },
                status: enums_1.QueueStatus.WAITING
            },
            order: {
                priority_score: 'DESC',
                entered_at: 'ASC',
            },
            relations: ['booking', 'booking.customer'],
        });
    }
    async updateQueueItemStatus(queueItemId, status, staffId) {
        const queueItem = await this.queueRepository.findOne({
            where: { id: queueItemId },
            relations: ['booking', 'booking.branch']
        });
        if (!queueItem) {
            throw new common_1.NotFoundException(`Queue item with ID ${queueItemId} not found.`);
        }
        const staff = new entities_1.User();
        staff.id = staffId;
        queueItem.status = status;
        if (status === enums_1.QueueStatus.WASHING) {
            queueItem.started_at = new Date();
            queueItem.serviced_by = staff;
        }
        else if (status === enums_1.QueueStatus.DONE) {
            queueItem.finished_at = new Date();
            queueItem.booking.status = enums_1.BookingStatus.COMPLETED;
            await this.bookingRepository.save(queueItem.booking);
        }
        const updatedItem = await this.queueRepository.save(queueItem);
        await this.broadcastCurrentQueueState(queueItem.booking.branch.id);
        return updatedItem;
    }
    async getQueueState(branchId) {
        const waiting = await this.queueRepository.find({
            where: { status: enums_1.QueueStatus.WAITING, booking: { branch: { id: branchId } } },
            relations: ['booking', 'booking.customer', 'booking.service'],
            order: { priority_score: 'DESC', entered_at: 'ASC' },
        });
        const washing = await this.queueRepository.find({
            where: { status: enums_1.QueueStatus.WASHING, booking: { branch: { id: branchId } } },
            relations: ['booking', 'booking.customer', 'booking.service', 'serviced_by'],
            order: { started_at: 'ASC' },
        });
        return { waiting, washing };
    }
    async broadcastCurrentQueueState(branchId) {
        const state = await this.getQueueState(branchId);
        this.queueGateway.broadcastQueueUpdate(state);
    }
};
exports.QueueService = QueueService;
exports.QueueService = QueueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Booking)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.BookingQueue)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        queue_gateway_1.QueueGateway])
], QueueService);
//# sourceMappingURL=queue.service.js.map