"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bullmq_1 = require("@nestjs/bullmq");
const entities_1 = require("../common/entities");
const crm_cron_1 = require("./crm.cron");
const crm_processor_1 = require("./crm.processor");
const crm_service_1 = require("./crm.service");
const crm_controller_1 = require("./crm.controller");
let CrmModule = class CrmModule {
};
exports.CrmModule = CrmModule;
exports.CrmModule = CrmModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entities_1.ServiceRecord, entities_1.NotificationHistory, entities_1.User]),
            bullmq_1.BullModule.registerQueue({
                name: 'reminders',
            }),
        ],
        providers: [
            crm_cron_1.CrmCronService,
            crm_processor_1.CrmProcessor,
            crm_service_1.CrmService,
        ],
        controllers: [
            crm_controller_1.CrmController,
        ],
    })
], CrmModule);
//# sourceMappingURL=crm.module.js.map