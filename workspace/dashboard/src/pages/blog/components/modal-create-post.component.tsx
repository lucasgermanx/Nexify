import { Col, Modal, Row } from "react-bootstrap";

import { ButtonGreen } from "@/assets/Style/GlobalStyle";
import FilePondUpload from "@/global/components/file-pond-upload.component";
import FormGroup from "@/global/components/form-group.component";
import { QuillEditor } from "@/global/components/QuillEditor";
import { Form } from "react-router-dom";
import { BlogHandler } from "../actions/post-create.actions";

export const ModalCreatePost = ({ showModal, handleClose }: any) => {
  const { register, onSubmit, handleSubmit, setImages, images, setDescription, description } = BlogHandler();

  return (
    <>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Body>
          <h5>Adicionar um novo post</h5>
          <div className="mt-4">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md={12}>
                  <FormGroup
                    label={"Título do post"}
                    placeholder={"Insira o título do imóvel"}
                    useForm={{ ...register("post_title", { required: true }) }}
                  ></FormGroup>
                </Col>
                <Col md={12} className="mt-3">
                  <label htmlFor="" className="mb-2">
                    Adicione uma descrição ao seu post
                  </label>
                  <QuillEditor value={description} setValue={setDescription} />
                </Col>
                <Col md={12} className="mt-4">
                  <label htmlFor="" className="mb-2">
                    Adicione imagens ao seu imóvel <span style={{ color: "red" }}>*</span>
                  </label>
                  <FilePondUpload setImages={setImages} defaultFile={images}/>
                </Col>
              </Row>
              <ButtonGreen onClick={handleClose} type="submit" className="mt-5" style={{ float: "right" }}>
                Criar um post
              </ButtonGreen>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
