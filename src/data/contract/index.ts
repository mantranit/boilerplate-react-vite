
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TableFilterState } from "../../redux/store";

export type ContractFormProps = {
  id?: string;
  employeeId?: string;
  name: string;
  contractType: string;
  workingType: string;
  startDate: Date;
  endDate?: Date;
  status: ContractStatus;
};

export enum ContractTypes {
  OFFICIAL_1_YEAR = "Official (1 year)",
  OFFICIAL_2_YEARS = "Official (2 years)",
  INTERNSHIP = "Internship",
}
export const ContractType = Object.values(ContractTypes);
export enum WorkingTypeOptions {
  FULL_TIME = "Fulltime",
  PART_TIME = "Parttime",
}
export const workingTypes = Object.values(WorkingTypeOptions);
    


export enum ContractStatus {
  PENDING = "Pending",
  ACTIVE = "Active",
  TERMINATED = "Terminated",
  EXPIRED = "Expired",
}


export type Contract = {
    id: string;
    employeeFullName: string;
    contractType: string;
    workingType: string;
    startDate: Date;
    endDate: Date;
    status: ContractStatus

};

export type ContractsResponse = TableFilterState & {
    contracts: Contract[];
    count: number;
};

export type ContractResponse = {
    contract: Contract;
};
export type CreateContract = {
  id: string;
  name: string;
  contractType: string;
  workingType: string;
  startDate: Date;
  joinDate: Date;
  endDate: Date;
};
export type ResignContractProps = {
  id: string;
  startDate: Date;
  leaveDate: Date;
  status? : ContractStatus;
};

