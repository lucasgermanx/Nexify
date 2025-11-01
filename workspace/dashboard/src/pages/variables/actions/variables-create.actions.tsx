import { useVariables } from "@/core/client/providers/variables/variables.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function generateReferenceUtils(type:string): string {
  const randomNumber = Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(12, "0");
  return `${type}_${randomNumber}`;
}

interface Variable {
  id: string;
  status_payment: string;
  command: string;
  command_value: string;
}

export const VariablesCreateActions = () => {
  const { register, handleSubmit, setValue, getValues, reset} = useForm();
  const { ProviderCreateVariable } = useVariables();
  const [variables, setVariables] = useState<Variable[]>([]);
  
  const onSubmit = (data: any) => {
    const { command, command_value, status_payment, ...cleanedData } = data;

    if(variables.length == 0){
      return toast.warning("Adicione um comando a variável.")
    }

    ProviderCreateVariable({
      ...cleanedData,
      quantity: parseInt(cleanedData.quantity),
      commands: variables
    });

    reset()
  };
  

  const createVariables = () => {
    const status_payment = getValues("status_payment");
    const command = getValues("command");
    const command_value = getValues("command_value");
    const quantity = getValues("quantity")
  
    // Verifica se algum dos campos está vazio
    if (!status_payment || !command || !command_value || !quantity) {
      toast.warning("Todos os campos da área de comandos devem ser preenchidos.");
      return;
    }
  
    const newCommand = {
      status_payment,
      command,
      command_value
    };
  
    const isDuplicate = variables.some(variable => (
      variable.status_payment === newCommand.status_payment &&
      variable.command === newCommand.command &&
      variable.command_value === newCommand.command_value
    ));
  
    if (!isDuplicate) {
      const newVariable = {
        id: generateReferenceUtils('command'), 
        ...newCommand
      };
      setVariables([...variables, newVariable]);
    } else {
      toast.warning("Esse comando já foi registrado.");
    }
  };
  
  const removeVariable = (id: string) => {
    const updatedVariables = variables.filter(variable => variable.id !== id);
    setVariables(updatedVariables);
  };

  const form = {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setValue
  };

  return { form, createVariables, removeVariable, variables };
};
