import { AxiosResponse } from "axios";
import {  ContractResponse, ContractsResponse } from "../../data/contract";
import { BaseResponse } from "../../data/base-response.model";
import { GET, PUT, POST } from "../axios";
import { ContractFormProps } from "../../data/contract";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TableFilterState } from "../../redux/store";



export const handleContract =  createAsyncThunk (
    "contracts/saveContract",
    async (createContract: ContractFormProps) => {
      const response: AxiosResponse<BaseResponse<ContractResponse>> = await POST(
        `/contracts/`, // Assuming the `id` is part of `createContract`
        createContract // Passing the request body
      );
      return response.data.data.contract;
    }
)


export const getContractsAsync = (
    async () => {
        const response: AxiosResponse<BaseResponse<ContractsResponse>> = await GET(
        "/contracts"
        );
        return response.data.data;
    }
);
export const getContractsByIdAsync = createAsyncThunk (
    "contracts/getContractsByIdAsync",
    async ({id,params}:{id:string, params: TableFilterState}) => {
        const response: AxiosResponse<BaseResponse<ContractsResponse>> = await GET(
        `/contracts/employee/${id}`,{
            params
        }
        );
        return response.data.data;
    }
);



export const resignContractAsync = createAsyncThunk (
    "contracts/resignContractAsync",
    async (contract: ContractFormProps) => {
      const response: AxiosResponse<BaseResponse<ContractFormProps>> = await PUT(
        `/contracts/${contract.id}`, contract 
      );
      return response.data.data;
    }
  );