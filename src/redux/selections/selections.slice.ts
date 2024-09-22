import { createSlice } from "@reduxjs/toolkit";
import { Role } from "../../data/auth/role.model";
import { RootState, StateStatus } from "../store";
import { Employee } from "../../data/employee/employee.model";
import { Position } from "../../data/employer/position.model";
import { Department } from "../../data/employer/department.model";
import {
  getAllDepartmentsAsync,
  getAllPositionsLevels,
  getAllRolesAsync,
  getAllEmployeesAsync,
} from "../../services/selection.service";

export type SelectState = {
  roles: Role[];
  positions: Position[];
  departments: Department[];
  employees: Employee[];
  getAllRoleStatus: StateStatus;
  getPositionsStatus: StateStatus;
  getDepartmentStatus: StateStatus;
  getEmployeeStatus: StateStatus;
};

const initSelectState: SelectState = {
  roles: [],
  getAllRoleStatus: "idle",
  getDepartmentStatus: "idle",
  getPositionsStatus: "idle",
  getEmployeeStatus: "idle",
  positions: [],
  departments: [],
  employees: [],
};

export const selectionsSlice = createSlice({
  name: "selections",
  initialState: initSelectState,
  reducers: {},
  extraReducers: (builder) => {
    //Roles
    builder.addCase(getAllRolesAsync.pending, (state) => {
      state.getAllRoleStatus = "loading";
    });
    builder.addCase(getAllRolesAsync.fulfilled, (state, action) => {
      state.roles = action.payload.roles;
      state.getAllRoleStatus = "success";
    });
    builder.addCase(getAllRolesAsync.rejected, (state) => {
      state.getAllRoleStatus = "failed";
    });

    //Employees
    builder.addCase(getAllEmployeesAsync.pending, (state) => {
      state.getEmployeeStatus = "loading";
    });
    builder.addCase(getAllEmployeesAsync.rejected, (state) => {
      state.getEmployeeStatus = "failed";
    });
    builder.addCase(getAllEmployeesAsync.fulfilled, (state, action) => {
      state.employees = action.payload.employees;
    });

    //Departments
    builder.addCase(getAllDepartmentsAsync.pending, (state) => {
      state.getDepartmentStatus = "loading";
    });
    builder.addCase(getAllDepartmentsAsync.rejected, (state) => {
      state.getDepartmentStatus = "failed";
    });
    builder.addCase(getAllDepartmentsAsync.fulfilled, (state, action) => {
      state.departments = action.payload;
    });

    //Positions
    builder.addCase(getAllPositionsLevels.pending, (state) => {
      state.getPositionsStatus = "loading";
    });
    builder.addCase(getAllPositionsLevels.rejected, (state) => {
      state.getPositionsStatus = "failed";
    });
    builder.addCase(getAllPositionsLevels.fulfilled, (state, action) => {
      state.positions = action.payload;
    });
  },
});

export const selectSelections = (state: RootState) => state.selections;

export default selectionsSlice.reducer;
