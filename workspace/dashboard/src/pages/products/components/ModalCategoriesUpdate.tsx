import { ButtonOrange, ButtonTransparent } from "@/assets/Style/GlobalStyle";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";

import FormGroup from "@/global/components/form-group.component";
import React from "react";
import { CategoriesUpdateHandler } from "../actions/CategoriesHandler";

export const ModalCategoriesUpdate = ({category, showModal, handleModalClose}:any) => {
    const {register, handleSubmit, onSubmit, setValue} = CategoriesUpdateHandler()
    
    React.useEffect(() => {
        setValue("category_reference", category.category_reference)
        setValue("category", category.category)
        setValue("category_slug", category.category_slug)
        setValue("category_icon", category.category_icon)
    }, [category])

    return (
        <>
            <Modal 
                show={showModal} 
                onHide={handleModalClose} 
                animation={true} 
                className="fade"
                centered
            >
                <Modal.Body style={{ backgroundColor: '#121212', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Container>
                            <h5 style={{ color: 'white', fontWeight: '600', marginBottom: '24px' }}>
                                Atualizar categoria
                            </h5>
                            <Row>
                                <Col md={6}>
                                    <div className="mt-4">
                                        <FormGroup label="Nome da categoria" className="mt-5" placeholder="Ex: vips" useForm={{ ...register("category", { required: true }) }} />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="mt-4">
                                        <FormGroup label="Slug da categoria" className="mt-5" placeholder="Ex: vips" useForm={{ ...register("category_slug", { required: true }) }} />
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="mt-4">
                                        <FormGroup label="Icone da categoria" className="mt-5" placeholder="Ex: vips" useForm={{ ...register("category_icon", { required: true }) }} />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <div className="mt-5" style={{ display: "flex", justifyContent: "flex-end", gap: '12px' }}>
                            <ButtonTransparent onClick={handleModalClose}>Fechar</ButtonTransparent>
                            <ButtonOrange type="submit">Salvar</ButtonOrange>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};
