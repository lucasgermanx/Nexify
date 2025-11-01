import React, { useState } from "react";
import { ErrorInfo } from "@/core/server/@types/general.type";

export const ErrorFormHandler = () => {
  const [errorHandler, setErrorHandler] = useState<ErrorInfo[]>([]);

  const addError = (newError: ErrorInfo) => {
    // Verifica se o erro já existe no errorHandler
    const index = errorHandler.findIndex(error => error.type === newError.type);

    if (index !== -1) {
      // Se o erro já existe, substitui o erro existente
      setErrorHandler(prevErrors => [
        ...prevErrors.slice(0, index),
        newError,
        ...prevErrors.slice(index + 1)
      ]);
    } else {
      // Se não existir, adiciona o novo erro
      setErrorHandler(prevErrors => [...prevErrors, newError]);
    }
  };

  const getErrorByType = (errorType: string): ErrorInfo | undefined => {
    return errorHandler.find(error => error.type === errorType);
  };

  React.useEffect(() => {
  }, []);

  return { addError, errorHandler, getErrorByType };
};
