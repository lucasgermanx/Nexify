import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingPageComponent = () => {
  return (
    <LoadingContainer>
      <Spinner animation="border" />
    </LoadingContainer>
  );
};

export default LoadingPageComponent;
