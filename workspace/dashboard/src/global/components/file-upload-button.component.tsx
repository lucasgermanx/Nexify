import { Button } from "react-bootstrap";
import { toast } from "sonner";

const FileUpload = ({ setSelectedFile, fileInput, setType }: any) => {
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.size > 1024 * 1024) {
      // Se o tamanho do arquivo for maior que 1MB, notificar o usuário
      toast.warning("O tamanho máximo permitido é de 1mb")
      // Resetar o input de arquivo
      event.target.value = null;
    } else {
      setType(fileInput);
      setSelectedFile(file);
    }
  };

  const handleClick = () => {
    const element = document.getElementById(fileInput);
    if (element) {
      element.click();
    }
  };

  return (
    <div>
      <Button
        style={{ backgroundColor: "#303030", fontWeight: "600", border: "0px" }}
        onClick={handleClick}
      >
        Escolher imagem
      </Button>

      <input
        type="file"
        id={fileInput}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
        // Adicionar o atributo de tamanho máximo
        // (1MB = 1024 * 1024 bytes)
        maxLength={1024 * 1024}
      />
    </div>
  );
};

export default FileUpload;
