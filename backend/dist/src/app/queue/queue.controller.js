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
exports.QueueController = void 0;
const common_1 = require("@nestjs/common");
const queue_service_1 = require("./queue.service");
const dto_1 = require("./dto");
let QueueController = class QueueController {
    constructor(queueService) {
        this.queueService = queueService;
    }
    joinQueue(bookingId) {
        if (!bookingId) {
            throw new Error('bookingId is required.');
        }
        return this.queueService.joinQueue(bookingId);
    }
    getNextCustomer(branchId) {
        if (!branchId) {
            throw new Error('branchId is required.');
        }
        return this.queueService.getNextCustomer(branchId);
    }
    getQueueState(branchId) {
        if (!branchId) {
            throw new Error('branchId is required.');
        }
        return this.queueService.getQueueState(branchId);
    }
    updateQueueItemStatus(id, updateQueueStatusDto) {
        return this.queueService.updateQueueItemStatus(id, updateQueueStatusDto.status, updateQueueStatusDto.staffId);
    }
};
exports.QueueController = QueueController;
__decorate([
    (0, common_1.Post)('join'),
    __param(0, (0, common_1.Body)('bookingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "joinQueue", null);
__decorate([
    (0, common_1.Get)('next'),
    __param(0, (0, common_1.Query)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "getNextCustomer", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "getQueueState", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateQueueStatusDto]),
    __metadata("design:returntype", void 0)
], QueueController.prototype, "updateQueueItemStatus", null);
exports.QueueController = QueueController = __decorate([
    (0, common_1.Controller)('queue'),
    __metadata("design:paramtypes", [queue_service_1.QueueService])
], QueueController);
//# sourceMappingURL=queue.controller.js.map