import { ButtonOrange, ButtonTransparent } from "@/assets/Style/GlobalStyle";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { CreateCouponAction, ModalCreateCouponAction } from "../actions/coupon-create-action";

import FormGroup from "@/global/components/form-group.component";
import SelectGroup from "@/global/components/select-group.component";
import { Form } from "react-router-dom";

export const CouponModalCreateComponent = ({showModal, handleCloseModal}:any) => {
  const {form} = CreateCouponAction()
  const {options} = ModalCreateCouponAction()
  
  return (
    <Modal show={showModal} onHide={handleCloseModal} animation={true} className="fade">
      <Modal.Body>
        <Form onSubmit={form.handleSubmit}>
          <Container>
            <h5>Adicionar novo cupom</h5>
            <Row>
              <Col md={6}>
                <div className="mt-4">
                  <FormGroup label="Cupom" className="mt-5" useForm={{ ...form.register("coupon", { required: true }) }} />
                </div>
              </Col>
              <Col md={6}>
                <div className="mt-4">
                  <FormGroup label="Valor" className="mt-5" type="number" useForm={{ ...form.register("coupon_discount", { required: true }) }} />
                </div>
              </Col>
              <Col md={12}>
                <div className="mt-3">
                  <FormGroup label="Limite de uso" type="number" useForm={{ ...form.register("limited_used", { required: true }) }} />
                </div>
              </Col>
              <Col md={12} className="mt-3">
                <SelectGroup label="Tipo de desconto" type="select" options={options} useForm={{ ...form.register("type", { required: true }) }} />
              </Col>
            </Row>
          </Container>
          <div className="mt-5" style={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonTransparent onClick={handleCloseModal}>Fechar</ButtonTransparent>
            <ButtonOrange type="submit" onClick={handleCloseModal}>Salvar</ButtonOrange>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
