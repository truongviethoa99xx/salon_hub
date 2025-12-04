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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const dto_1 = require("./dto");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    getSchedulerEvents(date, branchId) {
        if (!date) {
            throw new Error('A date query parameter is required.');
        }
        return this.bookingService.findAllForScheduler(new Date(date), branchId);
    }
    checkAvailability(branchId, date, serviceId) {
        if (!branchId || !date || !serviceId) {
            throw new Error('branchId, date, and serviceId are required query parameters.');
        }
        return this.bookingService.checkAvailability(branchId, new Date(date), serviceId);
    }
    createBooking(createBookingDto) {
        return this.bookingService.createBooking(createBookingDto);
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Get)('scheduler'),
    __param(0, (0, common_1.Query)('date')),
    __param(1, (0, common_1.Query)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "getSchedulerEvents", null);
__decorate([
    (0, common_1.Get)('availability'),
    __param(0, (0, common_1.Query)('branchId')),
    __param(1, (0, common_1.Query)('date')),
    __param(2, (0, common_1.Query)('serviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "checkAvailability", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateBookingDto]),
    __metadata("design:returntype", void 0)
], BookingController.prototype, "createBooking", null);
exports.BookingController = BookingController = __decorate([
    (0, common_1.Controller)('booking'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map