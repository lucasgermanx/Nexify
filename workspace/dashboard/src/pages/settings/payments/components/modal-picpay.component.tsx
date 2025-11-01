import { ButtonOrange, ButtonTransparent } from "@/assets/Style/GlobalStyle";
import { Col, Container, Modal, Row } from "react-bootstrap";

import { Form } from "react-router-dom";
import FormGroup from "@/global/components/form-group.component";

export const ModalPicpPay = ({showModal, handleCloseModal, handleSubmit, register}:any) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal} animation={true} className="fade">
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Container>
            <h5>Configurar PicPay</h5>
            <Row>
              <Col md={12}>
                <div className="mt-4">
                  <FormGroup label="picpayToken" className="mt-5" useForm={{ ...register("picpayToken", { required: true }) }} />
                </div>
              </Col>
              <Col md={12}>
                <div className="mt-4">
                  <FormGroup label="sellerToken" className="mt-5" useForm={{ ...register("sellerToken", { required: true }) }} />
                </div>
              </Col>
            </Row>
          </Container>
          <div className="mt-5" style={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonTransparent onClick={handleCloseModal}>Fechar</ButtonTransparent>
            <ButtonOrange type="submit">Salvar</ButtonOrange>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
