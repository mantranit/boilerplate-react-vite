export type LeaveType = {
    id : string;
    name : string;
    regulationQuantity : number;
    orderNumber : number;
}

export type LeaveTypeResponse = {
    leaveTypes : LeaveType[];
    pageSize : number;
    pageIndex : number;
    count : number;
}

export type LeaveTypesOfEmployee = {
    id : string;
    name : string;
    regulationQuantity : number;
    orderNumber: number;
    used: number;
    remaining: number;
}

export type EmployeeLeaveRequest = {
    LeaveTypes : LeaveType[];
}