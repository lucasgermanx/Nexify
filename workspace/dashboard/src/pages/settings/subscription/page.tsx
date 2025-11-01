import { ButtonGreen, ButtonOrange } from "@/assets/Style/GlobalStyle";
import { useStore } from "@/core/client/providers/store/store.provider";
import { Card, Col, Row } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import styled from "styled-components";
import { SubscriptionActions } from "./actions/subscription.actions";

const StyledCard = styled(Card)`
    border-radius: 10px;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
      background-color: #f8f9fa; /* Um tom levemente mais escuro que branco */
      transform: translateY(-5px);
   }
`;

const planos = [
    {
        nome: "Starter",
        preco: "R$20,00",
        descricao: "O plano perfeito para você que está começando",
        itens: [
            "Até 5 categorias",
            "Até 30 produtos",
            "Cupons ilimitados",
            "Notícias ilimitadas",
            "Tema Padrão",
            "1 sub-usuário",
            "Sem BOT Discord",
            "Sem conseguir colocar domínio personalizado",
        ],
    },
    {
        nome: "Common",
        preco: "R$39,90",
        descricao: "Ideal para quem já possui uma loja em crescimento",
        itens: [
            "Categorias ilimitadas",
            "Produtos ilimitados",
            "Cupons ilimitados",
            "Notícias ilimitadas",
            "BOT Discord",
            "Tema Padrão",
            "2 sub-usuários",
            "Sem conseguir colocar domínio personalizado",
        ],
    },
    {
        nome: "Enterprise",
        preco: "R$69,90",
        descricao: "Para empresas que buscam personalização e flexibilidade",
        itens: [
            "Categorias ilimitadas",
            "Produtos ilimitados",
            "Cupons ilimitados",
            "Notícias ilimitadas",
            "BOT Discord",
            "Domínio personalizado",
            "Temas exclusivos",
            "Editor de Template",
            "Gerenciamento de sub-usuários ilimitado",
        ],
    },
];


export const SubscriptionPage = () => {
    const { store } = useStore();
    const myPlan = store?.store_plan

    const { handlerPlan, url_invoice } = SubscriptionActions()

    return (
        <div className="pt-5">

            <h4 className="p-0 m-0">Realize o pagamento da sua fatura</h4>

            <StyledCard className="p-4 mb-5 mt-3">
                <h4 className="text-uppercase" style={{ fontSize: "16px", color: "orange" }}>
                    Gerenciar fatura
                </h4>
                <p>
                    Ao vencimento da fatura, o sistema encaminha automaticamente para o seu e-mail o link de pagamento. Caso não receba, você pode realizar o pagamento por aqui mesmo.
                </p>

                {url_invoice ?
                    <a href={url_invoice} target="_blank"><ButtonGreen className="w-100 p-2">Realizar o pagamento da minha fatura</ButtonGreen></a>
                    :
                    <ButtonOrange className="w-100 p-2">Sua fatura ainda não foi gerada.</ButtonOrange>
                }
            </StyledCard>

            <h4 className="p-0 m-0">Gerenciar assinatura</h4>
            <small>Gerencia sua assinatura, realize downgrades ou upgrades</small>

            <section className="pt-5">
                <Row>
                    {planos.map((plano) => (
                        <Col xs={12} sm={6} md={4} lg={4} className="mb-4" key={plano.nome}>
                            <StyledCard className="p-4" style={{ height: "40rem" }}>
                                <h4 className="text-uppercase" style={{ fontSize: "16px", color: "orange" }}>
                                    {plano.nome}
                                </h4>
                                <h5 className="text-uppercase" style={{ fontSize: "30px", fontWeight: "bold" }}>
                                    {plano.preco}
                                </h5>
                                <p>{plano.descricao}</p>

                                <ul style={{ listStyleType: "none", padding: 0 }}>
                                    {plano.itens.map((item, index) => (
                                        <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                                            <div style={{ marginRight: "0.5rem", color: "green" }}>
                                                <FaCheckCircle />
                                            </div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="d-flex" style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '10px' }}>
                                    {plano.nome == myPlan ?
                                        <ButtonGreen className="w-100 p-2">Plano selecionado</ButtonGreen>
                                        : <ButtonOrange className="w-100 p-2" onClick={() => { handlerPlan(plano.nome) }}>Alterar meu plano</ButtonOrange>
                                    }
                                </div>
                            </StyledCard>
                        </Col>
                    ))}
                </Row>
            </section>
        </div>
    )
}