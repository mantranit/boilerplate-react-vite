import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState, RootState, StateStatus, TableFilterState } from "../store";
import { Role } from "../../data/auth/role.model";
import {
  addRoleAsync,
  deleteRoleAsync,
  deleteRolesAsync,
  getRoleByIdAsync,
  getRolesAsync,
  getSystemPermissionsAsync,
  updateRoleAsync,
} from "../../services/Auth/role.service";

type RoleTableFilter = TableFilterState & {
  searchName: string;
};
export type RoleState = {
  roleList: Role[];
  count: number;
  getSystemPermissionsStatus: StateStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  systemPermissions: any;
  detailRole: Role;
  selectedRoleId: string[];
  error: string | null;
  modal: ModalState;
  filter: RoleTableFilter;
};

export const initRoleFilterState: RoleTableFilter = {
  pageIndex: 1,
  pageSize: 5,
  sortField: "id",
  sortOrder: "asc",
  searchName: "",
};

export const initRole: Role = {
  id: "",
  name: "",
  description: "",
  createdBy: "",
  createdAt: "",
  permissions: [],
};

export const initRoleState: RoleState = {
  roleList: [],
  count: 0,
  getSystemPermissionsStatus: "idle",
  systemPermissions: null,
  selectedRoleId: [],
  detailRole: initRole,
  error: "",
  modal: { open: false, mode: "add" },
  filter: initRoleFilterState,
};

export const rolesSlice = createSlice({
  name: "roles",
  initialState: initRoleState,
  reducers: {
    saveRole: (state, action: PayloadAction<RoleState>) => {
      state.roleList = action.payload.roleList;
      return state;
    },
    resetRoleState: (state) => {
      state = initRoleState;
      return state;
    },
    selectRoleIds: (state, action: PayloadAction<string[]>) => {
      state.selectedRoleId = [...action.payload];
      return state;
    },
    setRoleModal: (state, action: PayloadAction<ModalState>) => {
      state.modal = action.payload;
      return state;
    },
    setRoleTableFilter: (state, action: PayloadAction<RoleTableFilter>) => {
      state.filter = action.payload;
      return state;
    },
    setDetailRole: (state, action: PayloadAction<Role>) => {
      state.detailRole = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRolesAsync.fulfilled, (state, action) => {
        state.roleList = action.payload.roles;
        state.count = action.payload.count;
      })
      .addCase(getRoleByIdAsync.fulfilled, (state, action) => {
        state.detailRole = action.payload.role;
      })
      .addCase(addRoleAsync.fulfilled, (state, action) => {
        state.roleList = [...state.roleList, action.payload];
      })
      .addCase(updateRoleAsync.fulfilled, (state, action) => {
        const index = state.roleList.findIndex(
          (r) => r.id === action.payload.id
        );
        if (index !== -1) state.roleList[index] = action.payload;
        state.detailRole = action.payload;
      })
      .addCase(deleteRoleAsync.fulfilled, (state, action) => {
        state.roleList = state.roleList.filter((u) => u.id !== action.payload);
      })
      .addCase(deleteRolesAsync.fulfilled, (state, action) => {
        state.roleList = state.roleList.filter(
          (u) => action.payload.indexOf(u.id) === -1
        );
      })
      .addCase(getSystemPermissionsAsync.fulfilled, (state, action) => {
        state.systemPermissions = action.payload;
      });
  },
});

export const {
  saveRole,
  resetRoleState,
  selectRoleIds,
  setRoleModal,
  setRoleTableFilter,
  setDetailRole,
} = rolesSlice.actions;

export const selectRoles = (state: RootState) => state.roles;

export default rolesSlice.reducer;
