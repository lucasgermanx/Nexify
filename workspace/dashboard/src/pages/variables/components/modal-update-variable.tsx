import { ButtonOrange, ButtonTransparent } from "@/assets/Style/GlobalStyle";
import { useEffect } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

import FormGroup from "@/global/components/form-group.component";
import SelectGroup from "@/global/components/select-group.component";
import { Form } from "react-router-dom";
import { VariableUpdateAction } from "../actions/variables-update.actions";

export const ModalUpdateVariable = ({ variable, showModal, handleCloseModal }: any) => {
  const { form, removeVariable, createVariables, setShowCommands, showCommands } = VariableUpdateAction();

  useEffect(() => {
    form.setValue('variable_reference', variable.variable_reference);
    form.setValue('variable', variable.variable);
    form.setValue('option_name', variable.option_name);
    form.setValue('quantity', variable.quantity);
  }, [variable]);

  useEffect(() => {
      setShowCommands(JSON.parse(variable.commands))
  }, [variable]);


  return (
    <Modal show={showModal} onHide={handleCloseModal} animation={true} className="fade">
      <Modal.Body>
        <Form onSubmit={form.handleSubmit}>
          <Container>
            <h5>Atualizando a variável....</h5>
            <Row>
              <Col md={12}>
                <div className="mt-4">
                  <FormGroup label="Referencia" className="mt-5" useForm={{ ...form.register("variable", { required: true }), }} />
                </div>
              </Col>

              <Col md={12}>
                <div className="mt-4">
                  <FormGroup label="Opção" className="mt-5" useForm={{ ...form.register("option_name", { required: true }), }} />
                </div>
              </Col>

              <Col md={12}>
                <div className="mt-2">
                  <FormGroup
                    type="number"
                    label="Quantidade"
                    placeholder="Quantas vezes o produto X será entregue de uma só vez"
                    useForm={{
                      ...form.register("quantity", { required: true }),
                    }}
                  />
                </div>
              </Col>

              <Col className="mt-3" md={12}>
                <p style={{ fontSize: "13px" }}>Adicione comandos a sua variável</p>
                <Row>
                <Col md={12}>
                    <div className="mt-2">
                    <SelectGroup
                        label="Comandos:"
                        options={
                          [{
                            label: "fivemarket:addMoney",
                            value: "fivemarket:addMoney"
                          },{
                            label: "fivemarket:removeMoney",
                            value: "fivemarket:removeMoney"
                          },
                          {
                            label: "fivemarket:addItem",
                            value: "fivemarket:addItem"
                          },
                          {
                            label: "fivemarket:removeItem",
                            value: "fivemarket:removeItem"
                          },
                          {
                            label: "fivemarket:addWarn",
                            value: "fivemarket:addWarn"
                          },
                          {
                            label: "fivemarket:removeWarn",
                            value: "fivemarket:removeWarn"
                          },
                          {
                            label: "fivemarket:addCar",
                            value: "fivemarket:addCar"
                          },
                          {
                            label: "fivemarket:addCarTemporary",
                            value: "fivemarket:addCarTemporary"
                          },
                          {
                            label: "fivemarket:removeCar",
                            value: "fivemarket:removeCar"
                          },
                          {
                            label: "fivemarket:addHouse",
                            value: "fivemarket:addHouse"
                          },
                          {
                            label: "fivemarket:addHouseTemporary",
                            value: "fivemarket:addHouseTemporary"
                          },
                          {
                            label: "fivemarket:removeHouse",
                            value: "fivemarket:removeHouse"
                          },
                          {
                            label: "fivemarket:addGroup",
                            value: "fivemarket:addGroup"
                          },
                          {
                            label: "fivemarket:removeGroup",
                            value: "fivemarket:removeGroup"
                          }]
                        }
                        useForm={{
                          ...form.register("command", { required: false }),
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mt-2">
                      <FormGroup
                        label="Argumento do comando"
                        className="mt-5"
                        useForm={{
                          ...form.register("command_value", { required: false }),
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="mt-2">
                      <SelectGroup
                        label="Executar de acordo com o status de pagamento:"
                        options={[
                          { label: "Aprovado", value: "approved" },
                          { label: "Em disputa", value: "in_mediation" },
                          { label: "Reembolsado", value: "refunded" },
                          { label: "Chargeback", value: "charged_back" }
                        ]}
                        useForm={{ ...form.register("status_payment", { required: false }), }}
                      />
                    </div>
                    <Col md={12} className="mt-3">
                      <ButtonOrange style={{ float: "right" }} onClick={() => createVariables()}>Adicionar</ButtonOrange>
                    </Col>
                    {showCommands?.length != 0 ? (<>
                      <div className="mt-5">
                      <p style={{ fontSize: "13px" }}>
                        Comandos registrados:
                      </p>
                      <Row>
                      {showCommands?.map((item: any) => (
                        <>
                        <Col md={2}>
                          <p className="m-0 p-0" style={{ fontSize: "13px", fontWeight: "700" }}>Status:</p>
                          <p className="m-0 p-0" style={{ fontSize: "13px" }}>{item.status_payment}</p>
                        </Col>
                        <Col md={4}>
                            <p className="m-0 p-0" style={{ fontSize: "13px", fontWeight: "700" }}>Comando:</p>
                            <p className="m-0 p-0" style={{ fontSize: "13px" }}>{item.command}</p>
                        </Col>
                        <Col md={3}>
                            <p className="m-0 p-0" style={{ fontSize: "13px", fontWeight: "700" }}>Argumento:</p>
                            <p className="m-0 p-0" style={{ fontSize: "13px" }}>{item.command_value}</p>
                        </Col>
                        <Col md={3}>
                          <Button style={{fontSize:"13px"}} variant="danger" onClick={() => removeVariable(item.id)}>Remover</Button>
                        </Col>
                        </>
                      ))}
                    </Row>
                    </div>
                    </>) : ""}
                  </Col>
                </Row>
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
