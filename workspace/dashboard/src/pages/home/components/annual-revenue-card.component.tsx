import { Card } from "react-bootstrap";
import useTransactions from "../../transactions/hook";
import styled from "styled-components";

const RevenueCard = styled(Card)`
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
  
  .card-body {
    padding: 16px;
  }
  
  .revenue-value {
    font-size: 20px;
    font-weight: 700;
    color: white;
    margin-bottom: 12px;
  }
  
  .months-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 4px;
    margin-top: 12px;
  }
  
  .month-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    
    .bar {
      width: 100%;
      background: linear-gradient(135deg, #ff8c00 0%, #ffa500 100%);
      border-radius: 4px 4px 0 0;
      min-height: 4px;
      transition: all 0.3s ease;
    }
    
    .month-label {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.4);
      text-transform: lowercase;
    }
  }
`;

const AnnualRevenueCard = () => {
  const { transactions } = useTransactions();

  const currentYear = new Date().getFullYear();
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  
  // Calcular receita por mês do ano atual
  const monthlyRevenue = months.map((_, index) => {
    const monthSales = transactions?.filter((t: any) => {
      const transactionDate = new Date(t.createdAt);
      return transactionDate.getMonth() === index && 
             transactionDate.getFullYear() === currentYear &&
             t.status_payment === "approved";
    }) || [];
    
    return monthSales.reduce((acc: number, t: any) => 
      acc + parseFloat(t.price_paid || 0), 0
    );
  });

  const totalRevenue = monthlyRevenue.reduce((acc, val) => acc + val, 0);
  const maxRevenue = Math.max(...monthlyRevenue, 1);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <RevenueCard>
      <div className="card-header">
        <h5>Receita deste ano</h5>
      </div>
      <Card.Body>
        <div className="revenue-value">{formatCurrency(totalRevenue)}</div>
        <div className="months-grid">
          {months.map((month, index) => {
            const height = maxRevenue > 0 ? (monthlyRevenue[index] / maxRevenue) * 100 : 0;
            return (
              <div key={month} className="month-bar">
                <div 
                  className="bar" 
                  style={{ 
                    height: `${Math.max(height, 4)}px`,
                    opacity: monthlyRevenue[index] > 0 ? 1 : 0.3
                  }}
                />
                <span className="month-label">{month}</span>
              </div>
            );
          })}
        </div>
      </Card.Body>
    </RevenueCard>
  );
};

export default AnnualRevenueCard;

