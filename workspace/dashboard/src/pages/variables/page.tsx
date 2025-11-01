import CardForm from "@/global/components/card-form.component";
import HeroSection from "@/global/components/HeroSection";
import NavbarComponent from "@/global/components/navbar.component";
import { ModalCreateCouponAction } from "../coupons/actions/coupon-create-action";
import { ModalCreateVariable } from "./components/modal-create-variable";
import { TableListVariableComponent } from "./components/table-list-variable";

const VariablesPage = () => {
  const { closeModalAction, showModalCoupon, showModalAction } = ModalCreateCouponAction();
  
  return (
    <HeroSection>
      <NavbarComponent
        title="Gerenciar Comandos e Variáveis"
        buttonText2="Criar um novo comandos e variáveis"
        buttonAction2={() => { showModalAction() }}
      />

      <div style={{ paddingTop: "2%" }}>
        <CardForm>
          <TableListVariableComponent />
        </CardForm>
      </div>

      <ModalCreateVariable
        showModal={showModalCoupon}
        handleCloseModal={closeModalAction}
      />
    </HeroSection>
  );
};

export default VariablesPage;
