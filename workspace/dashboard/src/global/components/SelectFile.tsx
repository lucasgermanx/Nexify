import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import styled from "styled-components";

const FileInputContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 200px;
  border: 1px solid #f2f2f2 !important;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.3s ease-in-out;

  &:hover {
    background-color:#F7F7F7;
  }
`;

const UploadIcon = styled(MdCloudUpload)`
  font-size: 48px;
`;

const UploadText = styled.p`
  margin-top: 16px;
  font-size: 12px;
  color: #555;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const CustomFileInput = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [previewURL, setPreviewURL] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
    // You can perform additional actions with the selected file here
  };

  const handleDragEnter = (event:any) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event:any) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event:any) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
    // You can perform additional actions with the dropped file here
  };

  return (
    <>
      <FileInputContainer
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          borderColor: isDragging ? "#555" : "#aaa",
        }}
      >
        {previewURL ? (
          <PreviewImage src={previewURL} alt="Preview" />
        ) : (
          <>
            <UploadIcon />
            <UploadText>
              {selectedFile ? selectedFile.name : "Selecione ou arraste um arquivo"}
            </UploadText>
          </>
        )}
        <HiddenFileInput
          type="file"
          onChange={handleFileChange}
          accept=".jpg, .png"
        />
      </FileInputContainer>
    </>
  );
};

export default CustomFileInput;
