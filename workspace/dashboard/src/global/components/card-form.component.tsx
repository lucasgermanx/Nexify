import { Card } from "react-bootstrap";
import styled from "styled-components";

const CardCategory = styled(Card)`
  border: 1px solid #f2f2f2;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.01);
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
