import { Modal } from "react-bootstrap";


export const ModalDomain = ({ showModal, handleCloseModal }: any) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal} animation={true} className="fade">
            <Modal.Body>
                {/* <Form onSubmit={handleSubmit(onSubmit)}>
                    <Container>
                        <h5>Configurar Dominio</h5>
                        <Row>
                            <Col md={12}>
                                <div className="mt-4">
                                    <FormGroup label="Dominio" className="mt-5" useForm={{ ...register("store_domain", { required: true }) }} />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <div className="mt-5" style={{ display: "flex", justifyContent: "flex-end" }}>
                        <ButtonTransparent onClick={handleCloseModal}>Fechar</ButtonTransparent>
                        <ButtonOrange type="submit">Salvar</ButtonOrange>
                    </div>
                </Form> */}
            </Modal.Body>
        </Modal>
    );
};
