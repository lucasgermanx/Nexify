import { useEffect } from "react";
import { Col, Modal, Row } from "react-bootstrap";

import { ButtonGreen } from "@/assets/Style/GlobalStyle";
import { base64toFile } from "@/core/utils/convertBase64toImage";
import FilePondUpload from "@/global/components/file-pond-upload.component";
import FormGroup from "@/global/components/form-group.component";
import { QuillEditor } from "@/global/components/QuillEditor";
import { Buffer } from 'buffer';
import { Form } from "react-router-dom";
import { BlogUpdateHandler } from "../actions/post-update.actions";

export const ModalUpdatePost = ({ showModal, handleClose, post }: any) => {
    const { register, description, setDescription, handleSubmit, onSubmit, setImages, setValue, images } = BlogUpdateHandler()

    useEffect(() => {
        setValue('post_title', post?.post_title)
        setValue('post_reference', post?.post_reference)
        setImages(base64toFile(`data:image/png;base64, ${Buffer.from(post?.post_image).toString('base64')}`, 'image.png'))
        setDescription(post?.post_description)
    }, [])

    return (
        <>
            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Body>
                    <h5>Atualizar postagem</h5>
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
                                    <FilePondUpload setImages={setImages} defaultFile={images} />
                                </Col>
                            </Row>
                            <br />
                            <ButtonGreen onClick={handleClose} type="submit" className="mt-5" style={{ float: "right" }}>
                                Atualizar postagem
                            </ButtonGreen>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};
