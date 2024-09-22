/* eslint-disable @typescript-eslint/no-explicit-any */
import { Role } from "../auth/role.model";
import { Contract } from "../contract";
import { Department } from "../employer/department.model";
import { Position } from "../employer/position.model";
import {
  BankInfo,
  EmergencyContact,
  GeneralInfo,
  GovernmentInfo,
} from "./onboarding.model";

export enum EmployeeStatus {
  RESIGN = "Resign",
  ACTIVE = "Active",
  TERMINATED = "Terminated",
}

export type EmpResponse = {
  employee: EmployeeRequest;
};

export type EmployeeRequest = GeneralInfo &
  GovernmentInfo &
  BankInfo &
  EmergencyContact & {
    id?: string;
    email: string;
    username: string;
    fullName: string;
    photo: string;
    departmentIds: string[];
    recommendedRoleIds: string[];
    positionId: string;
  };

export type Employee = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  photo: string;
  departments: Department[];
  position: Position;
  contracts: Contract[];
  bankAccount: bankAccount;
  status: EmployeeStatus;
  createdAt: string;
  resetToken: string;
  roles: Role[];
  positionId: string;
  departmentIds: string[];
};

export type EmployeeResponse = {
  employee: Employee;
};

export type EmployeesResponse = {
  employees: Employee[];
  pageSize: number;
  pageIndex: number;
  count: number;
};
export type CreateContractEmp = {
  id: string;
  Name: string;
  ContractType: string;
  WorkingType: string;
  StartDate: Date;
  JoinDate: Date;
  EndDate: Date;
  LeaveDate: Date;
};
export type bankAccount = {
  id?: string;
  bankName: string;
  bankBranch: string;
  bankAccountName: string;
  bankAccountNumber: string;
};
