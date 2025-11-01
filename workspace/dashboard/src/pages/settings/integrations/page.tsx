import { ButtonOrange } from "@/assets/Style/GlobalStyle";
import { useStore } from "@/core/client/providers/store/store.provider";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NumberCircle from "./components/number-cicle.component";
import PrivateKeyComponent from "./components/private-key.component";
import './styles/integrations-style.css';

const Line = styled.div`
    width: 2px;
    background-color: white;
    height: 150px; // altura da linha, você pode ajustar conforme necessário
`;

export const IntegrationsPage = () => {
    const { store } = useStore()
    return (
        <>
            <section className="mt-5">
                <div style={{ backgroundColor: "#ffe3c9", borderRadius: "10px", borderTop: "2px solid #ff9f4a", borderBottom: "2px solid #ff9f4a", }} className="p-5">
                    <Col md={12}>
                        <div>
                            <Row>
                                <Col md={6}>
                                    <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Vincular bot</h1>
                                    <p>Convie o nosso bot para seu servidor para entregar/remover cargose e receber notificações de vendas!</p>

                                    <div>
                                        <ButtonOrange style={{ fontWeight: "bold", height: "35px", fontSize: "14px", width: "120px" }}>
                                            Adicionar bot
                                        </ButtonOrange>
                                    </div>
                                </Col>
                                <Col md={1}>
                                    <Line />
                                </Col>
                                <Col md={5}>
                                    <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Copie seu Token</h1>
                                    <p>Não envie pra ninguém o seu Token. Mantenha em segurança.</p>

                                    <div>
                                        <PrivateKeyComponent value={store?.store_token ?? ""} />
                                    </div>

                                    <Link to="https://github.com/FiveMarket/script-fivem">
                                        <ButtonOrange style={{ fontWeight: "bold", height: "35px", fontSize: "14px"}}>
                                            Download Script
                                        </ButtonOrange>
                                    </Link>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </div>

                <div className="mt-5">
                    <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>Como instalar?</h1>
                    <p>Não se preocupe. O processo é simples e em caso de dúvidas te ajudamos.</p>

                    <div className="mt-2">
                        <div style={{ backgroundColor: "#1F2937", borderRadius: "10px" }} className="p-4">
                            <div className="d-flex gap-2">
                                <div className="mt-1">
                                    <NumberCircle number="1" />
                                </div>
                                <div>
                                    <h3 className="p-0 m-0" style={{ fontSize: "18px", fontWeight: "bold", color: "white" }}>Convide o BOT</h3>
                                    <p className="p-0 m-0" style={{ color: "white" }}>Clique no botão "adicionar bot" acima para convidar ao seu Discord.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div style={{ backgroundColor: "#1F2937", borderRadius: "10px" }} className="p-4">
                            <div className="d-flex gap-2">
                                <div className="mt-1">
                                    <NumberCircle number="2" />
                                </div>
                                <div>
                                    <h3 className="p-0 m-0" style={{ fontSize: "18px", fontWeight: "bold", color: "white" }}>Token do BOT</h3>
                                    <p className="p-0 m-0" style={{ color: "white" }}>Use o token de identificação ao utilizar o comando !chave sua-chave-aqui no canal que vincular a loja.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div style={{ backgroundColor: "#1F2937", borderRadius: "10px" }} className="p-4">
                            <div className="d-flex gap-2">
                                <div className="mt-1">
                                    <NumberCircle number="3" />
                                </div>
                                <div>
                                    <h3 className="p-0 m-0" style={{ fontSize: "18px", fontWeight: "bold", color: "white" }}>Configurar o BOT:</h3>
                                    <p className="p-0 m-0" style={{ color: "white" }}>
                                        <kbd>!notify</kbd> - Vincula o canal para receber notificações
                                        <br />
                                        <kbd>!publicnotify</kbd>- Vincula um canal público para receber notificações
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
