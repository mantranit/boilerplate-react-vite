import { createAsyncThunk } from "@reduxjs/toolkit";
import { LeaveType, LeaveTypeResponse } from "../../data/leave/leave.model";
import { BaseResponse } from "../../data/base-response.model";
import { AxiosResponse } from "axios";
import { DELETE, GET, POST, PUT } from "../axios";

export const getLeaveTypeAsync = createAsyncThunk(
    "leave/getLeaveTypeAsync",
    async () => {
        const response: AxiosResponse<BaseResponse<LeaveTypeResponse>> = await GET(
        "/leave-types"
        );
        return response.data.data;
    }
    );

export const addLeaveTypeAsync = createAsyncThunk(
    "leave/addLeaveTypeAsync",
    async (request: LeaveType) => {
        const response: AxiosResponse<BaseResponse<LeaveType>> = await POST(
        "/leave-types",
        request
        );
        return response.data.data;
    }
);

export const updateLeaveTypeAsync = createAsyncThunk(
    "leave/updateLeaveTypeAsync",
    async (request: LeaveType) => {
        const response: AxiosResponse<BaseResponse<LeaveType>> = await PUT(
        `/leave-types/${request.id}`,
        request
        );
        return response.data.data;
    }
);

export const deleteLeaveTypeAsync = createAsyncThunk(
    "leave/deleteLeaveTypeAsync",
    async (id: string) => {
        const response: AxiosResponse<BaseResponse<string>> = await DELETE(
        `/leave-types/${id}`,
        );
        return response.data.data;
    }
);
