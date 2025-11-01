import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

import { FilePond, registerPlugin } from "react-filepond";

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

function FilePondUpload({setImages, defaultFile}:any) {
  const updateFiles = (fileItems:any) => {
    const updatedFiles = fileItems.map((fileItem:any) => fileItem.file);
    setImages(updatedFiles);
  };

  const removeFiles = () => {
    setImages([])
  };

  return (
    <div className="container mt-2">
      <FilePond
        allowMultiple={true}
        maxFiles={1}
        onupdatefiles={updateFiles}
        onremovefile={removeFiles}
        maxFileSize="1mb"
        acceptedFileTypes={['image/png', 'image/jpeg']}
        labelFileTypeNotAllowed="Arquivo de tipo inválido"
        fileValidateTypeLabelExpectedTypes="Espera {allButLastType} ou {lastType}"
        labelMaxFileSize='Tamanho máximo do arquivo permitido: {filesize}'
        labelMaxFileSizeExceeded="Tamanho máximo de imagem atingido"
        files={defaultFile}
        labelIdle="Arraste ou selecione uma imagem"
      />
    </div>
  );
}

export default FilePondUpload;
