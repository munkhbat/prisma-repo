export const enum ROLE {
  ADMIN = "admin",
  COMPANY = "company",
  MANAGER = "manager",
  USER = "user",
}

export const ROLES_ENUM = [ROLE.ADMIN, ROLE.COMPANY, ROLE.MANAGER, ROLE.USER];

export const enum STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
  DELETED = "deleted",
}

export enum COMPANY_TYPE {
  COMPANY = "company",
  USER = "user",
}

export const enum BUSINESS_TYPE {
  MANUFACTURING = "manufacturing",
  SERVICE = "service",
  TRADE = "trade",
}

export const enum LOG_ACTION_TYPE {
  CREATE = "create",
  UPDATE = "update",
}

export const enum ANNUAL_REVENUE {
  BELOW_300M = "below_300m",
  BETWEEN_300M_AND_1B = "between_300m_and_1b",
  BETWEEN_1B_AND_2_5B = "between_1b_and_2_5b",
  ABOVE_2_5B = "above_2_5b",
}

export enum STATUS_FILTER {
  ALL = "all",
  ACTIVE = "active",
  INACTIVE = "inactive",
  DELETED = "deleted",
}

export const enum GENDER {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export const enum DOCUMENT_TYPE {
  COMPANY_REGISTRATION_FRONT = "registration_certificate_front",
  COMPANY_REGISTRATION_BACK = "registration_certificate_back",
  PRODUCT_CATALOG = "product_catalog",
  INTELLECTUAL_PROPERTY_PATENT = "intellectual_property_patent",
  PRODUCT_CERTIFICATION = "product_certification",
  ISO_CERTIFICATION = "iso_certification",
  ECO_LABEL_CERTIFICATION = "eco_label_certification",
}

export interface IContextUser {
  id: string;
  role: ROLE;
  company_id: string;
}

export interface IResponse {
  success: boolean;
  message: string;
}

export interface IPaginate {
  page?: number;
  limit?: number;
}

export interface IChangeStatus {
  id: string;
  status: STATUS;
}

export const enum HTTP_STATUS {
  UNAUTHORIZED = "UNAUTHORIZED",
}

export const enum HTTP_STATUS_CODES {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

export const enum STEP_STATUS {
  REQUIREMENT = "requirement",
  MEETING = "meeting",
  CONTRACT = "contract",
}

export const enum PROCESS_STATUS {
  WAITING = "waiting",
  DENIED = "denied",
  APPROVED = "approved",
  CANCELLED = "cancelled",
}

export const enum COMPANY_CALCULATION {
  SELLING = "selling",
  ESTIMATED = "estimated",
}

export interface IRowResponse extends IResponse {
  row: object;
}

export interface IRowsResponse extends IResponse {
  rows: object;
}

export interface ICountsResponse extends IResponse {
  counts: object;
}

export const enum PRODUCT_PROCESS_STATUS {
  ALL = "all",
  DRAFT = "draft",
  PENDING = "pending",
  ACTIVE = "active",
  ARCHIVED = "archived",
  DELETED = "deleted",
}

export const enum REQUEST_PROCESS_STATUS {
  PENDING = "pending",
  REJECTED = "rejected",
  APPROVED = "approved",
  CANCELLED = "cancelled",
}

export const enum SUPPLY_PROCESS_STATUS {
  PENDING = "pending",
  PREPARING = "preparing",
  PACKING = "packing",
  SHIPPING = "shipping",
  DELIVERED = "delivered",
}

export const enum FEE_TYPE {
  TRANSPORTATION_COST = "transportation_cost",
  WAREHOUSE_COST = "warehouse_cost",
  OPERATING_COST = "operating_cost",
  MARKETING_COST = "marketing_cost",
  BANK_FEE = "bank_fee",
  OTHER = "other",
  COMMISSION_FEE = "commission_fee",
  AANOAT_FEE = "aanoat",
  EU_EX_VAT = "eu_ex_vat",
  VAT_FEE = "vat_fee",
  WHOLE_SALE_VAT = "whole_sale_vat",
}

export const enum FEE_PHASE_TYPE {
  PRE = "pre",
  POST = "post",
  ALL = "all",
}

export const enum SHIPMENT_REQUEST_PROCESS_STATUS {
  WAITING = "waiting",
  CANCELLED = "cancelled",
  SHIPPING = "shipping",
  COMPLETED = "completed",
}

export const enum SHIPMENT_TYPE {
  ALL = "all",
  AIR = "air",
  LAND = "land",
}

export const enum SHIPMENT_PROCESS_STATUS {
  ALL = "all",
  UNDER_REVIEWING = "under_reviewing",
  CONFIRMED = "confirmed",
  STORED_IN_ODM = "stored_in_odm",
  COMPILING_DOCUMENTATION = "compiling_documentation",
  CROSSING_MONGOLIAN_BORDER = "crossing_mongolian_border",
  IN_TRANSIT = "in_transit",
  CROSSING_INTERNATIONAL = "crossing_international",
  STORED_INTERNATIONALLY = "stored_internationally",
}

export const enum PREPACKAGE_STATUS {
  PREPACKAGE = "prepackage",
  PACKAGE = "package",
  SUPPLY = "supply",
}

export const enum PACKAGE_TYPE {
  SINGLE = "single",
  MULTIPLE = "multiple",
  CHILD = "child",
}

export enum INVOICE_STATUS {
  NEW = "new",
  CHECKED = "checked",
  PAID = "paid",
  NOT_PAID = "not_paid",
  PENDING = "pending",
  EXPIRED = "expired",
}

export const enum INVOICE_STATUS_FILTER {
  ALL = "all",
  NEW = "new",
  CHECKED = "checked",
  PAID = "paid",
  NOT_PAID = "not_paid",
  PENDING = "pending",
  EXPIRED = "expired",
}

export const enum NOTIFICATION_TYPE {
  EMAIL = "email",
  SMS = "sms",
}

export const enum NOTIFICATION_TYPE_FILTER {
  ALL = "all",
  EMAIL = "email",
  SMS = "sms",
}

export const enum NOTIFICATION_STATUS {
  PENDING = "pending",
  SENT = "sent",
  FAILED = "failed",
}

export const enum NOTIFICATION_STATUS_FILTER {
  ALL = "all",
  PENDING = "pending",
  SENT = "sent",
  FAILED = "failed",
}

export const enum NOTIFICATION_TEMPLATE {
  OTP = "otp",
  STATUS_CHANGE = "status_change",
  COLLABORATE = "collaborate",
}

export const enum DATE_RANGE_OPTION {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  LAST_3_MONTHS = "last_3_months",
  LAST_6_MONTHS = "last_6_months",
  CUSTOM = "custom",
}

export const enum DATE_OPTION {
  HOURS = "hours",
  DAY = "day",
  MONTH = "month",
}

export const enum SALES_INVOICE_STATUS {
  ALL = "all",
  PENDING = "pending",
  PAID = "paid",
  CANCELLED = "cancelled",
  CHECKED = "checked",
  NEW = "new",
}

export const enum CURRENCY_CODE {
  MNT = "MNT",
  USD = "USD",
  EUR = "EUR",
}
