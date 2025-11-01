export interface ICommand {
    command: string;
    command_value: string;
    status_payment: string;
}

export interface IVariablesCreate{
    store_reference:string,
    variable: string,
    quantity: number;
    commands: ICommand[];
}

export interface IVariablesDelete{
    store_reference: string,
    variable_reference: string
}

export interface IVariableUpdate{
    store_reference:string,
    variable_reference: string
    variable: string,
    quantity: number;
    option_name: string,
    commands: ICommand[];
}