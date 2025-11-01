import CardForm from "@/global/components/card-form.component";
import HeroSection from "@/global/components/HeroSection";
import NavbarComponent from "@/global/components/navbar.component";
import { CouponModalCreateComponent } from "@/pages/coupons/components/modal-create-coupon.tsx";
import { CouponsListComponent } from "@/pages/coupons/components/table-coupon.component";
import { ModalCreateCouponAction } from "./actions/coupon-create-action";

const CouponsPage = () => {
  const { closeModalAction, showModalCoupon, showModalAction } = ModalCreateCouponAction();
  return (
    <HeroSection>
      <NavbarComponent
        title="Gerenciar cupons"
        buttonText2="Criar um novo cupom"
        buttonAction2={()=>{showModalAction()}}
      />

      <div style={{ paddingTop: "2%" }}>
        <CardForm>
          <CouponsListComponent />
        </CardForm>
      </div>

      <CouponModalCreateComponent
        showModal={showModalCoupon}
        handleCloseModal={closeModalAction}
      />
    </HeroSection>
  );
};

export default CouponsPage;
