import { useVariables } from "@/core/client/providers/variables/variables.provider";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

export const VariableActions = () => {
    const { register, watch } = useForm();
    const {variables, paginationFilter, ProviderFilterVariables, ProviderGetAllVariables, ProviderDeleteVariable} = useVariables()
    const [isFiltering, setFiltering] = useState(false);

    const handlePageChange = (pageNumber: string) => {
        if (!isFiltering) {
            ProviderGetAllVariables(pageNumber);
        } else {
         ProviderFilterVariables(watch("value"), pageNumber);
        }
      };
    
      useEffect(() => {
        if(variables?.length == 0) return;
        if (watch("value")?.length != 0) {
          setFiltering(true);
          ProviderFilterVariables(watch("value"), '1');
        } else {
          setFiltering(false);
          ProviderGetAllVariables('1');
        }
      }, [watch("value")]);

    return {variables, paginationFilter, register, handlePageChange, ProviderDeleteVariable}
}

export const ModalListCommandsAction = () => {
  const [showModalListCommand, setShowModalListCommand] = useState(false);

  const showModalListCommandsAction = () => {
    setShowModalListCommand(true);
  };

  const closeModalListCommandsAction = () => {
    setShowModalListCommand(false);
  };

  return {
    showModalListCommandsAction,
    closeModalListCommandsAction,
    showModalListCommand,
  };
};
