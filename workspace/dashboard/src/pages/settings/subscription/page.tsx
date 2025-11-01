import { ButtonGreen, ButtonOrange } from "@/assets/Style/GlobalStyle";
import { useStore } from "@/core/client/providers/store/store.provider";
import { Card, Col, Row } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { BsCalendar3, BsCreditCard, BsShop, BsClockHistory, BsCurrencyDollar, BsLightningCharge, BsFileText } from "react-icons/bs";
import { MdPayment, MdRocketLaunch } from "react-icons/md";
import { useContext } from "react";
import { SubscriptionContext } from "@/global/providers/subscription.provider";
import styled from "styled-components";
import { SubscriptionActions } from "./actions/subscription.actions";

const InfoItem = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
    <div style={{
        padding: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            {icon && <span style={{ fontSize: '18px', color: '#ff8c00' }}>{icon}</span>}
            <label style={{ 
                fontSize: '0.75rem', 
                color: 'rgba(255, 255, 255, 0.5)', 
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                margin: 0
            }}>
                {label}
            </label>
        </div>
        <div style={{ 
            fontSize: '1rem', 
            color: 'white', 
            fontWeight: '600',
            marginTop: '4px'
        }}>
            {value}
        </div>
    </div>
);

const StyledCard = styled(Card)<{ isSelected?: boolean }>`
    background-color: #121212;
    border: ${props => props.isSelected 
      ? '2px solid rgba(255, 140, 0, 0.5)' 
      : '1px solid rgba(255, 255, 255, 0.05)'};
    border-radius: 16px;
    box-shadow: ${props => props.isSelected
      ? '0 8px 24px rgba(255, 140, 0, 0.3), 0 4px 6px rgba(0, 0, 0, 0.5)'
      : '0 4px 6px rgba(0, 0, 0, 0.5)'};
    transition: all 0.3s ease;
    position: relative;
    color: rgba(255, 255, 255, 0.8);
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: ${props => props.isSelected ? '4px' : '3px'};
      background: ${props => props.isSelected
        ? 'linear-gradient(135deg, #ff8c00 0%, #ffa500 100%)'
        : 'linear-gradient(135deg, rgba(255, 140, 0, 0.3) 0%, rgba(255, 165, 0, 0.3) 100%)'};
      z-index: 1;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.02);
      transform: translateY(-6px);
      box-shadow: ${props => props.isSelected
        ? '0 12px 32px rgba(255, 140, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.7)'
        : '0 12px 24px rgba(0, 0, 0, 0.7), 0 8px 16px rgba(0, 0, 0, 0.5)'};
      border-color: ${props => props.isSelected
        ? 'rgba(255, 140, 0, 0.7)'
        : 'rgba(255, 255, 255, 0.1)'};
   }
`;

const PlanBadge = styled.div<{ isSelected?: boolean }>`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${props => props.isSelected
    ? 'linear-gradient(135deg, #ff8c00 0%, #ffa500 100%)'
    : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.isSelected ? 'white' : 'rgba(255, 255, 255, 0.6)'};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 2;
  
  svg {
    font-size: 14px;
  }
`;

const PlanPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
`;

const PriceAmount = styled.h2`
  font-size: 42px;
  font-weight: 700;
  background: linear-gradient(135deg, #ff8c00 0%, #ffa500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1;
`;

const PricePeriod = styled.span`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.04);
  }
  
  svg {
    margin-top: 2px;
    flex-shrink: 0;
  }
`;

const FeatureText = styled.span`
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-left: 12px;
`;

const PlanDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 24px;
  min-height: 48px;
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
    const myPlan = store?.store_plan;
    const subscriptionContext = useContext(SubscriptionContext);
    const subscription = subscriptionContext?.subscription;
    const lastInvoice = subscription?.invoices?.[0];

    const { handlerPlan, url_invoice } = SubscriptionActions();

    // Calcular próxima data de vencimento (30 dias após a última fatura ou data atual + 30 dias)
    const calculateNextDueDate = () => {
        if (lastInvoice?.creditDate) {
            const creditDate = new Date(lastInvoice.creditDate);
            creditDate.setMonth(creditDate.getMonth() + 1);
            return creditDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
        }
        if (store?.due_date) {
            return new Date(store.due_date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
        }
        return 'Não disponível';
    };

    return (
        <div className="pt-5">

            <h4 className="p-0 m-0" style={{ color: 'white', fontWeight: '600', marginBottom: '24px' }}>Minha assinatura</h4>

            {/* Card de informações da assinatura atual */}
            {store && (
                <Row className="mb-5">
                    <Col md={8}>
                        <StyledCard className="p-4 mb-3">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                                <div>
                                    <h4 className="text-uppercase" style={{ fontSize: "14px", color: "#ff8c00", fontWeight: '700', marginBottom: '8px', letterSpacing: '1px' }}>
                                        Plano atual
                                    </h4>
                                    <h3 style={{ fontSize: "28px", color: 'white', fontWeight: '700', margin: 0 }}>
                                        {store.store_plan || 'Nenhum plano'}
                                    </h3>
                                </div>
                                <div style={{ 
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    background: store.store_status === 'active' || store.store_status === 'activated'
                                        ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                                        : store.store_status === 'expired'
                                        ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
                                        : 'rgba(255, 255, 255, 0.1)',
                                    color: 'white',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    textTransform: 'uppercase'
                                }}>
                                    {store.store_status === 'active' || store.store_status === 'activated' ? 'Ativo' :
                                     store.store_status === 'expired' ? 'Expirado' :
                                     store.store_status === 'pending' ? 'Pendente' : 'Inativo'}
                                </div>
                            </div>

                            <Row className="g-3">
                                <Col md={6}>
                                    <InfoItem
                                        label="Próximo vencimento"
                                        value={calculateNextDueDate()}
                                        icon={<BsCalendar3 />}
                                    />
                                </Col>
                                <Col md={6}>
                                    <InfoItem
                                        label="Último pagamento"
                                        value={lastInvoice?.paymentDate 
                                            ? new Date(lastInvoice.paymentDate).toLocaleDateString('pt-BR', { 
                                                day: 'numeric', 
                                                month: 'long', 
                                                year: 'numeric' 
                                            })
                                            : store.createdAt 
                                            ? new Date(store.createdAt).toLocaleDateString('pt-BR', { 
                                                day: 'numeric', 
                                                month: 'long', 
                                                year: 'numeric' 
                                            })
                                            : 'Não informado'}
                                        icon={<MdPayment />}
                                    />
                                </Col>
                                <Col md={6}>
                                    <InfoItem
                                        label="Data de início"
                                        value={store.createdAt 
                                            ? new Date(store.createdAt).toLocaleDateString('pt-BR', { 
                                                day: 'numeric', 
                                                month: 'long', 
                                                year: 'numeric' 
                                            })
                                            : 'Não informado'}
                                        icon={<MdRocketLaunch />}
                                    />
                                </Col>
                                <Col md={6}>
                                    <InfoItem
                                        label="Valor da assinatura"
                                        value={subscription?.value 
                                            ? `R$ ${subscription.value.toFixed(2).replace('.', ',')}/mês`
                                            : 'Não informado'}
                                        icon={<BsCurrencyDollar />}
                                    />
                                </Col>
                                <Col md={6}>
                                    <InfoItem
                                        label="Status da assinatura"
                                        value={subscription?.status === 'ACTIVE' 
                                            ? 'Ativa' 
                                            : subscription?.status === 'EXPIRED'
                                            ? 'Expirada'
                                            : subscription?.status === 'INACTIVE'
                                            ? 'Inativa'
                                            : store.store_status === 'active' || store.store_status === 'activated'
                                            ? 'Ativa'
                                            : 'Indefinido'}
                                        icon={<BsLightningCharge />}
                                    />
                                </Col>
                                <Col md={6}>
                                    <InfoItem
                                        label="Última fatura"
                                        value={lastInvoice?.invoiceNumber || 'Nenhuma fatura gerada'}
                                        icon={<BsFileText />}
                                    />
                                </Col>
                            </Row>
                        </StyledCard>
                    </Col>
                    <Col md={4}>
                        <StyledCard className="p-4" style={{ height: '100%' }}>
                            <h4 className="text-uppercase" style={{ fontSize: "14px", color: "#ff8c00", fontWeight: '700', marginBottom: '16px', letterSpacing: '1px' }}>
                                Gerenciar fatura
                            </h4>
                            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '20px', lineHeight: '1.6', fontSize: '0.875rem' }}>
                                Ao vencimento da fatura, o sistema encaminha automaticamente para o seu e-mail o link de pagamento. Caso não receba, você pode realizar o pagamento por aqui mesmo.
                            </p>

                            {url_invoice ? (
                                <a href={url_invoice} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
                                    <ButtonGreen className="w-100 p-3" style={{ fontWeight: '600' }}>
                                        Realizar pagamento
                                    </ButtonGreen>
                                </a>
                            ) : (
                                <ButtonOrange className="w-100 p-3" disabled style={{ fontWeight: '600', opacity: 0.6 }}>
                                    Fatura não gerada
                                </ButtonOrange>
                            )}
                        </StyledCard>
                    </Col>
                </Row>
            )}

            <h4 className="p-0 m-0" style={{ color: 'white', fontWeight: '600', marginBottom: '8px' }}>Gerenciar assinatura</h4>
            <small style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Gerencia sua assinatura, realize downgrades ou upgrades</small>

            <section className="pt-5" style={{ marginTop: '32px' }}>
                <Row className="g-4">
                    {planos.map((plano, index) => {
                        const isSelected = plano.nome === myPlan;
                        const priceValue = plano.preco.replace('R$', '').trim();
                        
                        return (
                            <Col xs={12} sm={6} md={4} lg={4} className="mb-4" key={plano.nome}>
                                <StyledCard className="p-5" style={{ height: "auto", minHeight: "520px", display: 'flex', flexDirection: 'column' }} isSelected={isSelected}>
                                    {isSelected && (
                                        <PlanBadge isSelected={isSelected}>
                                            <HiSparkles />
                                            Ativo
                                        </PlanBadge>
                                    )}
                                    
                                    <div style={{ flex: 1, paddingTop: isSelected ? '32px' : '0' }}>
                                        <div style={{ marginBottom: '24px' }}>
                                            <h4 className="text-uppercase" style={{ 
                                                fontSize: "14px", 
                                                color: "#ff8c00", 
                                                fontWeight: '700', 
                                                marginBottom: '16px',
                                                letterSpacing: '1.5px'
                                            }}>
                                                {plano.nome}
                                            </h4>
                                            
                                            <PlanPrice>
                                                <PriceAmount>{priceValue}</PriceAmount>
                                                <PricePeriod>/mês</PricePeriod>
                                            </PlanPrice>
                                        </div>
                                        
                                        <PlanDescription>{plano.descricao}</PlanDescription>

                                        <FeatureList>
                                            {plano.itens.map((item, idx) => (
                                                <FeatureItem key={idx}>
                                                    <FaCheckCircle style={{ 
                                                        color: "#22c55e", 
                                                        fontSize: '16px',
                                                        marginRight: '8px'
                                                    }} />
                                                    <FeatureText>{item}</FeatureText>
                                                </FeatureItem>
                                            ))}
                                        </FeatureList>
                                    </div>

                                    <div className="d-flex" style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                        {isSelected ? (
                                            <ButtonGreen className="w-100 p-3" style={{ 
                                                fontWeight: '600',
                                                fontSize: '1rem',
                                                borderRadius: '8px'
                                            }}>
                                                ✓ Plano Ativo
                                            </ButtonGreen>
                                        ) : (
                                            <ButtonOrange className="w-100 p-3" style={{ 
                                                fontWeight: '600',
                                                fontSize: '1rem',
                                                borderRadius: '8px'
                                            }} onClick={() => { handlerPlan(plano.nome) }}>
                                                Escolher este plano
                                            </ButtonOrange>
                                        )}
                                    </div>
                                </StyledCard>
                            </Col>
                        );
                    })}
                </Row>
            </section>
        </div>
    )
}