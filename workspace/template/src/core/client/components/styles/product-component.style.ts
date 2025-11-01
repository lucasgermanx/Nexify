import { Button } from "react-bootstrap";
import styled from "styled-components";

export const PriceContainer = styled.div`
  padding: 0px;
  margin: 0px;
`;

export const DiscountedPrice = styled.h5`
  font-size: 28px;
  margin: 0px;
  padding: 0px;
  font-weight: 700;
  color: orange;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 500px;
  border-radius: 5px;
`;

export const ProductName = styled.h3`
  font-weight: 700;
  margin: 0;
  padding: 0;
  margin-top: 20px;
  color: white;
`;

export const SellerInfo = styled.p`
  margin-top: 10px;
`;

export const VariationSelect = styled.div`
  margin-top: 20px;

  label {
    margin-bottom: 5px;
  }
`;

export const AddToCartButton = styled(Button)`
  border: 0px;
  color: white;
  background-color: orange;
  height: 40px;
  font-size: 14px;
  border-radius: 20px;
  &:hover {
    background-color: #ea9502;
    color: white;
  }
`;

export const ShareButton = styled(Button)`
  border: 0px;
  color: white;
  background-color: transparent;
  height: 45px;
  border-radius: 20px;
  font-size: 14px;
  &:hover {
    background-color: transparent;
    color: orange;
  }
`;

export const SupportButton = styled(Button)`
  border: 0px;
  color: white;
  background-color: orange;
  height: 35px;
  margin-top: 17%;
  font-size: 13px;
  border-radius: 50px;
  &:hover {
    background-color: #ea9502;
    color: white;
  }
`;