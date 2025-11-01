import 'react-quill/dist/quill.snow.css';

import React, { useState } from 'react';

import ReactQuill from 'react-quill';
import styled from 'styled-components';

const EditorContainer = styled.div`
  .ql-container {
    background-color: #121212;
    color: #e2e8f0;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 0 0 8px 8px;
  }

  .ql-editor {
    color: #e2e8f0;
    min-height: 200px;
    
    &::before {
      color: rgba(255, 255, 255, 0.3);
    }
  }

  .ql-toolbar {
    background-color: #121212;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);

    .ql-stroke {
      stroke: rgba(255, 255, 255, 0.7);
    }

    .ql-fill {
      fill: rgba(255, 255, 255, 0.7);
    }

    .ql-picker-label {
      color: rgba(255, 255, 255, 0.7);
    }

    button:hover,
    .ql-picker-label:hover {
      .ql-stroke {
        stroke: #ff8c00;
      }
      .ql-fill {
        fill: #ff8c00;
      }
    }

    button.ql-active {
      .ql-stroke {
        stroke: #ff8c00;
      }
      .ql-fill {
        fill: #ff8c00;
      }
    }
  }
`;

export const QuillEditor = ({ value, setValue }: any) => {
  const [editorValue, setEditorValue] = useState(value);
  
  React.useEffect(()=>{
    setEditorValue(value)
  },[value])

  const handleEditorChange = (newValue:string) => {
    setEditorValue(newValue);
    setValue(newValue); // Atualize o valor no componente pai
  };

  return (
    <EditorContainer>
      <ReactQuill theme="snow" value={editorValue} onChange={handleEditorChange} />
    </EditorContainer>
  );
};
