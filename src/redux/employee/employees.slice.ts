import { EmployeeStatus } from './../../data/employee/employee.model';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, StateStatus, TableFilterState } from "../store";
import {
  Employee,
  EmployeeRequest,
} from "../../data/employee/employee.model";
import {
  getEmployeesWithDepartmentsAsync,
  deleteEmployeesAsync,
  getEmployeeByIdAsync,
  getEmployeesAsync,
  getEmployeeInfoAsync,
} from "../../services/Employee/employee.service";
import {
  initBankInfo,
  initEmergencyContact,
  initGeneralInfo,
  initGovernmentInfo,
} from "../onboarding/onboarding.slice";
import { Department } from "../../data/employer/department.model";
import { Position } from "../../data/employer/position.model";

export type EmployeeFilterType = TableFilterState & {
  department: Department;
  position: Position;
  search: string;
  sortBy?: string;
  orderBy?: string;
  employeeStatus?: string;
};

export type EmployeeFilter = TableFilterState & {
  departmentId: string;
  positionId: string;
  employeeStatus?: string;
  search: string;
  sortBy?: string;
  orderBy?: string;
};

export type EmployeeState = {
  getEmployeeStatus: StateStatus;
  addEmployeeStatus: StateStatus;
  updateEmployeeStatus: StateStatus;
  deleteEmployeeStatus: StateStatus;
  employeeList: Employee[];
  total: number;
  selectedEmpIds: string[];
  selectedOneEmployee: Employee;
  detailEmployee: EmployeeRequest;
  employeeFilter: EmployeeFilterType;
  employeeFilterString: EmployeeFilter;
  error: string | null;
};

export const initEmployeeFilter: EmployeeFilterType = {
  pageIndex: 1,
  pageSize: 5,
  sortField: "id",
  orderBy: "ASC",
  department: { id: "", name: "" } as Department,
  position: { id: "", name: "" } as Position,
  search: "",
  sortBy: "name",
};

export const initEmployee: Employee = {
  id: "",
  email: "",
  username: "",
  fullName: "",
  photo: "",
  departments: [],
  position: {
    id: "",
    name: "",
    level: "",
    orderNumber: 0,
    parentId: "",
    levels: [],
  },
  contracts: [],
  status: {} as EmployeeStatus,
  createdAt: "",
  resetToken: "",
  roles: [],
  bankAccount: {
    bankName: "",
    bankBranch: "",
    bankAccountName: "",
    bankAccountNumber: "",
  },
  positionId: "",
  departmentIds: [],
};

export const initEmployeeDetail: EmployeeRequest = {
  ...initEmployee,
  ...initBankInfo,
  ...initGovernmentInfo,
  ...initEmergencyContact,
  ...initGeneralInfo,
  departmentIds: [],
  recommendedRoleIds: [],
  positionId: "",
};

export const initEmployeeState: EmployeeState = {
  employeeList: [],
  addEmployeeStatus: "idle",
  getEmployeeStatus: "idle",
  total: 0,
  deleteEmployeeStatus: "idle",
  selectedOneEmployee: initEmployee,
  updateEmployeeStatus: "idle",
  selectedEmpIds: [],
  employeeFilter: initEmployeeFilter,
  error: "",
  detailEmployee: initEmployeeDetail,
  employeeFilterString: {
    pageIndex: 1,
    pageSize: 5,
    sortField: "id",
    orderBy: "ASC",
    departmentId: "",
    positionId: "",
    search: "",
    sortBy: "name",
  },
};

export const employeeSlice = createSlice({
  name: "employees",
  initialState: initEmployeeState,
  reducers: {
    saveEmployee: (state, action: PayloadAction<EmployeeState>) => {
      state.employeeList = action.payload.employeeList;
    },
    resetEmployeesState: (state) => {
      state = initEmployeeState;
      return state;
    },
    selectEmployeeIds: (state, action: PayloadAction<string[]>) => {
      state.selectedEmpIds = [...action.payload];
    },
    setEmployeeTableFilter: (
      state,
      action: PayloadAction<EmployeeFilterType>
    ) => {
      state.employeeFilter = action.payload;
      state.employeeFilterString = {
        ...state.employeeFilterString,
        departmentId: action.payload.department.id,
        positionId: action.payload.position.id,
        search: action.payload.search,
        pageIndex: action.payload.pageIndex,
        pageSize: action.payload.pageSize,
        sortField: action.payload.sortField,
        orderBy: action.payload.orderBy,
        sortBy: action.payload.sortBy,
      };
    },
    setSelectOneEmployee: (state, action: PayloadAction<Employee>) => {
      state.selectedOneEmployee = action.payload;
    },
    setDetailEmployee: (state, action: PayloadAction<EmployeeRequest>) => {
      state.detailEmployee = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeesAsync.fulfilled, (state, action) => {
        state.employeeList = action.payload.employees;
        state.total = action.payload.count;
      })
      .addCase(deleteEmployeesAsync.fulfilled, (state, action) => {
        state.employeeList = state.employeeList.filter(
          (u) => u.id !== action.payload
        );
      })
      .addCase(getEmployeeByIdAsync.fulfilled, (state, action) => {
        state.selectedOneEmployee = action.payload;
      })
      .addCase(getEmployeeInfoAsync.fulfilled, (state, action) => {
        state.detailEmployee = action.payload;
      })
      .addCase(getEmployeesWithDepartmentsAsync.fulfilled, (state, action) => {
        state.employeeList = action.payload.employees;
        state.total = action.payload.count;
        state.employeeFilter.pageSize = action.payload.pageSize;
        state.employeeFilter.pageIndex = action.payload.pageIndex;
      });
  },
});

export const {
  saveEmployee,
  resetEmployeesState,
  selectEmployeeIds,
  setEmployeeTableFilter,
  setSelectOneEmployee,
} = employeeSlice.actions;

export const selectEmployees = (state: RootState) => state.employees;

export default employeeSlice.reducer;
