import { ButtonOrange, ButtonTransparent } from "@/assets/Style/GlobalStyle";
import { Col, Container, Modal, Row } from "react-bootstrap";

import FormGroup from "@/global/components/form-group.component";
import { Form } from "react-router-dom";
import { UpdatePasswordAction } from "../actions/profile.action";

export const ModalUpdatePasswordComponent = ({showModal,handleCloseModal}: any) => {
  const {register, handleSubmit, onSubmit} = UpdatePasswordAction()
  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      animation={true}
      className="fade"
    >
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <h5>Alterar senha do usuário</h5>
            <Row>
              <Col md={12}>
                <div className="mt-4">
                  <FormGroup label="Senha" className="mt-5" type="password" useForm={{ ...register("password", { required: true }) }} />
                </div>
              </Col>
              <Col md={12}>
                <div className="mt-4">
                  <FormGroup label="Confirme sua senha" className="mt-5" type="password" useForm={{ ...register("confirm_password", { required: true }) }} />
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
