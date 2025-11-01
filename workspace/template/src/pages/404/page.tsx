import logo from '@/assets/icon_orange.png';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 5em;
    color: #FF9A36;
    margin: 0;
    font-weight: bold;
`;

const Text = styled.p`
    font-size: 1em;
    color: white;
    margin: 0;
`;

const Link = styled.a`
    color: #FF9A36;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;

const Image = styled.img`
    width: 100px;
`;

const NotFoundStore = () => {
    return (
        <Container>
            <Image src={logo} alt="logo-fm"/>
            <Title>Loja não encontrada</Title>
            <Text>Oops... Parece que você está tentando acessar uma loja que não existe.</Text>
            <Text>Para ver uma demonstração de uma de nossas lojas, acesse <Link href="http://demo.fivemarket.com.br">demo.fivemarket.com.br</Link>.</Text>
        </Container>
    );
}

export default NotFoundStore;
