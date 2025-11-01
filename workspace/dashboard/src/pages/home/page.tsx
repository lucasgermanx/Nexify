import { useAuth } from "@/core/client/providers/auth/auth.provider";
import HeroSection from "@/global/components/HeroSection";
import NavbarComponent from "@/global/components/navbar.component";
import { Row, Col } from "react-bootstrap";
import { WelcomeCard } from "./style/home.style";
import SubscriptionAlert from "./components/subscription-alert.component";
import AdditionalStatsCards from "./components/additional-stats-cards.component";
import AnnualRevenueCard from "./components/annual-revenue-card.component";
import RecentPaymentsCard from "./components/recent-payments-card.component";
import { PopularPackagesCard, PopularDiscountsCard } from "./components/popular-items-cards.component";

const HomePage = () => {
  const { user } = useAuth();

  const currentDate = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  const formattedDate = currentDate.toLocaleDateString('pt-BR', dateOptions);

  return (
    <>
      <HeroSection>
        <NavbarComponent />
        <>
          <WelcomeCard>
            <div className="welcome-date">
              Hoje é {formattedDate}
            </div>
            <div className="welcome-title">
              Olá, <span className="orange-text">{user.name}</span> 👋
            </div>
            <p className="welcome-subtitle">
              Pequenas ações geram grandes resultados
            </p>
          </WelcomeCard>

          {/* Subscription Alert */}
          <SubscriptionAlert />

          {/* Layout: Cards à esquerda, Gráfico à direita */}
          <Row style={{ marginTop: '1rem' }}>
            {/* Coluna esquerda - Cards de estatísticas */}
            <Col lg={6} style={{ display: 'flex', flexDirection: 'column' }}>
              <AdditionalStatsCards />
            </Col>

            {/* Coluna direita - Gráfico de receita */}
            <Col lg={6} style={{ display: 'flex', flexDirection: 'column' }}>
              <AnnualRevenueCard />
            </Col>
          </Row>

          {/* Segunda linha - Últimos pagamentos, Pacotes populares e Descontos populares */}
          <Row style={{ marginTop: '1rem' }}>
            <Col lg={4}>
              <RecentPaymentsCard />
            </Col>
            <Col lg={4}>
              <PopularPackagesCard />
            </Col>
            <Col lg={4}>
              <PopularDiscountsCard />
            </Col>
          </Row>
        </>
      </HeroSection>
    </>
  );
};

export default HomePage;
