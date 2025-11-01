import { Col, Container, Row } from 'react-bootstrap';

import { ButtonOrange } from '@/assets/Style/GlobalStyle';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const NotFoundTitle = styled.h1`
  font-size: 72px;
  margin-bottom: 40px;
`;

const NotFoundSubtitle = styled.h3`
  font-size: 36px;
  margin-bottom: 20px;
`;

const Page404 = () => {
  return (
    <NotFoundWrapper>
      <Container>
        <Row>
          <Col>
            <NotFoundTitle>404</NotFoundTitle>
            <NotFoundSubtitle>Página não encontrada</NotFoundSubtitle>
            <p>Desculpe, a página que você procura não existe.</p>
           <Link to="/">
            <ButtonOrange>Voltar</ButtonOrange>
           </Link>
          </Col>
        </Row>
      </Container>
    </NotFoundWrapper>
  );
};

export default Page404;
