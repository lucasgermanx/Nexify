import HomeCardStatistic from "./home-card-statics.component";
import { BsGraphUpArrow, BsBarChartFill, BsEye } from "react-icons/bs";
import { FaChartBar } from "react-icons/fa";
import { HiOutlineTrendingUp } from "react-icons/hi";
import useTransactions from "../../transactions/hook";
import styled from "styled-components";

const CompactStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0;
  margin-bottom: 0;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AdditionalStatsCards = () => {
  const { transactionData, transactions } = useTransactions();

  // Calcular vendas de hoje
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaySales = transactions?.filter((t: any) => {
    const transactionDate = new Date(t.createdAt);
    transactionDate.setHours(0, 0, 0, 0);
    return transactionDate.getTime() === today.getTime() && t.status_payment === "approved";
  }) || [];
  const todaySalesValue = todaySales.reduce((acc: number, t: any) => 
    acc + parseFloat(t.price_paid || 0), 0
  );

  // Calcular total de vendas
  const totalSales = transactions?.filter((t: any) => t.status_payment === "approved") || [];
  const totalSalesValue = totalSales.reduce((acc: number, t: any) => 
    acc + parseFloat(t.price_paid || 0), 0
  );

  // Calcular vendas do mês atual
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthSales = transactions?.filter((t: any) => {
    const transactionDate = new Date(t.createdAt);
    return transactionDate.getMonth() === currentMonth && 
           transactionDate.getFullYear() === currentYear &&
           t.status_payment === "approved";
  }) || [];
  const monthSalesValue = monthSales.reduce((acc: number, t: any) => 
    acc + parseFloat(t.price_paid || 0), 0
  );

  // Calcular vendas do mês anterior para comparação
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const lastMonthSales = transactions?.filter((t: any) => {
    const transactionDate = new Date(t.createdAt);
    return transactionDate.getMonth() === lastMonth && 
           transactionDate.getFullYear() === lastMonthYear &&
           t.status_payment === "approved";
  }) || [];
  const lastMonthSalesValue = lastMonthSales.reduce((acc: number, t: any) => 
    acc + parseFloat(t.price_paid || 0), 0
  );

  // Calcular porcentagem de crescimento
  const growthPercentage = lastMonthSalesValue > 0 
    ? (((monthSalesValue - lastMonthSalesValue) / lastMonthSalesValue) * 100).toFixed(0)
    : monthSalesValue > 0 ? "100" : "0";

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <CompactStatsGrid>
      <HomeCardStatistic
        info={formatCurrency(todaySalesValue)}
        icon={<BsBarChartFill />}
        text="Vendas hoje"
        period={
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
            <span style={{ fontSize: '12px' }}>Hoje</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="rgba(255, 255, 255, 0.3)" fill="none"/>
              <line x1="6" y1="6" x2="6" y2="3" stroke="white" strokeWidth="1.5"/>
              <line x1="6" y1="6" x2="8" y2="6" stroke="white" strokeWidth="1.5"/>
            </svg>
          </div>
        }
      />
      <HomeCardStatistic
        info={formatCurrency(totalSalesValue)}
        icon={<BsGraphUpArrow />}
        text="Total em vendas"
        period={
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
            <span style={{ fontSize: '12px' }}>Vendas de todo o período</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="rgba(255, 255, 255, 0.3)" fill="none"/>
              <line x1="6" y1="6" x2="6" y2="3" stroke="white" strokeWidth="1.5"/>
              <line x1="6" y1="6" x2="8" y2="6" stroke="white" strokeWidth="1.5"/>
            </svg>
          </div>
        }
      />
      <HomeCardStatistic
        info={
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span>{formatCurrency(monthSalesValue)}</span>
            <span style={{ 
              fontSize: '14px', 
              color: '#22c55e',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <HiOutlineTrendingUp />
              {growthPercentage}%
            </span>
          </div>
        }
        icon={<FaChartBar />}
        text={`Vendas em ${new Date().toLocaleDateString('pt-BR', { month: 'long' })}`}
        period={
          <span style={{ fontSize: '12px' }}>
            ({monthSales.length} vendas)
          </span>
        }
      />
      <HomeCardStatistic
        info="0"
        icon={<BsEye />}
        text="Visitas na loja"
        period={
          <div>
            <div style={{ 
              fontSize: '12px', 
              color: '#22c55e',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '8px'
            }}>
              <HiOutlineTrendingUp />
              100%
            </div>
            <div style={{ fontSize: '10px', marginTop: '4px', color: 'rgba(255, 255, 255, 0.4)' }}>
              Esta semana
            </div>
            <div style={{ 
              fontSize: '10px', 
              color: 'rgba(255, 255, 255, 0.3)',
              letterSpacing: '2px',
              marginTop: '4px'
            }}>
              S D S T Q Q S S
            </div>
          </div>
        }
      />
    </CompactStatsGrid>
  );
};

export default AdditionalStatsCards;

