import { Button, Card } from "react-bootstrap";

import { useProducts } from "@/core/client/providers/products/products.provider";
import { formatReal } from "@/core/utils/format-to-real.utils";
import { Buffer } from "buffer";
import { MdDeleteOutline } from "react-icons/md";
import { BsBoxSeam, BsCurrencyDollar, BsClock } from "react-icons/bs";
import { HiOutlineTag } from "react-icons/hi";
import styled from "styled-components";
import { ProductsModalUpdateHandler } from "../actions/products-actions";
import { ModalProductUpdate } from "./modal-product-update.component";

const ProductCardContainer = styled(Card)`
  background-color: #121212;
  margin-top: 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgba(255, 140, 0, 0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.8), 0 8px 16px rgba(255, 140, 0, 0.3);
    border-color: rgba(255, 140, 0, 0.4);
    
    &::before {
      opacity: 1;
      background: linear-gradient(90deg, transparent, #ff8c00, transparent);
    }
  }
`;

const ProductHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const ImageContainer = styled.div`
  width: 80px;
  height: 80px;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.1) 0%, rgba(255, 165, 0, 0.05) 100%);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProductTitle = styled.h6`
  font-weight: 700;
  color: white;
  font-size: 1rem;
  margin: 0 0 8px 0;
  line-height: 1.4;
  word-break: break-word;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 140, 0, 0.2);
  }
`;

const InfoIcon = styled.span`
  color: #ff8c00;
  font-size: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const InfoContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const InfoLabel = styled.div`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
  font-weight: 500;
`;

const InfoValue = styled.div`
  font-size: 0.875rem;
  color: white;
  font-weight: 600;
  word-break: break-word;
`;

const PriceSection = styled.div`
  padding: 12px;
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.08) 0%, rgba(255, 165, 0, 0.04) 100%);
  border-radius: 8px;
  border: 1px solid rgba(255, 140, 0, 0.15);
  margin-bottom: 16px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const PriceLabel = styled.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
`;

const PriceValue = styled.span`
  font-size: 0.9rem;
  color: white;
  font-weight: 600;
  
  &.discount {
    color: #ff8c00;
    font-weight: 700;
  }
  
  &.original {
    text-decoration: line-through;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.8rem;
  }
`;

const BuyButton = styled(Button)`
  font-weight: 600;
  border: 0px;
  height: 40px;
  margin-right: 8px;
  flex: 1;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(67, 140, 18, 0.4);
  }
`;

const EmptyButton = styled(Button)`
  font-weight: 600;
  border: 0px;
  height: 40px;
  width: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  }
`;

export const ProductCardComponent = ({ product, category }: any) => {
  const { ProviderDeleteProduct } = useProducts()
  const { showModalUpdateProducts, handleCloseModalUpdateProducts, handleShowModalUpdateProducts } = ProductsModalUpdateHandler()
  return (
    <ProductCardContainer>
      <Card.Body style={{
        backgroundColor: '#121212',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between'
      }}>
        <div>
          <ProductHeader>
            <ImageContainer>
              <ProductImage
                src={'data:image/png;base64,' + Buffer.from(product?.product_image).toString('base64')}
                alt={product?.product_name}
              />
            </ImageContainer>
            <ProductInfo>
              <ProductTitle>{product?.product_name}</ProductTitle>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                {product?.product_visibility === 'public' ? (
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    color: '#22c55e',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    Público
                  </span>
                ) : (
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    Interno
                  </span>
                )}
              </div>
            </ProductInfo>
          </ProductHeader>

          <InfoGrid>
            <InfoItem>
              <InfoIcon>
                <BsBoxSeam />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Estoque</InfoLabel>
                <InfoValue>{product?.product_stock || 0} unidades</InfoValue>
              </InfoContent>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <BsCurrencyDollar />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Preço base</InfoLabel>
                <InfoValue>{formatReal(product?.product_price || 0)}</InfoValue>
              </InfoContent>
            </InfoItem>

            {product?.expire_day && product?.expire_day != '0' && (
              <InfoItem>
                <InfoIcon>
                  <BsClock />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Expira em</InfoLabel>
                  <InfoValue>{product?.expire_day} dias</InfoValue>
                </InfoContent>
              </InfoItem>
            )}

            {(() => {
              try {
                const variables = product?.variables;
                if (!variables || variables === '' || variables === '[]' || variables === 'null') {
                  return null;
                }

                let variablesArray: string[] = [];

                if (typeof variables === 'string') {
                  // Tentar fazer parse se começar com [ ou {
                  if (variables.trim().startsWith('[') || variables.trim().startsWith('{')) {
                    try {
                      const parsed = JSON.parse(variables);
                      variablesArray = Array.isArray(parsed) ? parsed : (parsed ? [parsed] : []);
                    } catch {
                      // Se falhar no parse, tratar como string separada por vírgula
                      variablesArray = variables.split(',').map((v: string) => v.trim()).filter((v: string) => v.length > 0);
                    }
                  } else {
                    // Se não começar com [ ou {, tratar como string separada por vírgula
                    variablesArray = variables.split(',').map((v: string) => v.trim()).filter((v: string) => v.length > 0);
                  }
                } else if (Array.isArray(variables)) {
                  variablesArray = variables;
                }

                return variablesArray.length > 0 ? (
                  <InfoItem>
                    <InfoIcon>
                      <HiOutlineTag />
                    </InfoIcon>
                    <InfoContent>
                      <InfoLabel>Variáveis</InfoLabel>
                      <InfoValue>{variablesArray.length}</InfoValue>
                    </InfoContent>
                  </InfoItem>
                ) : null;
              } catch (error) {
                // Em caso de erro, não mostrar o item de variáveis
                return null;
              }
            })()}
          </InfoGrid>

          {(product?.product_price_discount && product?.product_price_discount != '0') && (
            <PriceSection>
              <PriceRow>
                <PriceLabel>Preço original:</PriceLabel>
                <PriceValue className="original">{formatReal(product?.product_price || 0)}</PriceValue>
              </PriceRow>
              <PriceRow>
                <PriceLabel>Preço com desconto:</PriceLabel>
                <PriceValue className="discount">{formatReal(product?.product_price_discount || 0)}</PriceValue>
              </PriceRow>
            </PriceSection>
          )}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '8px',
          width: '100%',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <BuyButton onClick={handleShowModalUpdateProducts} style={{
            backgroundColor: "#22c55e",
            color: "white",
            flex: 1
          }}>
            Editar produto
          </BuyButton>
          <EmptyButton onClick={(() => { ProviderDeleteProduct(product.product_reference) })} style={{
            backgroundColor: "#ef4444",
            color: "white"
          }}>
            <MdDeleteOutline style={{ fontSize: '20px' }} />
          </EmptyButton>
        </div>
      </Card.Body>
      <ModalProductUpdate showModal={showModalUpdateProducts} handleModalClose={handleCloseModalUpdateProducts} category={category} product={product} />
    </ProductCardContainer>
  );
};
