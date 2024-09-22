import { Department } from "../employer/department.model";
import { Position } from "../employer/position.model";

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}

export const genders = Object.values(Gender);

export enum MaritalStatus {
  Single = "Single",
  Marriage = "Marriage",
  Divorce = "Divorce",
  Widow = "Widow",
}

export const maritalStatus = Object.values(MaritalStatus);

export type GeneralInfo = {
  fullName?: string;
  departments?: Department[];
  position?: Position;
  photo?: string;
  dateOfBirth: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
  personalEmail: string;
  phoneNumber: string;
  contactAddress: string;
  permanentAddress: string;
};

export type GovernmentInfo = {
  vneIDNo: string;
  vneIDDate: string;
  vneIDPlace: string;
  pitNo: string;
  siNo: string;
};

export type BankInfo = {
  bankName: string;
  bankBranch: string;
  bankAccountName: string;
  bankAccountNumber: string;
};

export type EmergencyContact = {
  ecRelationship: string;
  ecName: string;
  ecPhoneNumber: string;
  fingerprintId: string;
  payslipPassword: string;
};

export type OnboardingEmployee = GeneralInfo &
  GovernmentInfo &
  BankInfo &
  EmergencyContact & {
    id: string;
  };

export type OnboardingResponse = {
  employee: OnboardingEmployee;
};
