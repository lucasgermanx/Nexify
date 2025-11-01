import { Card, Col, Modal, Row } from "react-bootstrap";
import { BadgeOrange, BuyButton, EmptyButton, GoToProduct, ModalButtonsWrapper, PriceWrapper, ProductCardContainer, ProductImage, ProductImageWrapper, ProductTitle } from "./styles/product-card-component.style";
import { DiscountedPrice, PriceContainer } from "./styles/product-component.style";

import { formatReal } from "@/global/functions/FormatToReal";
import { Buffer } from "buffer";
import parse from "html-react-parser";
import { useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { MdShoppingBasket } from "react-icons/md";
import { Link } from "react-router-dom";

export const ProductCardComponent = ({ item }: any) => {
  const [showModalProduct, setShowModal] = useState(false);

  const handleCloseModalProduct = () => setShowModal(false);
  const handleShowModalProduct = () => setShowModal(true);

  return (
    <ProductCardContainer className="mt-2">
      <Card.Body>
        <ProductTitle>{item?.product_name}</ProductTitle>

        <ProductImageWrapper>
          <center>
            <ProductImage
              src={'data:image/png;base64,' + Buffer.from(item?.product_image).toString('base64')}
              alt=""
              className="responsive"
            />
          </center>
        </ProductImageWrapper>

        <PriceWrapper>
          <PriceContainer>
            {(item?.product_price_discount === "0" || item?.product_price_discount === "" || parseFloat(item?.product_price_discount) === 0) ? (
              <>
                <p className="p-0 m-0">
                  Preço do produto:
                </p>
                <DiscountedPrice>{formatReal(item?.product_price)}</DiscountedPrice>
              </>
            ) : (
              <>
                <p className="p-0 m-0">
                  de {formatReal(item?.product_price)} por apenas:
                </p>
                <DiscountedPrice>
                  {formatReal(item?.product_price_discount)}
                </DiscountedPrice>
              </>
            )}
          </PriceContainer>
        </PriceWrapper>
        <ModalButtonsWrapper>
          <Link to={`/product/${item?.product_reference}`}>
            <BuyButton>
              <MdShoppingBasket /> Comprar
            </BuyButton>
          </Link>
          <EmptyButton onClick={handleShowModalProduct}>
            <HiOutlineInformationCircle />
          </EmptyButton>
        </ModalButtonsWrapper>
      </Card.Body>

      <Modal show={showModalProduct} onHide={handleCloseModalProduct} centered >
        <Modal.Header style={{ border: "0px", backgroundColor: "#0c0d11", color: "white" }}>
          <h5 style={{ fontSize: "13px" }} className="mt-2">Detalhes do produto</h5>{" "}
          <BadgeOrange>{item?.product_name}</BadgeOrange>
        </Modal.Header>
        <Modal.Body style={{ border: "0px", backgroundColor: "#0c0d11", color: "white" }}>
          <Row>
            <Col md={4}>
              <ProductImage
                src={'data:image/png;base64,' + Buffer.from(item?.product_image).toString('base64')}
                alt=""
                className="w-100"
              />
            </Col>
            <Col md={8}>
              {item?.product_name}
              {parse(
                String(
                  item?.product_description == undefined
                    ? ""
                    : item?.product_description
                )
              )}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ border: "0px", backgroundColor: "#0c0d11", color: "white" }}>
          <Link to={`/product/${item?.product_reference}`}>
            <GoToProduct>Visualizar meu produto</GoToProduct>
          </Link>
        </Modal.Footer>
      </Modal>
    </ProductCardContainer>
  );
};
