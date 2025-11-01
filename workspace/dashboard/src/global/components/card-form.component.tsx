import { Card } from "react-bootstrap";
import styled from "styled-components";

const CardCategory = styled(Card)`
  border: 1px solid rgba(255, 255, 255, 0.05);
  background-color: #121212;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 12px;

  .card-body {
    background-color: transparent;
    color: #e2e8f0;
  }
`;


const CardForm = ({children}:any) => {
  return (
    <>
      <CardCategory>
        <Card.Body>
          {children}
        </Card.Body>
      </CardCategory>
    </>
  );
};

export default CardForm;
