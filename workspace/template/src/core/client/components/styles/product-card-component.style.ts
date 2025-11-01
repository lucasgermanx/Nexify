import { Badge, Button, Card } from "react-bootstrap";

import styled from "styled-components";

export const ProductCardContainer = styled(Card)`
  background-color: #0c0d11;
  border-radius: 10px;
  color: white;
`;

export const ProductTitle = styled.h4`
  text-align: center;
  font-weight: 700;
`;

export const ProductImage = styled.img`
  width: 70%;
`;

export const PriceContainer = styled.div`
  padding: 0px;
  margin: 0px;
`;

export const DiscountedPrice = styled.h5`
  color: orange;
  font-size: 28px;
  margin: 0px;
  padding: 0px;
  font-weight: 700;
`;

export const BuyButton = styled(Button)`
  font-weight: 600;
  border: 0px;
  height: 40px;
  margin-right: 10px;
  background-color: #147D3C;
  color: white;
  width: 80%;
  &:hover {
    background-color: #ea9502;
    color: white;
  }

  &:active {
    background-color: #ea9502 !important;
    color: white;
  }
`;

export const EmptyButton = styled(Button)`
  font-weight: 600;
  border: 0px;
  height: 40px;
  background-color: #f2f2f2;
  color: black;
  &:hover {
    background-color: #ea9502;
    color: white;
  }
  &:active {
    background-color: #ea9502 !important;
    color: white;
  }
`;

export const ProductImageWrapper = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

export const PriceWrapper = styled.div`
  margin-top: 1.5rem;
`;

export const ModalButtonsWrapper = styled.div`
  margin-top: 1.5rem;
`;

export const GoToProduct = styled(Button)`
  border: 0px;
  color: white;
  background-color: orange;
  height: 40px;
  border-radius: 25px;
  font-size: 13px;
  &:hover {
    background-color: #ea9502;
    color: white;
  }

  &:active {
    background-color: #ea9502 !important;
    color: white;
  }
`;

export const BadgeOrange = styled(Badge)`
    background-color:orange !important;
    color:white;
`