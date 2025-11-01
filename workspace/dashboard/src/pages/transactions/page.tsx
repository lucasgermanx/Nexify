import CardForm from "@/global/components/card-form.component";
import HeroSection from "@/global/components/HeroSection";
import NavbarComponent from "@/global/components/navbar.component";
import { TransactionsListComponent } from "./components/table-transactions.component";

const TransactionPage = () => {
  return (
    <HeroSection>
      <NavbarComponent
        title="Gerenciar transações"
      />

      <div style={{ paddingTop: "2%" }}>
        <CardForm>
          <TransactionsListComponent/>
        </CardForm>
      </div>     
    </HeroSection>
  );
};

export default TransactionPage;
