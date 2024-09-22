import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  Gender,
  MaritalStatus,
  GeneralInfo,
  GovernmentInfo,
  BankInfo,
  EmergencyContact,
  OnboardingEmployee,
} from "../../data/employee/onboarding.model";
import {
  updateOnboardingBankInfoAsync,
  updateOnboardingEmergencyContactAsync,
  updateOnboardingGeneralInfoAsync,
  updateOnboardingGovernmentInfoAsync,
} from "../../services/Employee/onboarding.service";
import { pick } from "../../utils";



export type OnboardingState = {
  generalInformation: GeneralInfo;
  governmentInformation: GovernmentInfo;
  bankInformation: BankInfo;
  emergencyContact: EmergencyContact;
};

export const initGeneralInfo: GeneralInfo = {
  dateOfBirth: "",
  gender: Gender.MALE,
  maritalStatus: MaritalStatus.Single,
  personalEmail: "",
  contactAddress: "",
  permanentAddress: "",
  phoneNumber: "",
};

export const initGovernmentInfo: GovernmentInfo = {
  pitNo: "",
  vneIDDate: "",
  vneIDNo: "",
  vneIDPlace: "",
  siNo: "",
};

export const initBankInfo: BankInfo = {
  bankAccountName: "",
  bankBranch: "",
  bankName: "",
  bankAccountNumber: "",
};

export const initEmergencyContact: EmergencyContact = {
  ecName: "",
  ecPhoneNumber: "",
  ecRelationship: "",
  fingerprintId: "",
  payslipPassword: "",
};

const initOnboardingState: OnboardingState = {
  generalInformation: initGeneralInfo,
  governmentInformation: initGovernmentInfo,
  bankInformation: initBankInfo,
  emergencyContact: initEmergencyContact,
};

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: initOnboardingState,
  reducers: {
    setOnboardingEmployee: (
      state,
      action: PayloadAction<OnboardingEmployee>
    ) => {
      state.generalInformation = pick(
        action.payload,
        Object.keys(state.generalInformation) as (keyof GeneralInfo)[]
      );

      state.governmentInformation = pick(
        action.payload,
        Object.keys(state.governmentInformation) as (keyof GovernmentInfo)[]
      );

      state.bankInformation = pick(
        action.payload,
        Object.keys(state.bankInformation) as (keyof BankInfo)[]
      );

      state.emergencyContact = pick(
        action.payload,
        Object.keys(state.emergencyContact) as (keyof EmergencyContact)[]
      );

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      updateOnboardingGeneralInfoAsync.fulfilled,
      (state, action) => {
        state.generalInformation = pick(
          action.payload.employee,
          Object.keys(state.generalInformation) as (keyof GeneralInfo)[]
        );
      }
    );
    builder.addCase(
      updateOnboardingGovernmentInfoAsync.fulfilled,
      (state, action) => {
        state.governmentInformation = pick(
          action.payload.employee,
          Object.keys(state.governmentInformation) as (keyof GovernmentInfo)[]
        );
      }
    );
    builder.addCase(
      updateOnboardingBankInfoAsync.fulfilled,
      (state, action) => {
        state.bankInformation = pick(
          action.payload.employee,
          Object.keys(state.bankInformation) as (keyof BankInfo)[]
        );
      }
    );
    builder.addCase(
      updateOnboardingEmergencyContactAsync.fulfilled,
      (state, action) => {
        state.emergencyContact = pick(
          action.payload.employee,
          Object.keys(state.emergencyContact) as (keyof EmergencyContact)[]
        );
      }
    );
  },
});

export const { setOnboardingEmployee } = onboardingSlice.actions;

export const selectOnboarding = (state: RootState) => state.onboarding;

export default onboardingSlice.reducer;
