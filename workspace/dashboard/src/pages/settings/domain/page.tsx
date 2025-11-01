import { ButtonOrange } from "@/assets/Style/GlobalStyle";
import { useManageStore } from "@/core/client/hooks/select-store-zuustand";
import CardForm from "@/global/components/card-form.component";
import FormGroup from "@/global/components/form-group.component";
import SelectGroup from "@/global/components/select-group.component";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { StoreAction } from "./actions/domain.action";
import { useStore } from "@/core/client/providers/store/store.provider";

export const DomainSettingsPage = () => {
  const { register, handleSubmit, onSubmit, setValue } = StoreAction();
  const { store, stores, ProviderGetSelectedStore } = useStore();
  const { store_reference } = useManageStore();

  React.useEffect(() => {
    ProviderGetSelectedStore(store_reference);
    setValue("store_name", store?.store_name);
    setValue("store_subdomain", store?.store_subdomain);
    setValue("store_domain", store?.store_domain);
    setValue("maintenance", store?.maintenance)
  }, [ProviderGetSelectedStore, setValue, store, store_reference, stores]);

  const options = [{
    label: "Em manutenção",
    value: true
  }, {
    label: "Disponível",
    value: false
  }]

  return (
    <section>
      <Col md={12}>
        <CardForm>
          <div style={{ padding: "24px" }}>
            <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '8px', padding: 0, margin: '0 0 8px 0' }}>Configurações básicas da sua loja</h4>
            <small style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Personalize os dados da sua loja</small>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mt-5">
                <Col md={12}>
                  <FormGroup label="Nome" placeholder="Nome da sua loja" useForm={{ ...register("store_name", { required: true }) }} />
                </Col>
                <Col md={12} className="mt-3">
                  <FormGroup label="Subdomínio" placeholder="Subdomínio" useForm={{ ...register("store_subdomain", { required: true }) }} />
                </Col>
                {store?.store_plan == "Enterprise" && (
                  <Col md={12} className="mt-3">
                    <FormGroup label="Domínio" placeholder="Domínio" />
                    <p style={{ fontSize: "13px", color: "#ff8c00", marginTop: '8px' }}>A função do domínio está atualmente em manutenção. Aguarde o retorno da equipe.</p>
                  </Col>
                )}
                <Col md={12} className="mt-3">
                  <SelectGroup label="Manutenção" placeholder="Selecione uma opção" options={options} useForm={{ ...register("maintenance", { required: false }) }} />
                </Col>
              </Row>
              <div className="d-flex justify-content-end mt-4">
                <ButtonOrange style={{ height: "40px", fontWeight: '600' }} type="submit">
                  Alterar dados
                </ButtonOrange>
              </div>
            </Form>
          </div>
        </CardForm>
      </Col>
    </section>
  );
};
