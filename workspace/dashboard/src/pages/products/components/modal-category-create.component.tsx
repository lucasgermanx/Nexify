import { ButtonOrange, ButtonTransparent } from "@/assets/Style/GlobalStyle";
import { Container, Form, Modal } from "react-bootstrap";

import FormGroup from "@/global/components/form-group.component";
import { CategoriesCreateHandler } from "../actions/CategoriesHandler";

export const ModalCreateCategories: React.FC<{ showModal: boolean; handleModalClose: () => void; }> = ({ showModal, handleModalClose }) => {
  const {register, handleSubmit, onSubmit} = CategoriesCreateHandler()
  return (
    <>
      <Modal show={showModal} onHide={handleModalClose} animation={true} className="fade">
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Container>
              <h5>Cadastrar nova categoria</h5>
              <div className="mt-4">
                <FormGroup label="Nome da categoria" className="mt-5" placeholder="Ex: vips" useForm={{...register("category", { required: true })}} />
              </div>
              <div className="mt-3">
                <FormGroup label="Icone da categoria" className="mt-5" placeholder="Ex: vips" useForm={{...register("category_icon", { required: true })}} />
              </div>
            </Container>
            <div className="mt-5" style={{ display: "flex", justifyContent: "flex-end" }}>
              <ButtonTransparent onClick={handleModalClose}>Fechar</ButtonTransparent>
              <ButtonOrange type="submit" onClick={handleModalClose}>Salvar</ButtonOrange>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
