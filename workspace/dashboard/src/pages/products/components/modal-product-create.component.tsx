import { ButtonOrange, ButtonTransparent } from "@/assets/Style/GlobalStyle";
import { Button, Col, Container, Form, FormControl, InputGroup, Modal, Row } from "react-bootstrap";

import CardForm from "@/global/components/card-form.component";
import FilePondUpload from "@/global/components/file-pond-upload.component";
import FormGroup from "@/global/components/form-group.component";
import { QuillEditor } from "@/global/components/QuillEditor";
import SelectGroup from "@/global/components/select-group.component";
import styled from "styled-components";
import { ProductsCreateAction } from "../actions/products-actions";
import VariaveisTable from "./variables-table.component";

export const ModalProductCreate = ({ showModal, handleModalClose, category }: any) => {
  const LabelInput = styled.label`
    font-size: 14px;
  `;

  const categoryOptions = [{
    label: category.category,
    value: category.category_reference,
  }];

  const optionsVisibility = [{
    label: "Publico",
    value: "public",
  }, {
    label: "Interno",
    value: "intern",
  }];

  const { handleSubmit, register, description, setDescription, images, setImages, handlerSelectVariable, variablesOptions, variablesSelected, handlerRemoveVariable} = ProductsCreateAction()

  return (
    <Modal show={showModal} onHide={handleModalClose} animation={true} className="fade" size="xl">
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Container>
            <h5>Cadastrar um novo produto</h5>
            <div className="mt-4">
              <Row>
                <Col md={8}>
                  <div className="mt-2">
                    <CardForm>
                      <Row>
                        <Col md={6}>
                          <FormGroup label="Nome do produto" useForm={{ ...register("product_name", { required: true }) }} />
                        </Col>
                        <Col md={6} className="mt-2">
                          <SelectGroup label="Categoria" options={categoryOptions} useForm={{ ...register("category_reference", { required: true }) }} />
                        </Col>
                        <Col md={12}>
                          <LabelInput className="mb-2 mt-4">Descrição do produto (opcional)</LabelInput>
                          <QuillEditor value={description} setValue={setDescription} />
                        </Col>
                      </Row>
                    </CardForm>
                  </div>
                  <div className="mt-5">
                    <CardForm>
                      <Row>
                        <Col md={6}>
                          <LabelInput className="mb-2">Preço</LabelInput>
                          <InputGroup>
                            <Button style={{ backgroundColor: "#EDF2F7", border: "0px", color: "black", fontSize: "13px" }}>R$</Button>
                            <FormControl {...register("product_price", { required: true })} type="number" />
                          </InputGroup>
                        </Col>
                        <Col md={6}>
                          <LabelInput className="mb-2">Preço com desconto</LabelInput>
                          <InputGroup>
                            <Button style={{ backgroundColor: "#EDF2F7", border: "0px", color: "black", fontSize: "13px" }}>R$</Button>
                            <FormControl {...register("product_price_discount", { required: false })} type="number" />
                          </InputGroup>
                        </Col>
                        <Col md={12}>
                          <LabelInput className="mb-2 mt-4">Remover do cliente após:</LabelInput>
                          <InputGroup>
                            <FormControl {...register("expire_day", { required: false })} />
                            <Button style={{ backgroundColor: "#EDF2F7", border: "0px", color: "black", fontSize: "13px" }}>Dias</Button>
                          </InputGroup>
                        </Col>
                      </Row>
                    </CardForm>
                  </div>
                  <div className="mt-5">
                    <CardForm>
                      <Row>
                        <Col md={12}>
                          <SelectGroup label="Selecione uma variável" type="select" onChange={(e:any)=>{handlerSelectVariable(e.target.value)}} options={[{ label: "Selecione uma opção", value: "" }, ...(variablesOptions|| [])]} />
                        </Col>
                        <Col md={12} className="mt-4">
                          <VariaveisTable variablesSelected={variablesSelected} onDelete={handlerRemoveVariable} />
                        </Col>
                      </Row>
                    </CardForm>
                  </div>
                </Col>
                <Col md={4} className="mt-2">
                  <CardForm>
                    <LabelInput className="mb-4">Imagem</LabelInput>
                    <FilePondUpload setImages={setImages} defaultFile={images} />
                  </CardForm>

                  <div className="mt-3">
                    <CardForm>
                      <SelectGroup label="Visibilidade" type="select" options={optionsVisibility} useForm={{ ...register("product_visibility", { required: true }) }} />
                    </CardForm>
                  </div>

                  <div className="mt-3">
                    <CardForm>
                      <Col md={12} className="mt-2">
                        <FormGroup type="number" label="Estoque do Produto" useForm={{ ...register("product_stock", { required: true }) }} />
                      </Col>
                    </CardForm>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="mt-5" style={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonTransparent onClick={handleModalClose}>Fechar</ButtonTransparent>
            <ButtonOrange type="submit" disabled={variablesSelected?.length == 0 ? true : false} onClick={handleModalClose}>Salvar</ButtonOrange>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
