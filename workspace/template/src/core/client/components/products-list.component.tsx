import { Col, Row } from "react-bootstrap";

import { FeaturedProducts } from "@/pages/home/components/FeaturedProducts";
import { HiOutlineTag } from "react-icons/hi";
import styled from "styled-components";
import { ProductCardComponent } from "./product-card.component";

const NoProductsOffer = styled.div`
  text-align: center;
`;

export const ProductsListComponent = ({products}:any) => {
  return (
    <>
      <div>
        <FeaturedProducts>
          <Row>
            {products?.length === 0 ? (
              <NoProductsOffer>
                <HiOutlineTag fontSize={30} color="white" />
                <p style={{color:"white"}}>Não temos nenhum produto em oferta no momento</p>
              </NoProductsOffer>
            ) : (
                products?.map((item: any, index: number) => (
                <Col key={index} md={3}>
                  <ProductCardComponent item={item} />
                </Col>
              ))
            )}
          </Row>
        </FeaturedProducts>
      </div>
    </>
  );
};
