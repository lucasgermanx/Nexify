import { ButtonOrange, ButtonTransparent } from "@/assets/Style/GlobalStyle";
import { useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";

import { base64toFile } from "@/core/utils/convertBase64toImage";
import CardForm from "@/global/components/card-form.component";
import FilePondUpload from "@/global/components/file-pond-upload.component";
import FormGroup from "@/global/components/form-group.component";
import { QuillEditor } from "@/global/components/QuillEditor";
import SelectGroup from "@/global/components/select-group.component";
import { Buffer } from "buffer";
import styled from "styled-components";
import { ProductsUpdateHandler } from "../actions/products-actions";
import VariaveisTable from "./variables-table.component";

export const ModalProductUpdate = ({showModal, handleModalClose, category, product}: any) => {
  const LabelInput = styled.label`
    font-size: 14px;
  `;

  const categoryOptions = [
    {
      label: category.category,
      value: category.category_reference,
    },
  ];

  const optionsVisibility = [
    {
      label: "Publico",
      value: "public",
    },
    {
      label: "Interno",
      value: "intern",
    },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    setImages,
    setDescription,
    images,
    handlerSelectVariable,
    variablesOptions,
    handlerRemoveVariable,
    variablesSelected
  } = ProductsUpdateHandler();

  useEffect(() => {
    setValue("product_reference", product.product_reference);
    setValue("product_name", product.product_name);
    setValue("product_price", product.product_price);
    setValue("product_price_discount", product.product_price_discount);
    setValue("expire_day", product.expire_day);
    setValue("product_visibility", product.product_visibility);
    setValue("product_stock", product.product_stock);
    setValue("variables", product.variables);
    setImages(base64toFile(`data:image/png;base64, ${Buffer.from(product?.product_image).toString('base64')}`, 'image.png'))
    setDescription(product?.product_description)
  }, [category, product]);

  return (
    <Modal
      show={showModal}
      onHide={handleModalClose}
      animation={true}
      className="fade"
      size="xl"
    >
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Container>
            <h5>Atualizar produto: {product?.product_name}</h5>
            <div className="mt-4">
              <Row>
                <Col md={8}>
                  <div className="mt-2">
                    <CardForm>
                      <Row>
                        <Col md={6}>
                          <FormGroup
                            label="Nome do produto"
                            useForm={{
                              ...register("product_name", { required: true }),
                            }}
                          />
                        </Col>
                        <Col md={6} className="mt-2">
                          <SelectGroup
                            label="Categoria"
                            options={categoryOptions}
                            useForm={{
                              ...register("category_reference", { required: true }),
                            }}
                          />
                        </Col>
                        <Col md={12}>
                          <LabelInput className="mb-2 mt-4">
                            Descrição do produto
                          </LabelInput>
                          <QuillEditor
                            value={product?.product_description}
                            setValue={setDescription}
                          />
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
                            <Button
                              style={{
                                backgroundColor: "#EDF2F7",
                                border: "0px",
                                color: "black",
                                fontSize: "13px",
                              }}
                            >
                              R$
                            </Button>
                            <FormControl
                              {...register("product_price", { required: true })}
                            />
                          </InputGroup>
                        </Col>
                        <Col md={6}>
                          <LabelInput className="mb-2">
                            Preço com desconto
                          </LabelInput>
                          <InputGroup>
                            <Button
                              style={{
                                backgroundColor: "#EDF2F7",
                                border: "0px",
                                color: "black",
                                fontSize: "13px",
                              }}
                            >
                              R$
                            </Button>
                            <FormControl
                              {...register("product_price_discount", {
                                required: false,
                              })}
                            />
                          </InputGroup>
                        </Col>
                        <Col md={12}>
                          <LabelInput className="mb-2 mt-4">
                            Remover do cliente após:
                          </LabelInput>
                          <InputGroup>
                            <FormControl
                              {...register("expire_day", { required: false })}
                            />
                            <Button
                              style={{
                                backgroundColor: "#EDF2F7",
                                border: "0px",
                                color: "black",
                                fontSize: "13px",
                              }}
                            >
                              Dias
                            </Button>
                          </InputGroup>
                        </Col>
                      </Row>
                    </CardForm>
                  </div>
                  <div className="mt-5">
                    <CardForm>
                      <Row>
                        <Col md={12}>
                          <SelectGroup
                            label="Selecione uma variável (opcional)"
                            type="select"
                            onChange={(e:any)=>{handlerSelectVariable(e.target.value)}}
                            options={[
                              { label: "Selecione uma opção", value: "" },
                              ...(variablesOptions || []),
                            ]}
                          />
                        </Col>
                        <Col md={12} className="mt-4">
                          <VariaveisTable
                            variablesSelected={variablesSelected}
                            onDelete={handlerRemoveVariable}
                          />
                        </Col>
                      </Row>
                    </CardForm>
                  </div>
                </Col>
                <Col md={4} className="mt-2">
                  <CardForm>
                    <LabelInput className="mb-4">Imagem</LabelInput>
                    <FilePondUpload setImages={setImages} defaultFile={images}/>
                  </CardForm>
                  <Col md={12}>
                      <div className="mt-3">
                        <CardForm>
                          <SelectGroup
                            label="Visibilidade"
                            type="select"
                            options={optionsVisibility}
                            useForm={{
                              ...register("product_visibility", {
                                required: true,
                              }),
                            }}
                          />
                        </CardForm>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="mt-3">
                        <CardForm>
                          <Col md={12}>
                            <FormGroup
                              label="Estoque do Produto"
                              type="number"
                              useForm={{
                                ...register("product_stock", {
                                  required: true,
                                }),
                              }}
                            />
                          </Col>
                        </CardForm>
                      </div>
                    </Col>
                </Col>
              </Row>
            </div>
          </Container>
          <div
            className="mt-5"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <ButtonTransparent onClick={handleModalClose}>
              Fechar
            </ButtonTransparent>
            <ButtonOrange type="submit" onClick={handleModalClose}>Salvar</ButtonOrange>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
