import 'react-quill/dist/quill.snow.css';

import React, { useState } from 'react';

import ReactQuill from 'react-quill';

export const QuillEditor = ({ value, setValue }: any) => {
  const [editorValue, setEditorValue] = useState(value);
  
  React.useEffect(()=>{
    setEditorValue(value)
  },[value])

  const handleEditorChange = (newValue:string) => {
    setEditorValue(newValue);
    setValue(newValue); // Atualize o valor no componente pai
  };

  return <ReactQuill theme="snow" value={editorValue} onChange={handleEditorChange} />;
};
