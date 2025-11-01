import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #C7D2FE;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  color:#6F8BF5;
`;

const NumberCircle = ({ number }:{number:string}) => {
  return (
    <Container className="d-flex justify-content-center">
      <Circle>{number}</Circle>
    </Container>
  );
};

export default NumberCircle;
