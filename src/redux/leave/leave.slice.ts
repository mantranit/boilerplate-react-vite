
import { createSlice } from "@reduxjs/toolkit";
import { LeaveType, LeaveTypeResponse } from "../../data/leave/leave.model";
import { getLeaveTypeAsync } from "../../services/Leave/leave.service";
import { RootState } from "../store";


export type leaveState = {
    leaveTypeList : LeaveTypeResponse;
    selectedLeaveType?: LeaveType;
    selectedLeaveTypes: LeaveType[];
    selectedLeaveTypeIds : string[];
}

export const initLeaveState : leaveState = {
    leaveTypeList : {
        leaveTypes : [],
        pageSize : 5,
        pageIndex : 1,
        count : 0
    },
    selectedLeaveType: undefined,
    selectedLeaveTypes: [],
    selectedLeaveTypeIds : []
}


export const leaveSlice = createSlice({
    name: "leave",
    initialState: initLeaveState,
    reducers: {
        setLeaveTypeList: (state, action) => {
            state.leaveTypeList = action.payload
        },
        selectLeaveType: (state, action) => {
            state.selectedLeaveType = action.payload
        },
        selectLeaveTypes: (state, action) => {
            state.selectedLeaveTypes = action.payload
            state.selectedLeaveTypeIds = action.payload.map((leaveType : LeaveType) => leaveType.id)
        },
        resetLeaveTypeSelection: (state) => {
            state.selectedLeaveType = undefined
            state.selectedLeaveTypes = []
        }
    },
    extraReducers: (builder) => {
     builder.addCase(getLeaveTypeAsync.fulfilled, (state, action) => {
       state.leaveTypeList = action.payload
     });
    }
})

export const { setLeaveTypeList, 
    selectLeaveType,
    selectLeaveTypes,
    resetLeaveTypeSelection
} = leaveSlice.actions;

export const selectLeave = (state: RootState) => state.leave;

export default leaveSlice.reducer