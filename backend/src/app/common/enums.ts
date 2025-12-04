// apps/backend/src/app/common/enums.ts

export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  CUSTOMER = 'CUSTOMER',
}

export enum ResourceType {
  CUT_CHAIR = 'CUT_CHAIR',
  SHAMPOO_BED = 'SHAMPOO_BED',
}

export enum BookingStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum QueueStatus {
  WAITING = 'WAITING',
  WASHING = 'WASHING',
  DONE = 'DONE',
}

export enum NotificationStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}

export enum SocialPlatform {
  FACEBOOK = 'FACEBOOK',
  ZALO = 'ZALO',
}
