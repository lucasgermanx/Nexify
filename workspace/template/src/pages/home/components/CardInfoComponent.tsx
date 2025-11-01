import { Card as BootstrapCard } from 'react-bootstrap';
import { MdIron } from 'react-icons/md';
import styled from 'styled-components';

// Definindo estilos para o círculo
const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
`;

// Definindo estilos para o card em geral
const StyledCard = styled(BootstrapCard)`
  background-color: #F1F5F9;
  padding: 20px;
  border:0px;
`;

const CardInfoComponent = () => {
  return (
    <StyledCard>
      <Circle>
        <MdIron size={30} color="orange"/> {/* Substitua o 'MdIcon' pelo ícone que você deseja usar */}
      </Circle>
      <h4 className='mt-4'>Envio imediato</h4>
      <p>Receba pelo pacote que comprou em poucos segundos após a confirmação do pagamento.</p>
    </StyledCard>
  );
};

export default CardInfoComponent;
