import { useVariables } from "@/core/client/providers/variables/variables.provider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// interface Variable {
//   id: string;
//   status_payment: string;
//   command: string;
//   command_value: string;
// }

export function generateReferenceUtils(type:string): string {
  const randomNumber = Math.floor(Math.random() * 1000000000)
    .toString()
    .padStart(12, "0");
  return `${type}_${randomNumber}`;
}


export const ModalUpdateVariableActions = () => {
  const [showModalUpdateVariable, setShowModalUpdateVariable] = useState(false);

  const showModalUpdateAction = () => {
    setShowModalUpdateVariable(true);
  };

  const closeModalUpdateAction = () => {
    setShowModalUpdateVariable(false);
  };

  return {
    showModalUpdateAction,
    closeModalUpdateAction,
    showModalUpdateVariable,
  };
};

export const VariableUpdateAction = () => {
  const { register, handleSubmit, setValue, getValues, reset} = useForm();
  const { ProviderUpdateVariable } = useVariables();
  const [showCommands, setShowCommands] = useState<any>()

  const onSubmit = (data: any) => {
    const { command, command_value, status_payment, ...cleanedData } = data;
    if(showCommands?.length == 0){
      return toast.warning("Adicione um comando a variável.")
    }
    ProviderUpdateVariable({
      ...cleanedData,
      quantity: parseInt(cleanedData.quantity),
      commands: showCommands
    });

    reset()
  };

  const createVariables = () => {
    const status_payment = getValues("status_payment");
    const command = getValues("command");
    const command_value = getValues("command_value");
  
    if (!status_payment || !command || !command_value) {
      toast.warning("Todos os campos da área de comandos devem ser preenchidos.");
      return;
    }
  
    const newCommand = {
      status_payment,
      command,
      command_value
    };
  
    const isDuplicate = showCommands.some((variable: { status_payment: any; command: any; command_value: any; }) => (
      variable.status_payment === newCommand.status_payment &&
      variable.command === newCommand.command &&
      variable.command_value === newCommand.command_value
    ));
  
    if (!isDuplicate) {
      const newVariable = {
        id: generateReferenceUtils('command'), 
        ...newCommand
      };
      setShowCommands([...showCommands, newVariable]);
    } else {
      toast.warning("Esse comando já foi registrado.");
    }
  };
  
  const removeVariable = (id: string) => {
    const updatedVariables = showCommands.filter((variable: { id: string; }) => variable.id !== id);
    setShowCommands(updatedVariables);
  };

  const form = {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
  };

  return { form, createVariables, removeVariable, setShowCommands, showCommands};
};
