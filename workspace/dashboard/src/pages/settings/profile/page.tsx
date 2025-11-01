import { Col, Form, Row } from "react-bootstrap";
import { ModalUpdatePasswordAction, ProfileHandler } from "./actions/profile.action";

import { ButtonOrange } from "@/assets/Style/GlobalStyle";
import CardForm from "@/global/components/card-form.component";
import FormGroup from "@/global/components/form-group.component";
import React from "react";
import { ModalUpdatePasswordComponent } from "./components/modal-update-password.component";
import { useAuth } from "@/core/client/providers/auth/auth.provider";

export const ProfilePage = () => {
  const { register, handleSubmit, onSubmit, setValue } = ProfileHandler()
  const { showModalUpdateAction, closeModalUpdateAction, showModalUpdatePassword } = ModalUpdatePasswordAction()
  const { user } = useAuth();

  React.useEffect(() => {
    setValue("user_reference", user?.user_reference)
    setValue("name", user?.name)
    setValue("phone", user?.phone || '')
    setValue("user_discord", user?.user_discord)
    setValue("email", user?.email)
  }, [user])

  return (
    <>
      <section style={{ marginTop: '0' }}>
        <div>
          <Col md={12}>
            <CardForm>
              <div style={{ padding: "24px" }}>
                <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '8px', padding: 0, margin: '0 0 8px 0' }}>
                  Configurações básicas do seu usuário
                </h4>
                <small style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Personalize os dados do seu perfil</small>
                <section>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="mt-5">
                      <Col md={12}>
                        <FormGroup
                          label="Nome"
                          placeholder="Nome completo"
                          useForm={{ ...register("name", { required: true }) }}
                        />
                      </Col>
                      <Col md={12} className="mt-3">
                        <FormGroup
                          label="Telefone"
                          placeholder="Telefone"
                          useForm={{ ...register("phone", { required: true }) }}
                        />
                      </Col>
                      <Col md={12} className="mt-3">
                        <FormGroup
                          label="Discord"
                          placeholder="Discord"
                          useForm={{ ...register("user_discord", { required: true }) }}
                        />
                      </Col>
                      <Col md={12} className="mt-4">
                        <FormGroup
                          label="Email"
                          placeholder="Email"
                          useForm={{ ...register("email", { required: true }) }}
                        />
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                      <ButtonOrange
                        style={{ height: "40px", fontWeight: '600' }}
                        type="submit"
                      >
                        Alterar dados
                      </ButtonOrange>
                    </div>
                  </Form>
                  <Row className="mt-4">
                    <Col md={8} className="mt-5">
                      <p style={{ color: 'white', fontWeight: '500', margin: 0 }}>Alterar minha senha</p>
                      <small style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        Utilize o botão ao lado para atualizar a senha da sua
                        conta
                      </small>
                    </Col>
                    <Col md={4} className="mt-5">
                      <ButtonOrange
                        style={{
                          height: "40px",
                          width: "100%",
                          fontWeight: '600',
                        }}
                        onClick={showModalUpdateAction}
                      >
                        Alterar senha
                      </ButtonOrange>
                    </Col>
                  </Row>
                </section>
              </div>
            </CardForm>
          </Col>
        </div>
      </section>
      <ModalUpdatePasswordComponent showModal={showModalUpdatePassword} handleCloseModal={closeModalUpdateAction} />
    </>
  );
};
