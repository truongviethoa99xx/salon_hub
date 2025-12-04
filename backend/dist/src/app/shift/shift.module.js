"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const shift_controller_1 = require("./shift.controller");
const shift_service_1 = require("./shift.service");
const entities_1 = require("../common/entities");
let ShiftModule = class ShiftModule {
};
exports.ShiftModule = ShiftModule;
exports.ShiftModule = ShiftModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.StylistShift])],
        controllers: [shift_controller_1.ShiftController],
        providers: [shift_service_1.ShiftService],
    })
], ShiftModule);
//# sourceMappingURL=shift.module.js.map