import { Button, Card, Col, Row } from "react-bootstrap";
import { MercadoPagoDataAction, MercadoPagoModalActions } from "./actions/mercado-pago.actions";
import { PicPayDataAction, PicPayModalAction } from "./actions/picpay.actions";

import { MdCheckCircle } from "react-icons/md";
import { ModalMercadoPago } from "./components/modal-mercado.component";
import { ModalPicpPay } from "./components/modal-picpay.component";

const PaymentsPage = () => {
  const { showModalAction, closeModalAction, showModalMercadoPago } = MercadoPagoModalActions();
  const { actionModalPicpay, closeModalPicpay, showModalPicPay } = PicPayModalAction();
  const { formMercadoPago } = MercadoPagoDataAction();
  const { formPicPay } = PicPayDataAction();

  return (
    <div className="mt-5">
      <Row className="mt-3">
        <Col md={8}>
          <Row>
            <Col md={6} className="mt-5">
              <Card style={{ borderRadius: "10px" }}>
                <Card.Body>
                  <img className="mt-3" src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png" width={129} />
                  <h5 className="mt-3" style={{ fontWeight: "600" }}>Mercado Pago</h5>
                  <p>Aceite pagamentos via cartão de crédito, boleto e saldo atráves do Mercado Pago.</p>
                  <Button style={{ backgroundColor: "#303030", border: "0px", height: "45px", width: "100%" }} onClick={showModalAction}>Configurar Mercado Pago</Button>
                </Card.Body>
              </Card>
              <ModalMercadoPago showModal={showModalMercadoPago} register={formMercadoPago.register} handleSubmit={formMercadoPago.handleSubmit(formMercadoPago.onSubmit)} handleCloseModal={closeModalAction} />
            </Col>

            <Col md={6} className="mt-5">
              <Card>
                <Card.Body>
                  <img className="mt-3" src="https://upload.wikimedia.org/wikipedia/commons/2/29/Logonovo_pagseguro-cinza.png" width={129} />
                  <h5 className="mt-3" style={{ fontWeight: "600" }}>PagSeguro</h5>
                  <p>Aceite pagamentos via cartão de crédito, boleto e saldo atráves do PagSeguro.</p>
                  <Button style={{ backgroundColor: "#303030", border: "0px", height: "45px", width: "100%" }}>Desabilitado temporariamente</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mt-5">
              <Card>
                <Card.Body>
                  <img className="mt-3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" width={129} />
                  <h5 className="mt-3" style={{ fontWeight: "600" }}>PayPal</h5>
                  <p>Aceite pagamentos via cartão de crédito, boleto e saldo atráves do Paypal.</p>
                  <Button style={{ backgroundColor: "#303030", border: "0px", height: "45px", width: "100%" }}>Desabilitado temporariamente</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mt-5">
              <Card>
                <Card.Body>
                  <img className="mt-3" src="https://cdn.cookielaw.org/logos/3ded1b65-c8c1-4786-bfc3-cc82081127ef/f21a9737-2313-4300-b2bc-4a9f65409a2d/b890a33b-6c72-4221-86f5-26fd6aac0be3/picpay-logo-2.png" width={129} />
                  <h5 className="mt-3" style={{ fontWeight: "600" }}>PicPay</h5>
                  <p>Aceite pagamentos via cartão de crédito, boleto e saldo atráves do PicPay.</p>
                  <Button style={{ backgroundColor: "#303030", border: "0px", height: "45px", width: "100%" }} onClick={actionModalPicpay}>Configurar Picpay</Button>
                </Card.Body>
              </Card>
              <ModalPicpPay showModal={showModalPicPay} register={formPicPay.register} handleSubmit={formPicPay.handleSubmit(formPicPay.onSubmit)} handleCloseModal={closeModalPicpay} />
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <Card className="mt-5" style={{ backgroundColor: "#303030" }}>
            <Card.Body>
              <img className="mt-3" src="https://sejaefi.com.br/_ipx/_/images/components/menu/logo-efi-bank.svg" width={120} />
              <p style={{ color: "white" }} className="mt-5">Com GerenciaNet você irá aumentar suas vendas aceitando pagamentos de forma totalmente transparente em sua loja on-line.</p>
              <p className="mt-4" style={{ color: "white" }}><MdCheckCircle color="orange" /> Aceite pagamento á vista e parcelado por cartão <br /> de crédito.</p>
              <p className="mt-2" style={{ color: "white" }}><MdCheckCircle color="orange" /> Emita boletos bancários diretamente da sua loja <br /> online.</p>
              <p className="mt-2" style={{ color: "white" }}><MdCheckCircle color="orange" /> Receba pagamento via PIX de forma totalmente <br /> automática</p>
              <p style={{ color: "white", fontSize: "13px" }}><strong>Atenção</strong> ao habilitar esse método de pagamento todos os outros serão desabilitados</p>
              <Button style={{ backgroundColor: "orange", color: "black", border: "0px", height: "45px", width: "100%" }}>Desabilitado temporariamente</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentsPage;
