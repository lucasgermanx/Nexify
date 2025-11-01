import { useEffect, useState } from "react";

import useContent from "../hook";

export const TemplateFileHandler = () => {
  const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
  const [type, setType] = useState('')
  const {ProviderUpdateFiles} = useContent()

  useEffect(() => {
    if (selectedFiles != null) {
      onSubmit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiles]);

  const onSubmit = () => {
    if (selectedFiles === null) return
    ProviderUpdateFiles(type,selectedFiles)
  };

  return { selectedFiles, setSelectedFiles, setType};
};
