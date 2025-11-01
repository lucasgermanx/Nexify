import { Button, Card } from "react-bootstrap";

import { useProducts } from "@/core/client/providers/products/products.provider";
import { formatReal } from "@/core/utils/format-to-real.utils";
import { Buffer } from "buffer";
import { MdDeleteOutline } from "react-icons/md";
import styled from "styled-components";
import { ProductsModalUpdateHandler } from "../actions/products-actions";
import { ModalProductUpdate } from "./modal-product-update.component";

const ProductCardContainer = styled(Card)`
  background-color: white;
  margin-top:5%;
  border: 0px;
  border-radius:10px;
`;

const ProductTitle = styled.h4`
  text-align: center;
  font-weight: 700;
`;

const ProductImage = styled.img`
  width: 70%;
`;

const PriceContainer = styled.div`
  padding: 0px;
  margin: 0px;
`;

const DiscountedPrice = styled.h5`
  color: orange;
  font-size: 28px;
  margin: 0px;
  padding: 0px;
  font-weight:700;
`;

const BuyButton = styled(Button)`
  font-weight: 600;
  border: 0px;
  height: 40px;
  margin-right: 10px;
  width:80%;
`;

const EmptyButton = styled(Button)`
  font-weight: 600;
  border: 0px;
  height: 40px;
`;

export const ProductCardComponent = ({ product, category }: any) => {
  const {ProviderDeleteProduct} = useProducts()
  const {showModalUpdateProducts, handleCloseModalUpdateProducts, handleShowModalUpdateProducts} = ProductsModalUpdateHandler()
  return (
    <ProductCardContainer>
      <Card.Body style={{ border: "1px solid #ccc", borderRadius: "10px" }}>
        <ProductTitle>{product?.product_name}</ProductTitle>
        <div className="mt-2">
          <center>
            <ProductImage
              src={'data:image/png;base64,'+Buffer.from(product?.product_image).toString('base64')}
              alt=""
              style={{ borderRadius: "10px" }}
            />
          </center>
        </div>
        <div className="mt-3">
          {product?.product_price_discount != 0 ? (
            <>
              <PriceContainer>
                <p className="p-0 m-0" style={{fontWeight:"700"}}>de {formatReal(product?.product_price)} <br /> por apenas:</p>
                <DiscountedPrice>{formatReal(product?.product_price_discount)}</DiscountedPrice>
              </PriceContainer>
            </>
          ) : (
            <PriceContainer>
              <DiscountedPrice>{formatReal(product?.product_price)}</DiscountedPrice>
            </PriceContainer>
          )}
        </div>
        <div className="mt-4">
          <BuyButton onClick={handleShowModalUpdateProducts} style={{ backgroundColor: "#438c12", color: "white" }}>
            Editar
          </BuyButton>
          <EmptyButton onClick={(()=>{ProviderDeleteProduct(product.product_reference)})} style={{ backgroundColor: "red", color: "white" }}>
            <MdDeleteOutline />
          </EmptyButton>
        </div>
      </Card.Body>
      <ModalProductUpdate showModal={showModalUpdateProducts} handleModalClose={handleCloseModalUpdateProducts} category={category} product={product}/>
    </ProductCardContainer>
  );
};
