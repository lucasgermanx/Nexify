import {
  DiscountedPrice,
  PriceContainer,
} from "@/core/client/components/styles/product-component.style";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { HiOutlineMinusSm, HiOutlineTrash, HiPlusSm } from "react-icons/hi";

import useStore from "@/core/client/hooks/store.hook";
import Footer from "@/global/components/footer";
import InputWithButton from "@/global/components/InputWithButton";
import NavbarComponent from "@/global/components/NavbarComponent";
import { formatReal } from "@/global/functions/FormatToReal";
import { ButtonTransparent } from "@/global/style/global-style";
import { Buffer } from "buffer";
import { useState } from "react";
import { toast } from "sonner";
import { cartActions } from "./actions/cart.actions";

const CartPage = () => {
  const {
    cart,
    totalValue,
    handleCouponDiscount,
    handleDecrementQuantity,
    handleDeleteItem,
    handleIncrementQuantity,
    setCoupon,
    setBuyer,
    formOfPayments,
    setFormOfPayments,
    handlerCoupon,
    coupon,
    handlerGeneratePayments,
    buyer
  } = cartActions();
  const { store } = useStore();
  const [buyer_cart, setBuyerCart] = useState("");

  return (
    <><section style={{ paddingBottom: "5%" }}>
      <NavbarComponent />
      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <h2 className="text-white" style={{ fontWeight: "600" }}>
              Carrinho
            </h2>
            <p className="text-white">
              Confira ou finalize a compra dos pacotes!
            </p>
          </Col>
          <Col md={9}>
            <Card style={{ backgroundColor: "#0C0D11", border: "0px" }}>
              <Card.Body>
                <h5 className="mt-3 text-white" style={{ fontWeight: "600" }}>
                  Produtos e Pacotes
                </h5>
                <hr />
                {cart.length === 0 ? (
                  <p
                    className="text-center mt-4 text-white"
                    style={{ fontSize: "13px" }}
                  >
                    Nenhum produto adicionado ao carrinho
                  </p>
                ) : (
                  cart.map((item: any) => (
                    <>
                      <div className="d-flex">
                        <div>
                          <img
                            src={'data:image/png;base64,'+Buffer.from(item?.product_image ? item?.product_image : '').toString('base64')}
                            alt={item?.product_name}
                            width="200" />
                        </div>
                        <div style={{ paddingLeft: "1%" }}>
                          <h5 className="fw-bold mb-3 mt-1 text-white">
                            {item?.product_name}
                          </h5>
                          <PriceContainer>
                            {parseFloat(item?.product_price_discount || "0") !==
                              0 ? (
                              <>
                                <p className="p-0 m-0 text-white">
                                  de R$ {item?.product_price} por apenas:
                                </p>
                                <DiscountedPrice>
                                  R$ {item?.product_price_discount}
                                </DiscountedPrice>
                              </>
                            ) : (
                              <DiscountedPrice>
                                {item?.product_price}
                              </DiscountedPrice>
                            )}
                          </PriceContainer>
                          <p
                            className="text-white"
                            style={{ fontSize: "13px" }}
                          >
                            {item?.quantity}x
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex justify-content-end">
                          <ButtonTransparent
                            onClick={() => handleIncrementQuantity(item?.id)}
                          >
                            <HiPlusSm color="green" />
                          </ButtonTransparent>
                          <ButtonTransparent
                            onClick={() => handleDecrementQuantity(item?.id)}
                          >
                            <HiOutlineMinusSm color="orange" />
                          </ButtonTransparent>
                          <ButtonTransparent>
                            <HiOutlineTrash
                              color="red"
                              onClick={() => handleDeleteItem(item?.id)} />
                          </ButtonTransparent>
                        </div>
                      </div>
                    </>
                  ))
                )}
              </Card.Body>
            </Card>
            <div className="mt-5">
              <Card
                className="mt-2 mb-2"
                style={{ backgroundColor: "#0C0D11", border: "0px" }}
              >
                <Card.Body>
                  <h5 className="mt-3 text-white" style={{ fontWeight: "600" }}>
                    Dados do comprador
                  </h5>
                  <InputWithButton
                    placeholder="Digite o ID"
                    buttonText="Adicionar"
                    onChange={(e: any) => {
                      setBuyerCart(e.target.value);
                    } }
                    onClick={() => {
                      setBuyer(buyer_cart);
                      toast.success("Identificador adicionado com sucesso.");
                    } } />
                </Card.Body>
              </Card>

              <Card style={{ backgroundColor: "#0C0D11", border: "0px" }}>
                <Card.Body>
                  <h5 className="mt-3 text-white" style={{ fontWeight: "600" }}>
                    Formas de pagamento
                  </h5>
                  <Row>
                    {store?.mercadopago && (
                      <Col md={3} className="mt-4">
                        <ButtonTransparent
                          onClick={() => {
                            setFormOfPayments("mercadopago");
                          } }
                          style={{
                            background: formOfPayments === "mercadopago"
                              ? "lightblue"
                              : "transparent",
                          }}
                        >
                          <img
                            src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png"
                            width="150"
                            alt="Mercado Pago" />
                        </ButtonTransparent>
                      </Col>
                    )}
                    {store?.picpay && (
                      <Col md={3} className="mt-4">
                        <ButtonTransparent
                          onClick={() => {
                            setFormOfPayments("picpay");
                          } }
                          style={{
                            background: formOfPayments === "picpay"
                              ? "lightgreen"
                              : "transparent",
                          }}
                        >
                          <img
                            src="https://logodownload.org/wp-content/uploads/2018/05/picpay-logo-2.png"
                            width="130"
                            alt="PicPay" />
                        </ButtonTransparent>
                      </Col>
                    )}
                  </Row>
                  {!store?.mercadopago &&
                    !store?.picpay && (
                      <p
                        className="text-center mt-4 text-white"
                        style={{ fontSize: "13px" }}
                      >
                        Nenhuma forma de pagamento foi configurada! Entre em
                        contato com o administrador da loja.
                      </p>
                    )}
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md={3} className="mt-1">
            <Card style={{ backgroundColor: "#0C0D11", border: "0px" }}>
              <Card.Body>
                <h5 className="text-white">Resumo</h5>
                <div className="d-flex justify-content-between mt-4">
                  <p className="text-white" style={{ fontSize: "13px" }}>
                    Valor dos produtos
                  </p>
                  <p
                    className="text-white"
                    style={{ fontSize: "13px", fontWeight: "700" }}
                  >
                    {formatReal(totalValue)}
                  </p>
                </div>
                <div
                  style={{ border: "1px solid #111216", height: "1px" }}
                ></div>
                <div className="d-flex justify-content-between mt-1">
                  <p
                    className="text-white m-0 p-0"
                    style={{ fontSize: "13px" }}
                  >
                    Cupom
                  </p>
                  <p
                    className="text-white m-0 p-0"
                    style={{ fontSize: "13px", fontWeight: "700" }}
                  >
                    {coupon?.coupon ? coupon?.coupon : "Nenhum"}
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p
                    className="text-white m-0 p-0"
                    style={{ fontSize: "13px" }}
                  >
                    Desconto
                  </p>
                  <p
                    className="text-white"
                    style={{ fontSize: "13px", fontWeight: "700" }}
                  >
                    {formatReal(handleCouponDiscount(totalValue, coupon))}
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#E5FFF1",
                    borderRadius: "10px",
                  }}
                >
                  <div className="pt-3 pl-3 pr-3 pb-3">
                    <center>
                      <h5 style={{ color: "#1f9050", fontWeight: "700" }}>
                        Valor final:
                      </h5>
                      <h2 style={{ color: "#1f9050", fontWeight: "700" }}>
                        {formatReal(
                          totalValue - handleCouponDiscount(totalValue, coupon)
                        )}
                      </h2>
                    </center>
                  </div>
                </div>
                <div className="mt-3">
                  {cart.length == 0 || !buyer ? (
                    <div>
                      <p className="text-white text-center mt-3">
                        Adicione produtos ao carrinho
                      </p>
                      <Button
                        style={{
                          border: "1px solid orange",
                          color: "orange",
                          backgroundColor: "transparent",
                          height: "45px",
                          fontWeight: 600,
                          fontSize: "13px",
                        }}
                        className="w-100 mt-2"
                        disabled
                      >
                        {cart.length != 0 ? "Defina um comprador" : "Carrinho vazio"}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      style={{
                        border: "0px",
                        color: "white",
                        backgroundColor: "orange",
                        height: "45px",
                        fontWeight: 600,
                        fontSize: "13px",
                      }}
                      onClick={!formOfPayments ? () => { toast.warning("Escolha uma forma de pagamento"); } : handlerGeneratePayments}
                      className="w-100"
                    >
                      {formOfPayments === "mercadopago" ||
                        formOfPayments === "picpay"
                        ? "Finalizar minha compra"
                        : "Selecione a forma de pagamento"}
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
            <Card
              className="mt-4"
              style={{ backgroundColor: "#0C0D11", border: "0px" }}
            >
              <Card.Body>
                <InputWithButton
                  onChange={(e: any) => {
                    setCoupon(e.target.value);
                  } }
                  buttonText="Adicionar cupom"
                  onClick={() => {
                    handlerCoupon();
                  } } />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section><Footer /></>
  );
};

export default CartPage;
