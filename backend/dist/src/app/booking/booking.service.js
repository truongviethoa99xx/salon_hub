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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../common/entities");
const enums_1 = require("../common/enums");
let BookingService = class BookingService {
    constructor(bookingRepository, serviceRepository, resourceRepository, queueRepository, serviceRecordRepository) {
        this.bookingRepository = bookingRepository;
        this.serviceRepository = serviceRepository;
        this.resourceRepository = resourceRepository;
        this.queueRepository = queueRepository;
        this.serviceRecordRepository = serviceRecordRepository;
    }
    async checkAvailability(branchId, date, serviceId) {
        const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
        if (!service) {
            throw new common_1.NotFoundException(`Service with ID ${serviceId} not found.`);
        }
        const totalCuttingChairs = await this.resourceRepository.count({
            where: { branch: { id: branchId }, type: enums_1.ResourceType.CUT_CHAIR, is_active: true },
        });
        if (totalCuttingChairs === 0) {
            return { availableSlots: [] };
        }
        const { startOfDay, endOfDay } = this.getStartAndEndOfDay(date);
        const existingBookings = await this.bookingRepository.find({
            where: {
                branch: { id: branchId },
                start_time: (0, typeorm_2.Between)(startOfDay, endOfDay),
                status: (0, typeorm_2.In)([enums_1.BookingStatus.SCHEDULED, enums_1.BookingStatus.CONFIRMED, enums_1.BookingStatus.IN_PROGRESS]),
            },
        });
        const availableSlots = [];
        const slotInterval = 15;
        const openingTime = new Date(startOfDay.getTime());
        openingTime.setHours(9, 0, 0, 0);
        const closingTime = new Date(startOfDay.getTime());
        closingTime.setHours(20, 0, 0, 0);
        let currentSlot = new Date(openingTime.getTime());
        while (currentSlot < closingTime) {
            const slotEndTime = new Date(currentSlot.getTime() + service.duration_minutes * 60 * 1000);
            if (slotEndTime > closingTime) {
                break;
            }
            const concurrentBookings = existingBookings.filter((booking) => (currentSlot >= booking.start_time && currentSlot < booking.end_time) ||
                (slotEndTime > booking.start_time && slotEndTime <= booking.end_time)).length;
            if (concurrentBookings < totalCuttingChairs) {
                availableSlots.push(new Date(currentSlot.getTime()));
            }
            currentSlot = new Date(currentSlot.getTime() + slotInterval * 60 * 1000);
        }
        return { availableSlots };
    }
    async createBooking(dto) {
        const { customerId, branchId, serviceId, stylistId, startTime, notes } = dto;
        const bookingStartTime = new Date(startTime);
        const service = await this.serviceRepository.findOne({ where: { id: serviceId } });
        if (!service) {
            throw new common_1.NotFoundException(`Service with ID ${serviceId} not found.`);
        }
        const bookingEndTime = new Date(bookingStartTime.getTime() + service.duration_minutes * 60 * 1000);
        const { availableSlots } = await this.checkAvailability(branchId, bookingStartTime, serviceId);
        const isSlotStillAvailable = availableSlots.some(slot => new Date(slot).getTime() === bookingStartTime.getTime());
        if (!isSlotStillAvailable) {
            throw new common_1.ConflictException('This time slot is no longer available. Please choose another time.');
        }
        const newBooking = this.bookingRepository.create({
            customer: { id: customerId },
            branch: { id: branchId },
            service: { id: serviceId },
            stylist: stylistId ? { id: stylistId } : null,
            start_time: bookingStartTime,
            end_time: bookingEndTime,
            status: enums_1.BookingStatus.SCHEDULED,
            notes,
        });
        const savedBooking = await this.bookingRepository.save(newBooking);
        const congestionWarning = await this.predictQueueCongestion(bookingEndTime, branchId);
        return { booking: savedBooking, warning: congestionWarning };
    }
    async completeBooking(bookingId) {
        const booking = await this.bookingRepository.findOne({
            where: { id: bookingId },
            relations: ['customer', 'service']
        });
        if (!booking) {
            throw new common_1.NotFoundException(`Booking with ID ${bookingId} not found.`);
        }
        if (booking.status === enums_1.BookingStatus.COMPLETED) {
            return booking;
        }
        booking.status = enums_1.BookingStatus.COMPLETED;
        const completedBooking = await this.bookingRepository.save(booking);
        const recommendedReturnDate = new Date(completedBooking.end_time);
        recommendedReturnDate.setDate(recommendedReturnDate.getDate() + 30);
        const serviceRecord = this.serviceRecordRepository.create({
            booking: completedBooking,
            customer: completedBooking.customer,
            service_date: completedBooking.end_time.toISOString().split('T')[0],
            recommended_return_date: recommendedReturnDate.toISOString().split('T')[0],
            notes: `Dịch vụ ${completedBooking.service.name} đã hoàn thành.`,
        });
        await this.serviceRecordRepository.save(serviceRecord);
        return completedBooking;
    }
    async predictQueueCongestion(time, branchId) {
        const totalShampooBeds = await this.resourceRepository.count({
            where: { branch: { id: branchId }, type: enums_1.ResourceType.SHAMPOO_BED, is_active: true },
        });
        if (totalShampooBeds === 0) {
            return true;
        }
        const predictionWindowMinutes = 30;
        const windowStart = new Date(time.getTime() - (predictionWindowMinutes / 2) * 60 * 1000);
        const windowEnd = new Date(time.getTime() + (predictionWindowMinutes / 2) * 60 * 1000);
        const servicesRequiringWash = await this.serviceRepository.find({
            where: { requires_shampoo_bed: true },
            select: ['id'],
        });
        const serviceIds = servicesRequiringWash.map(s => s.id);
        if (serviceIds.length === 0) {
            return false;
        }
        const potentiallyQueuedBookings = await this.bookingRepository.count({
            where: {
                branch: { id: branchId },
                service: { id: (0, typeorm_2.In)(serviceIds) },
                status: (0, typeorm_2.In)([enums_1.BookingStatus.SCHEDULED, enums_1.BookingStatus.CONFIRMED, enums_1.BookingStatus.IN_PROGRESS]),
                end_time: (0, typeorm_2.Between)(windowStart, windowEnd),
            },
        });
        return potentiallyQueuedBookings >= totalShampooBeds;
    }
    getStartAndEndOfDay(date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        return { startOfDay, endOfDay };
    }
    async findAllForScheduler(date, branchId) {
        const { startOfDay, endOfDay } = this.getStartAndEndOfDay(date);
        const whereClause = {
            start_time: (0, typeorm_2.Between)(startOfDay, endOfDay),
            status: (0, typeorm_2.In)([enums_1.BookingStatus.SCHEDULED, enums_1.BookingStatus.CONFIRMED, enums_1.BookingStatus.IN_PROGRESS]),
        };
        if (branchId) {
            whereClause.branch = { id: branchId };
        }
        const bookings = await this.bookingRepository.find({
            where: whereClause,
            relations: ['stylist', 'customer', 'service', 'branch'],
        });
        return bookings.map(booking => {
            var _a;
            return ({
                id: booking.id,
                resourceId: ((_a = booking.stylist) === null || _a === void 0 ? void 0 : _a.id) || 'unassigned',
                title: `${booking.customer.full_name} - ${booking.service.name}`,
                start: booking.start_time,
                end: booking.end_time,
                extendedProps: {
                    branchName: booking.branch.name,
                    customerPhone: booking.customer.phone_number,
                }
            });
        });
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Booking)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Service)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.SalonResource)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.BookingQueue)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.ServiceRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BookingService);
//# sourceMappingURL=booking.service.js.map