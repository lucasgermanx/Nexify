import { Button, Col, Form, Row } from "react-bootstrap";
import { TemplateSEOHandler, TemplateWidgetHandler } from "./actions/content-update-data";

import { useManageStore } from "@/core/client/hooks/select-store-zuustand";
import { useStore } from "@/core/client/providers/store/store.provider";
import CardForm from "@/global/components/card-form.component";
import FileUpload from "@/global/components/file-upload-button.component";
import FormGroup from "@/global/components/form-group.component";
import { QuillEditor } from "@/global/components/QuillEditor";
import React from "react";
import styled from "styled-components";
import { TemplateFileHandler } from "./actions/files-update.actions";

const LabelInput = styled.label`
    font-size: 14px;
`;

const TemplatePage = () => {
  const { setSelectedFiles, setType } = TemplateFileHandler();
  const { register, handleSubmit, setDescription, description, setValue } = TemplateSEOHandler()
  const { widget_register, widgetSubmit } = TemplateWidgetHandler()
  const { store, stores, ProviderGetSelectedStore } = useStore()
  const { store_reference } = useManageStore()

  React.useEffect(() => {
    ProviderGetSelectedStore(store_reference)
    if (store) {
      setValue("title", store?.contents?.[0].title)
      setValue("widget_discord", store?.contents?.[0]?.widget_discord)
      setValue("widget_fiveM", store?.contents?.[0]?.widget_fiveM)
      setDescription(`${store?.contents?.[0]?.description}`)
    }
  }, [stores, store_reference, store])

  return (
    <>
      <div className="mt-5">
        <Row>
          <Col md={4}>
            <CardForm>
              <div className="d-flex justify-content-start">
                <div>
                  <img width={60} height={60} src={store?.contents?.[0].logo ? 'data:image/png;base64,' + store?.contents?.[0].logo : "https://placehold.co/60x60"} alt="logo-store" />
                </div>
                <div style={{ paddingLeft: "2%" }}>
                  <h5 className="pt-2 p-0 m-0">Alterar logo</h5>
                  <p style={{ fontSize: "13px" }} className="p-0">
                    Faça upload de uma logo para o seu site
                  </p>
                </div>
              </div>
              <div className="mt-3 d-flex">
                <FileUpload
                  fileInput="logo"
                  setSelectedFile={setSelectedFiles}
                  setType={setType} />
              </div>
            </CardForm>
          </Col>
          <Col md={4}>
            <CardForm>
              <div className="d-flex justify-content-start">
                <div>
                  <img width={60} height={60} src={store?.contents?.[0].banner ? 'data:image/png;base64,' + store?.contents?.[0].banner : "https://placehold.co/1200x720"} alt="banner-store" />
                </div>
                <div style={{ paddingLeft: "2%" }}>
                  <h5 className="pt-2 p-0 m-0">Alterar banner</h5>
                  <p style={{ fontSize: "13px" }} className="p-0">
                    Faça upload de um banner para o seu site
                  </p>
                </div>
              </div>
              <div className="mt-3 d-flex">
                <FileUpload
                  fileInput="banner"
                  setSelectedFile={setSelectedFiles}
                  setType={setType} />
              </div>
            </CardForm>
          </Col>
          <Col md={4}>
            <CardForm>
              <div className="d-flex justify-content-start">
                <div>
                  <img width={60} height={60} src={store?.contents?.[0].favicon ? 'data:image/png;base64,' + store?.contents?.[0].favicon : "https://placehold.co/60x60"} alt="" />
                </div>
                <div style={{ paddingLeft: "2%" }}>
                  <h5 className="pt-2 p-0 m-0">Alterar favicon</h5>
                  <p style={{ fontSize: "13px" }} className="p-0">
                    Faça upload de um favicon para o seu site
                  </p>
                </div>
              </div>
              <div className="mt-3 d-flex">
                <FileUpload
                  fileInput="favicon"
                  setSelectedFile={setSelectedFiles}
                  setType={setType} />
              </div>
            </CardForm>
          </Col>
        </Row>
      </div>
      <div className="mt-5">
        <Col md={12}>
          <CardForm>
            <div className="d-flex justify-content-between">
              <div>
                <div className="d-flex justify-content-start">
                  <div style={{ width: "120px", height: "120px", backgroundColor: "orange", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <span style={{ textAlign: "center", color: "white", fontSize: "22px", fontWeight: "bold" }}>IDE</span>
                  </div>
                  <div style={{ paddingLeft: "2%", paddingTop: "2%" }}>
                    <h4 className="pt-4 p-0 m-0">Editor Template</h4>
                    <p style={{ fontSize: "13px" }} className="p-0">
                      Edite o template da sua loja direto no código
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <Button style={{ backgroundColor: "#303030", fontWeight: "600", border: "0px" }}>Desabilitado no momento</Button>
              </div>
            </div>
          </CardForm>
        </Col>
      </div>
      <div className="mt-5">
        <Row>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <CardForm>
                <h4 className="mt-0 p-0" style={{ fontWeight: "600" }}>Customização de SEO</h4>
                <p className="mt-0 p-0" style={{ fontSize: "13px" }}>Melhore o rankeamento ainda mais da sua loja on-line. Mas fique tranquilo, nós já deixamos bem otimizado.</p>
                <div className="mt-4">
                  <FormGroup label="Titulo do site" useForm={{ ...register("title", { required: true }) }}></FormGroup>
                </div>
                <div className="mt-4">
                  <LabelInput className="mb-2">Descrição do site</LabelInput>
                  <QuillEditor value={description} setValue={setDescription}></QuillEditor>
                </div>
                <div className="mt-5 d-flex justify-content-end">
                  <Button style={{ backgroundColor: "#303030", fontWeight: "600", border: "0px" }} type="submit">Realizar alterações</Button>
                </div>
              </CardForm>
            </Form>
          </Col>
          <Col md={6}>
            <CardForm>
              <Form onSubmit={widgetSubmit}>
                <h4 className="mt-0 p-0" style={{ fontWeight: "600" }}>Configuração de Widgets</h4>
                <p className="mt-0 p-0" style={{ fontSize: "13px" }}>Melhore o rankeamento ainda mais da sua loja on-line. Mas fique tranquilo, nós já deixamos bem otimizado.</p>
                <div className="mt-4">
                  <FormGroup label="ID (Discord)" useForm={{ ...widget_register("widget_discord", { required: true }) }}></FormGroup>
                  <span style={{ fontSize: "12px", color: "red" }}>Se nenhum widget for informado, ele será desativado.</span>
                </div>
                <div className="mt-4">
                  <FormGroup label="IP (Servidor FiveM)" useForm={{ ...widget_register("widget_fiveM", { required: true }) }}></FormGroup>
                  <span style={{ fontSize: "12px", color: "red" }}>Se nenhum widget for informado, ele será desativado.</span>
                </div>
                <div className="mt-5 d-flex justify-content-end">
                  <Button style={{ backgroundColor: "#303030", fontWeight: "600", border: "0px" }} type="submit">Realizar alterações</Button>
                </div>
              </Form>
            </CardForm>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TemplatePage;
