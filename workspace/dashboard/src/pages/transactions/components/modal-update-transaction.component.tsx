import { ButtonOrange, ButtonTransparent } from "@/assets/Style/GlobalStyle";
import { Col, Container, Modal, Row } from "react-bootstrap";
import {
  TransactionUpdateAction
} from "../actions/modal-update-transaction.action";

import SelectGroup from "@/global/components/select-group.component";
import React from "react";
import { Form } from "react-router-dom";


export const ModalUpdateTransaction = ({showModal, handleCloseModal, transactions}: any) => {
  const { register, handleSubmit, onSubmit, setValue } = TransactionUpdateAction();

  React.useEffect(()=>{
    setValue("id", transactions?.id)
  },[])

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
            <h5>Editar transação: {transactions?.transaction_reference}</h5>
            <Row>
              <Col md={12}>
                <div className="mt-4">
                  <SelectGroup
                    label="Status de Pagamento"
                    options={[
                      {
                        label: "Aprovado",
                        value: "approved",
                      },
                      {
                        label: "Em disputa",
                        value: "in_mediation",
                      },
                      {
                        label: "Reembolsado",
                        value: "refunded",
                      },
                      {
                        label: "Chargeback",
                        value: "charged_back",
                      },
                      {
                        label: "Cancelado",
                        value: "cancelled",
                      },
                    ]}
                    className="mt-5"
                    useForm={{
                      ...register("status_payment", { required: true }),
                    }}
                  />
                </div>
              </Col>
              <Col md={12}>
                <div className="mt-4">
                <SelectGroup
                    label="Permitir atualização automatica"
                    options={[
                      {
                        label: "Sim",
                        value: true,
                      },
                      {
                        label: "Não",
                        value: false,
                      },
                    ]}
                    className="mt-5"
                    useForm={{
                      ...register("automatic_update", { required: true }),
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
          <div
            className="mt-5"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <ButtonTransparent onClick={handleCloseModal}>
              Fechar
            </ButtonTransparent>
            <ButtonOrange type="submit">Salvar</ButtonOrange>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
