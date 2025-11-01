import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SubscriptionContext } from "@/global/providers/subscription.provider";
import styled from "styled-components";
import { HiOutlineTrendingUp } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";

const PaymentsCard = styled(Card)`
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  margin-top: 0;
  
  .card-header {
    padding: 12px 16px;
    background-color: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    
    h5 {
      color: white;
      font-weight: 600;
      margin: 0;
      font-size: 0.875rem;
    }
  }
  
  .empty-state {
    padding: 24px 16px;
    text-align: center;
    
    .empty-icon {
      font-size: 32px;
      color: rgba(255, 255, 255, 0.2);
      margin-bottom: 8px;
    }
    
    .empty-text {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.75rem;
    }
  }
  
  .view-all-link {
    display: block;
    text-align: center;
    color: #ff8c00;
    text-decoration: none;
    padding: 12px 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 0.75rem;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ffa500;
    }
    
    svg {
      margin-left: 8px;
      vertical-align: middle;
    }
  }
`;

const RecentPaymentsCard = () => {
  const subscriptionContext = useContext(SubscriptionContext);
  const url_invoice = subscriptionContext?.url_invoice;

  return (
    <PaymentsCard>
      <div className="card-header">
        <h5>Últimos pagamentos</h5>
      </div>
      <Card.Body style={{ padding: 0 }}>
        {url_invoice ? (
          <div style={{ padding: '16px 24px' }}>
            <div style={{
              padding: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <p style={{ color: 'white', margin: 0, fontSize: '0.875rem', fontWeight: '500' }}>
                Fatura disponível
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '4px 0 0 0', fontSize: '0.75rem' }}>
                Última fatura gerada
              </p>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <HiOutlineTrendingUp className="empty-icon" />
            <p className="empty-text">
              Nenhum pagamento encontrado. Os dados aparecerão aqui quando você fizer pagamentos!
            </p>
          </div>
        )}
        <Link to="/configuracoes/assinatura" className="view-all-link">
          Ver todos os pagamentos <FiArrowRight />
        </Link>
      </Card.Body>
    </PaymentsCard>
  );
};

export default RecentPaymentsCard;

