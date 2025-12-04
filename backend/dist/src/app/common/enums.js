"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialPlatform = exports.NotificationStatus = exports.QueueStatus = exports.BookingStatus = exports.ResourceType = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["STAFF"] = "STAFF";
    UserRole["CUSTOMER"] = "CUSTOMER";
})(UserRole || (exports.UserRole = UserRole = {}));
var ResourceType;
(function (ResourceType) {
    ResourceType["CUT_CHAIR"] = "CUT_CHAIR";
    ResourceType["SHAMPOO_BED"] = "SHAMPOO_BED";
})(ResourceType || (exports.ResourceType = ResourceType = {}));
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["SCHEDULED"] = "SCHEDULED";
    BookingStatus["CONFIRMED"] = "CONFIRMED";
    BookingStatus["IN_PROGRESS"] = "IN_PROGRESS";
    BookingStatus["COMPLETED"] = "COMPLETED";
    BookingStatus["CANCELLED"] = "CANCELLED";
    BookingStatus["NO_SHOW"] = "NO_SHOW";
})(BookingStatus || (exports.BookingStatus = BookingStatus = {}));
var QueueStatus;
(function (QueueStatus) {
    QueueStatus["WAITING"] = "WAITING";
    QueueStatus["WASHING"] = "WASHING";
    QueueStatus["DONE"] = "DONE";
})(QueueStatus || (exports.QueueStatus = QueueStatus = {}));
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["PENDING"] = "PENDING";
    NotificationStatus["SUCCESS"] = "SUCCESS";
    NotificationStatus["FAILED"] = "FAILED";
})(NotificationStatus || (exports.NotificationStatus = NotificationStatus = {}));
var SocialPlatform;
(function (SocialPlatform) {
    SocialPlatform["FACEBOOK"] = "FACEBOOK";
    SocialPlatform["ZALO"] = "ZALO";
})(SocialPlatform || (exports.SocialPlatform = SocialPlatform = {}));
//# sourceMappingURL=enums.js.map