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
exports.MasterDataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../common/entities");
const enums_1 = require("../common/enums");
let MasterDataService = class MasterDataService {
    constructor(branchRepository, serviceRepository, userRepository) {
        this.branchRepository = branchRepository;
        this.serviceRepository = serviceRepository;
        this.userRepository = userRepository;
    }
    async findAllBranches() {
        return this.branchRepository.find();
    }
    async createService(createServiceDto) {
        const newService = this.serviceRepository.create(createServiceDto);
        return this.serviceRepository.save(newService);
    }
    async findAllServices() {
        return this.serviceRepository.find();
    }
    async findOneService(id) {
        const service = await this.serviceRepository.findOne({ where: { id } });
        if (!service) {
            throw new common_1.NotFoundException(`Service with ID ${id} not found.`);
        }
        return service;
    }
    async updateService(id, updateServiceDto) {
        const service = await this.serviceRepository.preload(Object.assign({ id }, updateServiceDto));
        if (!service) {
            throw new common_1.NotFoundException(`Service with ID ${id} not found.`);
        }
        return this.serviceRepository.save(service);
    }
    async removeService(id) {
        const service = await this.findOneService(id);
        await this.serviceRepository.remove(service);
    }
    async findAllStylists() {
        return this.userRepository.find({
            where: { role: enums_1.UserRole.STAFF },
            select: ['id', 'full_name', 'branch'],
        });
    }
};
exports.MasterDataService = MasterDataService;
exports.MasterDataService = MasterDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Branch)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Service)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MasterDataService);
//# sourceMappingURL=master-data.service.js.map