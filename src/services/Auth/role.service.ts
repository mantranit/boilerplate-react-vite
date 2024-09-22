import { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE, GET, POST, PUT } from "../axios.ts";
import { BaseResponse } from "../../data/base-response.model.ts";
import {
  RoleRequest,
  RoleResponse,
  RolesResponse,
} from "../../data/auth/role.model.ts";
import { TableFilterState } from "../../redux/store.ts";

export const getRoleByIdAsync = createAsyncThunk(
  "roles/getRoleByIdAsync",
  async (roleId: string) => {
    const response: AxiosResponse<BaseResponse<RoleResponse>> = await GET(
      `/roles/${roleId}`
    );

    return response.data.data;
  }
);

export const getRolesAsync = createAsyncThunk(
  "roles/getRolesAsync",
  async (params: TableFilterState) => {
    const response: AxiosResponse<BaseResponse<RolesResponse>> = await GET(
      "/roles",
      {
        params,
      }
    );
    return response.data.data;
  }
);

export const addRoleAsync = createAsyncThunk(
  "roles/addRoleAsync",
  async (request: RoleRequest) => {
    const response: AxiosResponse<BaseResponse<RoleResponse>> = await POST(
      "/roles",
      request
    );

    return response.data.data.role;
  }
);

export const updateRoleAsync = createAsyncThunk(
  "roles/updateRoleAsync",
  async (request: RoleRequest) => {
    const response: AxiosResponse<BaseResponse<RoleResponse>> = await PUT(
      `/roles/${request.id}`,
      request
    );

    return response.data.data.role;
  }
);

export const deleteRoleAsync = createAsyncThunk(
  "roles/deleteRoleAsync",
  async (roleId: string) => {
    const response: AxiosResponse<BaseResponse<string | null>> = await DELETE(
      `/roles/${roleId}`
    );

    return response.data.data ?? roleId;
  }
);

export const deleteRolesAsync = createAsyncThunk(
  "roles/deleteRolesAsync",
  async (roleIds: string[]) => {
    const response: AxiosResponse<BaseResponse<string[]>> = await DELETE(
      `/roles`,
      {
        data: roleIds,
      }
    );

    return response.data.data ?? roleIds;
  }
);

export const getSystemPermissionsAsync = createAsyncThunk(
  "roles/getSystemPermissionsAsync",
  async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: AxiosResponse<BaseResponse<any>> = await GET(
      `/roles/system-permissions`
    );

    return response.data.data.systemPermissions;
  }
);
