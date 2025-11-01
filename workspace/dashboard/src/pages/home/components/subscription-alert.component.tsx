import { useStore } from "@/core/client/providers/store/store.provider";
import { Link } from "react-router-dom";
import { RiErrorWarningFill } from "react-icons/ri";
import styled from "styled-components";

const AlertContainer = styled.div`
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
  
  .alert-icon {
    font-size: 18px;
    color: white;
    flex-shrink: 0;
  }
  
  .alert-content {
    flex: 1;
    color: white;
    font-size: 0.8rem;
    line-height: 1.4;
    
    a {
      color: white;
      text-decoration: underline;
      font-weight: 600;
      
      &:hover {
        opacity: 0.9;
      }
    }
  }
`;

const SubscriptionAlert = () => {
  const { store } = useStore();

  if (!store || store.store_status !== "expired") {
    return null;
  }

  // Calcular data de vencimento (10 dias a partir de hoje se não tiver due_date)
  const dueDate = store.due_date 
    ? new Date(store.due_date).toLocaleDateString('pt-BR')
    : (() => {
        const date = new Date();
        date.setDate(date.getDate() + 10);
        return date.toLocaleDateString('pt-BR');
      })();

  return (
    <AlertContainer>
      <RiErrorWarningFill className="alert-icon" />
      <div className="alert-content">
        Sua assinatura expirou! Para manter sua loja online e continuar vendendo, 
        faça a renovação do seu plano até o dia <strong>{dueDate}</strong>.
        <Link to="/configuracoes/assinatura"> Renovar agora</Link>
      </div>
    </AlertContainer>
  );
};

export default SubscriptionAlert;

