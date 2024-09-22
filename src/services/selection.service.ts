import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { BaseResponse } from "../data/base-response.model";
import { RolesResponse } from "../data/auth/role.model";
import { GET } from "./axios";
import { DepartmentsResponse } from "../data/employer/department.model";
import { Position, PositionsResponse } from "../data/employer/position.model";
import { EmployeesResponse } from "../data/employee/employee.model";

export const getAllRolesAsync = createAsyncThunk(
  "selections/getAllRolesAsync",
  async () => {
    const response: AxiosResponse<BaseResponse<RolesResponse>> = await GET(
      "/roles"
    );
    return response.data.data;
  }
);

export const getAllEmployeesAsync = createAsyncThunk(
  "selections/getAllEmployeesAsync",
  async () => {
    const response: AxiosResponse<BaseResponse<EmployeesResponse>> = await GET(
      "/employees"
    );
    return response.data.data;
  }
);

export const getAllDepartmentsAsync = createAsyncThunk(
  "/selections/getAllDepartmentsAsync",
  async () => {
    const response: AxiosResponse<BaseResponse<DepartmentsResponse>> =
      await GET("/departments");
    return response.data.data.departments;
  }
);

export const getAllPositionsLevels = createAsyncThunk(
  "/selections/getAllPositionsLevels",
  async () => {
    const response: AxiosResponse<BaseResponse<PositionsResponse>> = await GET(
      `/positions`
    );

    const positions = response.data.data.positions.flatMap((p) =>
      p.levels.map((childP) => ({
        ...childP,
        name: childP.level + " " + p.name,
      }))
    );

    return positions as Position[];
  }
);
