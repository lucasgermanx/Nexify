import { ButtonOrange, ButtonTransparent } from "@/assets/Style/GlobalStyle";
import { Col, Container, Modal, Row } from "react-bootstrap";

import FormGroup from "@/global/components/form-group.component";
import { Form } from "react-router-dom";

export const ModalMercadoPago = ({ showModal, handleCloseModal, handleSubmit, register }: any) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal} animation={true} className="fade">
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Container>
            <h5>Configurar Mercado Pago</h5>
            <Row>
              <Col md={12}>
                <div className="mt-4">
                  <FormGroup label="Token de acesso (Access Token)" placeholder="Token de acesso Mercado Pago" className="mt-5" useForm={{ ...register("token", { required: true }) }} />
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
