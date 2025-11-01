import { AddToCartButton, DiscountedPrice, PriceContainer, ShareButton, SupportButton, VariationSelect } from "@/core/client/components/styles/product-component.style";

import { Buffer } from "buffer";
import { Container } from "react-bootstrap";
import Footer from "@/global/components/footer";
import HTMLReactParser from "html-react-parser";
import { Link } from "react-router-dom";
import NavbarComponent from "@/global/components/NavbarComponent";
import SelectComponent from "@/global/components/SelectComponent";
import { cartActions } from "./actions/cart.actions";
import { productActions } from "./actions/product.actions";
import support_icon from '@/assets/support_icon.png';
import { toast } from "sonner";

export const ProductPage = () => {
  const { filterProducts, variables, handleSelectChange, selectedOption } = productActions();
  const {addCartHandler} = cartActions()

  const VariablesOptions = variables?.map((item: any) => ({
    label: item?.option_name,
    value: item?.variable_reference,
  }));

  return (
    <>
      <NavbarComponent />
      <Container>
        <section className="col-md-12 mt-4" style={{ backgroundColor: "#0C0D11", padding: "2%", color: "white", borderRadius: "10px" }}>
          <div>
            <span style={{ fontSize: "14px" }}>Página Inicial <i className="fa fa-angle-right" aria-hidden="true"></i> Loja <i className="fa fa-angle-right" aria-hidden="true"></i> Produtos <i className="fa fa-angle-right" aria-hidden="true"></i> {filterProducts?.product_name}</span>
          </div>
        </section>
      </Container>
      <Container>
        <div className="d-flex gap-4">
          <section className="col-md-9 mt-4 " style={{ backgroundColor: "#0D0E10", padding: "2%", color: "white", borderRadius: "10px" }}>
            <div className="d-flex gap-4">
              <div>
                <img src={'data:image/png;base64,'+Buffer.from(filterProducts?.product_image ? filterProducts?.product_image : '').toString('base64')} alt={filterProducts?.product_name} width="200" />
              </div>
              <div>
                <h2 className="fw-bold mb-4 mt-3">{filterProducts?.product_name}</h2>
                <PriceContainer>
                  {parseFloat(filterProducts?.product_price_discount || "0") !== 0 ? (
                    <>
                      <p className="p-0 m-0">
                        de R$ {filterProducts?.product_price} por apenas:
                      </p>
                      <DiscountedPrice>
                        R$ {filterProducts?.product_price_discount}
                      </DiscountedPrice>
                    </>
                  ) : (
                    <DiscountedPrice>
                      {filterProducts?.product_price}
                    </DiscountedPrice>
                  )}
                </PriceContainer>
                {variables == undefined ? (
                  ""
                ) : (
                  <VariationSelect>
                    <label style={{ fontSize: "13px" }}>Escolha uma das variações</label>
                    <SelectComponent
                      options={VariablesOptions}
                      onChange={handleSelectChange}
                    />
                  </VariationSelect>
                )}
              </div>
            </div>
            <div className="mt-1 d-flex flex-row-reverse">
              <ShareButton onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("A URL da página foi copiada com sucesso!");
              }}>Compartilhar produto</ShareButton>
              <AddToCartButton onClick={() => {addCartHandler({ ...filterProducts, quantity: 1, variable: selectedOption == "" ? variables?.[0]?.variable_reference : selectedOption }); }}>Adicionar ao meu carrinho</AddToCartButton>
            </div>
          </section>
          <section className="mt-4 " style={{ backgroundColor: "#0D0E10", padding: "2%", color: "white", borderRadius: "10px" }}>
            <div>
              <h6 className="text-center">Precisa de ajuda com esse produto?</h6>
              <center>
                <img src={support_icon} alt="suporte-icon" width={150} />

                <Link to="/">
                  <SupportButton>Entrar em contato</SupportButton>
                </Link>
              </center>
            </div>
          </section>
        </div>

        <section className="col-md-12 mt-4" style={{ backgroundColor: "#0D0E10", padding: "2%", color: "white", borderRadius: "10px" }}>
          <h6>Descrição do Produto</h6>
          <div className="mt-3">
            {HTMLReactParser(filterProducts?.product_description || '<p>Produto sem descrição</p>')}
          </div>
        </section>
      </Container>
      <Footer/>
    </>
  );
};
