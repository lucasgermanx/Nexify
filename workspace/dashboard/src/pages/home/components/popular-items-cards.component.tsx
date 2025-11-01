import { Card, Row, Col } from "react-bootstrap";
import { useProducts } from "@/core/client/providers/products/products.provider";
import { useCoupon } from "@/core/client/providers/coupons/coupons.provider";
import styled from "styled-components";
import { HiOutlineTag, HiOutlineShoppingBag } from "react-icons/hi";

const PopularCard = styled(Card)`
  background-color: #121212;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  margin-top: 0;
  
  .card-header {
    padding: 12px 16px;
    background-color: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    
    h5 {
      color: white;
      font-weight: 600;
      margin: 0 0 2px 0;
      font-size: 0.875rem;
    }
    
    .subtitle {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.7rem;
      margin: 0;
    }
  }
  
  .empty-state {
    padding: 24px 16px;
    text-align: center;
    
    .empty-icon {
      font-size: 32px;
      color: rgba(255, 255, 255, 0.2);
      margin-bottom: 8px;
    }
    
    .empty-text {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.75rem;
    }
  }
`;

const PopularPackagesCard = () => {
  const { products } = useProducts();
  
  // Pegar produtos mais vendidos (ordenar por algum critério, exemplo: mais transações)
  const popularProducts = products?.slice(0, 3) || [];

  return (
    <PopularCard>
      <div className="card-header">
        <h5>Pacotes populares</h5>
        <p className="subtitle">Este mês</p>
      </div>
      <Card.Body>
        {popularProducts.length > 0 ? (
          <div>
            {popularProducts.map((product: any, index: number) => (
              <div 
                key={product.id || index}
                style={{
                  padding: '12px',
                  marginBottom: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: 'white', margin: 0, fontSize: '0.875rem', fontWeight: '500' }}>
                      {product.product_name}
                    </p>
                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '4px 0 0 0', fontSize: '0.75rem' }}>
                      {product.product_price ? `R$ ${parseFloat(product.product_price).toFixed(2)}` : 'Sem preço'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <HiOutlineShoppingBag className="empty-icon" />
            <p className="empty-text">
              Nenhum pacote encontrado. Os dados aparecerão aqui quando você começar a vender!
            </p>
          </div>
        )}
      </Card.Body>
    </PopularCard>
  );
};

const PopularDiscountsCard = () => {
  const { coupons } = useCoupon();
  
  // Pegar cupons mais usados
  const popularCoupons = coupons?.slice(0, 3) || [];

  return (
    <PopularCard>
      <div className="card-header">
        <h5>Descontos populares</h5>
        <p className="subtitle">Este mês</p>
      </div>
      <Card.Body>
        {popularCoupons.length > 0 ? (
          <div>
            {popularCoupons.map((coupon: any, index: number) => (
              <div 
                key={coupon.id || index}
                style={{
                  padding: '8px',
                  marginBottom: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: 'white', margin: 0, fontSize: '0.75rem', fontWeight: '500' }}>
                      {coupon.coupon_code}
                    </p>
                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '2px 0 0 0', fontSize: '0.7rem' }}>
                      {coupon.coupon_discount_percentage ? `${coupon.coupon_discount_percentage}% OFF` : 'Desconto disponível'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <HiOutlineTag className="empty-icon" />
            <p className="empty-text">
              Nenhum desconto encontrado. Os dados aparecerão aqui quando você começar a vender!
            </p>
          </div>
        )}
      </Card.Body>
    </PopularCard>
  );
};

export { PopularPackagesCard, PopularDiscountsCard };

