import { ButtonOrange } from '@/assets/Style/GlobalStyle';
import { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { toast } from 'sonner';
import styled from 'styled-components';

const ReadOnlyInput = styled(FormControl)`
  pointer-events: none;
  filter: ${({ isVisible }) => (isVisible ? 'none' : 'blur(4px)')}; /* Condiciona o blur */
`;

const PrivateKeyComponent = ({ value }:{value:string}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    toast.success("Chave copiada com sucesso.");
  };

  return (
    <InputGroup className="mb-3">
      <ReadOnlyInput
        type="text"
        value={value}
        readOnly
        isVisible={isVisible}  /* Passa a propriedade isVisible para o styled-component */
      />
      <ButtonOrange variant="outline-secondary" onClick={toggleVisibility}>
        {isVisible ? 'Esconder' : 'Mostrar'}
      </ButtonOrange>
      <ButtonOrange onClick={copyToClipboard}>
        Copiar
      </ButtonOrange>
    </InputGroup>
  );
};

export default PrivateKeyComponent;
