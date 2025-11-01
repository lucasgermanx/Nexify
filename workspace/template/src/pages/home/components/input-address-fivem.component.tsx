import { toast } from "sonner";
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 8px;
  width:70%;
  border-radius:30px;
  background-color:#303030;
  color:white;
  border:0px;
`;

const StyledButton = styled.button`
  margin-left: 8px;
  padding: 8px 16px;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size:13px;
`;

const InputAddresFiveM = ({value}:any) => {
  return (
    <InputContainer className='mt-3'>
    <StyledInput type="text" value={value} />
    <StyledButton onClick={() => {
      navigator.clipboard.writeText(value);
      toast.success("O endereço IP do servidor foi copiado com sucesso!");
    }}>
     Copiar
    </StyledButton>
  </InputContainer>
  
  );
};

export default InputAddresFiveM;
