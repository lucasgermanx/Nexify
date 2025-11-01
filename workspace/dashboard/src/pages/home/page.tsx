import { useAuth } from "@/core/client/providers/auth/auth.provider";
import AreaChart from "@/global/components/charts/area-chart.component";
import HeroSection from "@/global/components/HeroSection";
import NavbarComponent from "@/global/components/navbar.component";
import { Card, Row } from "react-bootstrap";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { MdCancel, MdOutlinePending } from "react-icons/md";
import useTransactions from "../transactions/hook";
import HomeCardStatistic from "./components/home-card-statics.component";

const HomePage = () => {
  const { user } = useAuth();
  const { transactionData } = useTransactions()

  return (
    <>
      <HeroSection>
        <NavbarComponent />
        <>
          <section className="mt-5">
            <h3>Boas-vindas, {user.name}</h3>
          </section>
          <section className="mt-4">
            <Row>
              <HomeCardStatistic info={transactionData.transactions_approved} icon={<FaCheck />} text={"Vendas aprovadas"} />
              <HomeCardStatistic info={transactionData.transactions_pending} icon={<MdOutlinePending />} text={"Vendas pendentes"} />
              <HomeCardStatistic info={transactionData.order_delivered} icon={<AiOutlineDeliveredProcedure />} text={"Vendas entregues"} />
              <HomeCardStatistic info={transactionData.order_not_delivered} icon={<MdCancel />} text={"Vendas não entregue"} />
            </Row>
          </section>
          <section className="mt-5">
            <Card style={{ border: '1px solid #f4f4f4' }}>
              <Card.Body>
                <h5>Análise de transações</h5>
                <AreaChart />
              </Card.Body>
            </Card>
          </section>
        </>
      </HeroSection>
    </>
  );
};

export default HomePage;
