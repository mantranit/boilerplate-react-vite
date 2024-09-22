import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./auth/users.slice";
import contractSlice from "./contract";
import employeesSlice from "./employee/employees.slice";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "./auth/auth.slice";
import rolesSlice from "./auth/roles.slice";
import positionsSlice from "./employer/positions.slice";
import selectionsSlice from "./selections/selections.slice";
import onboardingSlice from "./onboarding/onboarding.slice";
import departmentsSlice from "./employer/departments.slice";
import leaveSlice from "./leave/leave.slice";
import holidaysSlice from "./holiday/holiday.slice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    employees: employeesSlice,
    auth: authSlice,
    contract: contractSlice,
    roles: rolesSlice,
    positions: positionsSlice,
    departments: departmentsSlice,
    selections: selectionsSlice,
    onboarding: onboardingSlice,
    leave: leaveSlice,
    holidays: holidaysSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch<AppDispatch>;

export const useAppSelector = useSelector;

export type StateStatus = "idle" | "loading" | "success" | "failed";

export type ModalState = {
  open: boolean;
  objectId?: string;
  mode: "add" | "update";
};

export type TableFilterState = {
  pageIndex: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
};
