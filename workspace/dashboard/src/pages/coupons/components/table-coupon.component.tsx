import { MdCreate, MdOutlineDeleteOutline } from "react-icons/md";
import { CouponModalUpdateAction } from "../actions/coupons-update.action";
import { StyledButton, StyledTable } from "../style/table-component.style";

import FormGroup from "@/global/components/form-group.component";
import { NotFoundList } from "@/global/components/NotFound-List";
import PaginationComponent from "@/global/components/pagination.component";
import { CouponsUpdateStatus } from "../actions/coupons-update-status.action";
import { CouponsActions } from "../actions/coupons.action";
import { CouponModalUpdateComponent } from "./modal-update-coupon.component";

export const CouponsListComponent = () => {
  const { coupons,paginationFilter, register ,ProviderDeleteCoupon, handlePageChange} = CouponsActions();
  const {updateStatusCoupon} = CouponsUpdateStatus()
  const { showModalUpdateAction, closeModalUpdateAction, showModalUpdateCoupon} = CouponModalUpdateAction();
  
  return (
    <div>
      <div>
        <div className="w-25 mb-4">
          <FormGroup
            label="Pesquisar um cupom"
            placeholder="Pesquise alguns dos seus cupons"
            className="mt-5"
            useForm={{ ...register("value", { required: true }) }}
          />
        </div>
      </div>
      <StyledTable>
        <thead>
          <tr>
            <th>Referência</th>
            <th>Cupom</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Quantidade de uso</th>
            <th>Ativar/Desativar</th>
            <th className="edit-cell">Editar</th>
            <th className="delete-cell">Deletar</th>
          </tr>
        </thead>
        <tbody>
          {coupons?.map((coupon: any) => (
            <>
              <tr key={coupon.reference}>
                <td>{coupon.reference}</td>
                <td>{coupon.coupon}</td>
                <td>
                  {coupon.type === "direct" ? "Direto no Preço" : "Porcentagem"}
                </td>
                <td>
                  {coupon.type === "direct"
                    ? coupon.coupon_discount.toFixed(2)
                    : coupon.coupon_discount + "%"}
                </td>
                <td>{coupon.used}/{coupon.limited_used}</td>
                <td className="toggle-cell">
                  {coupon.activated ? (
                    <StyledButton variant="danger" onClick={(()=>{updateStatusCoupon(false, coupon)})}>Desativar</StyledButton>
                  ) : (
                    <StyledButton variant="success" onClick={(()=>{updateStatusCoupon(true,  coupon)})}>Ativar</StyledButton>
                  )}
                </td>
                <td className="edit-cell">
                  <StyledButton variant="success" onClick={(()=>{showModalUpdateAction()})}>
                    <MdCreate />
                  </StyledButton>
                </td>
                <td className="delete-cell">
                  <StyledButton variant="danger" onClick={(()=>{ProviderDeleteCoupon(coupon.coupon_reference)})}  >
                    <MdOutlineDeleteOutline />
                  </StyledButton>
                </td>
              </tr>
              <CouponModalUpdateComponent
                coupon={coupon}
                showModal={showModalUpdateCoupon}
                handleCloseModal={closeModalUpdateAction}
              />
            </>
          ))}
        </tbody>
      </StyledTable>
      
      {coupons?.length == 0 || coupons == undefined ? (<NotFoundList title="Lamentamos informar que não encontramos nenhum cupom disponível."/>) : ''}

      <div className="d-flex justify-content-center">
        <PaginationComponent
          paginationCount={paginationFilter?.paginationCount}
          hasMoreResults={paginationFilter?.hasMoreResults}
          onPageChange={handlePageChange}
        ></PaginationComponent>
      </div>
    </div>
  );
};
