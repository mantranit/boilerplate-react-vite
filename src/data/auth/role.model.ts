export type Role = {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  permissions: Permission[];
};

export type RoleRequest = {
  id?: string;
  name: string;
  description: string;
  createdBy?: string;
  permissions: Permission[];
};

export type RoleResponse = {
  role: Role;
};

export type RolesResponse = {
  roles: Role[];
  pageSize: number;
  pageIndex: number;
  count: number;
};

export type Permission = {
  id?: string;
  permission: string;
  name?: string;
  canView?: boolean;
  canCreate?: boolean;
  canRead?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  canSetPermission?: boolean;
  canImport?: boolean;
  canExport?: boolean;
  canSubmit?: boolean;
  canCancel?: boolean;
  canApprove?: boolean;
  canReject?: boolean;
  canReport?: boolean;
  canAssign?: boolean;
  canViewPartial?: boolean;
  canViewBelongTo?: boolean;
  canViewOwner?: boolean;
  canPermanentlyDelete?: boolean;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export const initPermission = {
  permission: "",
  canView: false,
  canRead: false,
  canCreate: false,
  canUpdate: false,
  canDelete: false,
  canSetPermission: false,
  canSubmit: false,
  canApprove: false,
  canAssign: false,
  canCancel: false,
  canExport: false,
  canImport: false,
  canReject: false,
  canReport: false,
  canViewBelongTo: false,
  canViewOwner: false,
  canViewPartial: false,
  canPermanentlyDelete: false,
};

export enum UserPermission {
  ADMINISTRATOR_ROLE = "ADMINISTRATOR_ROLE",
  ADMINISTRATOR_USER = "ADMINISTRATOR_USER",
  EMPLOYER_EMPLOYEE = "EMPLOYER_EMPLOYEE",
  EMPLOYER_DEPARTMENT = "EMPLOYER_DEPARTMENT",
  EMPLOYER_POSITION = "EMPLOYER_POSITION",
  EMPLOYER_CONTRACT = "EMPLOYER_CONTRACT",
  EMPLOYEE_LEAVE = "EMPLOYEE_LEAVE",
  EMPLOYEE_PERSONAL = "EMPLOYEE_PERSONAL",
  EMPLOYER_LEAVE_TYPE = "EMPLOYER_LEAVE_TYPE",
  EMPLOYER_HOLIDAY = "EMPLOYER_HOLIDAY",
}