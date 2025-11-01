import { Col, Row } from "react-bootstrap";

import { FeaturedProducts } from "@/pages/home/components/FeaturedProducts";
import { HiOutlineTag } from "react-icons/hi";
import styled from "styled-components";
import useProducts from "../hooks/products.hook";
import { ProductCardComponent } from "./product-card.component";

const NoProductsOffer = styled.div`
  text-align: center;
`;

export const ProductsOffersComponent = () => {
  const {productsWithOffer} = useProducts();
  return (
    <>
      <div className="mt-5">
        <FeaturedProducts>
          <Row>
            {productsWithOffer?.length === 0 ? (
              <NoProductsOffer>
                <HiOutlineTag fontSize={30} />
                <p>Não temos nenhum produto em oferta no momento</p>
              </NoProductsOffer>
            ) : (
              productsWithOffer?.map((item: any, index: number) => (
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
