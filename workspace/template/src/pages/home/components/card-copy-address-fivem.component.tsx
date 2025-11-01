import { Card } from "react-bootstrap";
import InputAddresFiveM from "./input-address-fivem.component";
import styled from "styled-components";
import useStore from "@/core/client/hooks/store.hook";

// Definindo estilos para o card em geral
const StyledCard = styled(Card)`
  background-color: #0C0D11;
  padding: 20px;
  border: 0px;
  color:white;
`;

export const CardCopyIPComponent = () => {
  const {store} = useStore()
  return (
    <>
      <StyledCard>
        <h6 className="text-center">Visite agora mesmo <br /> nossa cidade!</h6>
        <InputAddresFiveM value={store?.contents?.[0].widget_fiveM}/>
      </StyledCard>
    </>
  );
};
