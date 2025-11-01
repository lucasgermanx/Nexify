import { Card } from "react-bootstrap";
import styled from "styled-components";

const CardFeaturedProduct = styled(Card)`
  background-color: transparent;
  border: 0px;
`;

export const FeaturedProducts = ({ children }: any) => {
  return (
    <>
      <CardFeaturedProduct>        
        {children}
      </CardFeaturedProduct>
    </>
  );
};
