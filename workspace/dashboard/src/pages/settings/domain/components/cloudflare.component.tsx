import styled from 'styled-components';

const Container = styled.div`
  margin-top: 50px;
`;

const Step = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
`;

const StepTitle = styled.h3`
  color: orange;
  font-size: 18px;
  margin-bottom: 10px;
`;

const StepDescription = styled.p`
  font-size: 14px;
`;

function CloudflareConnectionSteps() {
    return (
        <Container>
            <Step>
                <StepTitle>Passo 1: Registrar-se no Cloudflare</StepTitle>
                <StepDescription>Faça o registro em https://www.cloudflare.com/ e siga as instruções para configurar sua conta.</StepDescription>
            </Step>

            <Step>
                <StepTitle>Passo 2: Adicionar seu domínio ao Cloudflare</StepTitle>
                <StepDescription>Após fazer login, clique em "Add a Site" para adicionar o seu domínio. Digite o seu domínio e clique em "Add Site."</StepDescription>
            </Step>

            <Step>
                <StepTitle>Passo 3: Escolher um Plano</StepTitle>
                <StepDescription>Escolha o plano que atenda às suas necessidades. O plano gratuito é adequado para a maioria das configurações. Clique em "Continue."</StepDescription>
            </Step>

            <Step>
                <StepTitle>Passo 4: Verificar Configurações DNS</StepTitle>
                <StepDescription>O Cloudflare fará uma varredura nas configurações DNS existentes do seu domínio. Certifique-se de que todos os registros DNS importantes (A, MX, CNAME, etc.) estão corretamente listados.</StepDescription>
            </Step>

            <Step>
                <StepTitle>Passo 5: Selecionar os Registros DNS a Serem Protegidos</StepTitle>
                <StepDescription>Escolha quais registros DNS você deseja proteger com o serviço de proxy do Cloudflare. Normalmente, você deseja proteger registros A e CNAME. Clique em "Continue."</StepDescription>
            </Step>

            <Step>
                <StepTitle>Passo 6: Alterar os Nameservers do Seu Domínio</StepTitle>
                <StepDescription>O Cloudflare fornecerá dois nameservers. Você deve alterar os nameservers do seu domínio para os fornecidos pelo Cloudflare. Isso geralmente é feito no painel de controle do registrador de domínios onde você comprou o domínio.</StepDescription>
            </Step>

            <Step>
                <StepTitle>Passo 7: Aguardar a Propagação DNS</StepTitle>
                <StepDescription>Depois de alterar os nameservers, pode levar algum tempo (geralmente algumas horas) para que as alterações de DNS se propaguem globalmente. Durante esse período, o Cloudflare começará a proteger seu domínio.</StepDescription>
            </Step>

            <Step>
                <StepTitle>Passo 8: Adicionar um Registro CNAME</StepTitle>
                <StepDescription>Agora que o domínio está configurado no Cloudflare, você pode adicionar o registro CNAME da nossa plataforma <strong>cname.fivemarket.com.br</strong> após alguns instantes o dominio está pronto para uso da sua loja.</StepDescription>
            </Step>
        </Container>
    );
}

export default CloudflareConnectionSteps;
