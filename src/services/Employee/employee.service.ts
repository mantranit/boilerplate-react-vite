import { EmployeeFilter } from "../../redux/employee/employees.slice";

import { TableFilterState } from "../../redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { AxiosResponse } from "axios";
import { DELETE, GET, POST, PUT } from "../axios";
import { BaseResponse } from "../../data/base-response.model";
import {
  bankAccount,
  EmployeeRequest,
  EmployeeResponse,
  EmployeesResponse,
  EmpResponse,
} from "../../data/employee/employee.model";

export const getEmployeeByIdAsync = createAsyncThunk(
  "employees/getEmployeeByIdAsync",
  async (employeeId: string) => {
    const response: AxiosResponse<BaseResponse<EmployeeResponse>> = await GET(
      `/employees/${employeeId}`
    );
    return response.data.data.employee;
  }
);

export const getEmployeeInfoAsync = createAsyncThunk(
  "employees/getEmployeeInfoAsync",
  async (employeeId: string) => {
    const response: AxiosResponse<BaseResponse<EmpResponse>> = await GET(
      `/employees/${employeeId}`
    );

    return response.data.data.employee;
  }
);

export const getEmployeesAsync = createAsyncThunk(
  "employees/getEmployeesAsync",
  async (params: TableFilterState) => {
    const response: AxiosResponse<BaseResponse<EmployeesResponse>> = await GET(
      "/employees",
      {
        params,
      }
    );
    return response.data.data;
  }
);

export const addEmployeeAsync = createAsyncThunk(
  "employees/addEmployeeAsync",
  async (request: EmployeeRequest) => {
    const response: AxiosResponse<BaseResponse<EmployeeResponse>> = await POST(
      "/employees",
      request
    );
    console.log("postEmpAsync:", response.data.data);
    return response.data.data.employee.id;
  }
);

export const updateEmployeeAsync = createAsyncThunk(
  "employees/updateEmployeeAsync",
  async (request: EmployeeRequest) => {
    const response: AxiosResponse<BaseResponse<EmpResponse>> = await PUT(
      `/employees/${request.id}`,
      request
    );
    console.log("updateEmpAsync:", response.data.data);
    return response.data.data;
  }
);

export const updateBankAsync = createAsyncThunk(
  "employees/updateBankAsync",
  async (request: bankAccount) => {
    console.log("request data:", request);
    const response: AxiosResponse<BaseResponse<EmployeeResponse>> = await PUT(
      `/employees/${request.id}/bank-account`,
      request
    );
    console.log("bankPut: ", response.data.data);
    return response.data.data;
  }
);

export const deleteEmployeesAsync = createAsyncThunk(
  "employees/deleteEmpAsync",
  async (empId: string) => {
    const response: AxiosResponse<BaseResponse<string | null>> = await DELETE(
      `/employees/${empId}`
    );
    return response.data.data;
  }
);

export const uploadImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  const response: AxiosResponse = await POST(`/medias/upload-image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data.url;
};

export const getEmployeesWithDepartmentsAsync = createAsyncThunk(
  "employees/getEmployeesWithDepartmentsAsync",
  async (params: EmployeeFilter) => {
    const response: AxiosResponse<BaseResponse<EmployeesResponse>> = await GET(
      `/employees`,
      {
        params,
      }
    );
    return response.data.data;
  }
);
export const importCsvFileAsync = async (file: File) => {
  console.log(file);
  const formData = new FormData();
  formData.append("csv-file", file);
  const response: AxiosResponse = await POST(
    `/employees/upload-csv`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.status;
};
export const importExcelFileAsync = async (file: File) => {
  console.log(file);
  const formData = new FormData();
  formData.append("excel-file", file);
  console.log(formData);
  const response: AxiosResponse = await POST(
    `/employees/upload-excel`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.status;
};

