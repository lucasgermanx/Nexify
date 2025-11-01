import { IPagination } from "@/@types/general.type";

export interface IVariables{
  store_reference:string,
  variable_reference:string,
  variable:string,
  command:string,
  command_value:string,
  option_name:string
  createdAt: string;
  updatedAt: string;
}

export interface ICommand {
  command: string;
  command_value: string;
  status_payment: string;
}

export interface IVariableCreate{
  store_reference:string,
  variable:string,
  commands: ICommand[]
}

export interface IVariableUpdate{
  variable_reference:string,
  store_reference:string,
  variable:string,
  command:string,
  command_value:string,
  option_name:string
}

export interface IVariableResponse {
  failed: boolean;
  variables: IVariables[];
  message: string;
  paginationCount: number;
  hasMoreResults: boolean;
}

export type VariablesContextType = {
  variables: IVariables[] | [] | undefined;
  paginationFilter: IPagination | undefined;
  ProviderFilterVariables: (value:string, page:string, size?:string) => void
  ProviderGetAllVariables: (page:string, size?:string) => void;
  ProviderDeleteVariable: (variable_reference:string) => void;
  ProviderCreateVariable: (data:IVariableCreate) => void;
  ProviderUpdateVariable: (data: IVariableUpdate) => void;
};
