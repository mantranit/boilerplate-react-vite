import { Employee } from "../employee/employee.model";

export type Department = {
  isChild: boolean;
  id: string;
  name: string;
  manager?: Employee;
  orderNumber: number;
  parentId: string;
  childrenDepartment: Department[];
  employeeQuantity: number;
};

export type DepartmentResponse = {
  department: Department;
};

export type DepartmentsResponse = {
  departments: Department[];
  pageSize: number;
  pageIndex: number;
  count: number;
};

export type DepartmentRequest = {
  id?: string;
  name: string;
  manager?: Employee;
  orderNumber: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parentId: any;
  childrenDepartment: Department[];
};
