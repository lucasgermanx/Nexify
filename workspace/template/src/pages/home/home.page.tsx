import { Col, Container, Row } from "react-bootstrap";

import { HeaderComponent } from "@/core/client/components/header.component";
import { NewsCardComponent } from "@/core/client/components/new-card.component";
import { ProductCardComponent } from "@/core/client/components/product-card.component";
import ProgressBarComponent from "@/core/client/components/progress-bar.component";
import useBlog from "@/core/client/hooks/blog.hook";
import useProducts from "@/core/client/hooks/products.hook";
import Footer from "@/global/components/footer";
import { HiOutlineTag } from "react-icons/hi";
import styled from "styled-components";
import { CardCopyIPComponent } from "./components/card-copy-address-fivem.component";
import { DiscordWidgetComponent } from "./components/discord-widget.component";
import { FeaturedProducts } from "./components/FeaturedProducts";

const HomePageContainer = styled(Container)`
  margin-top: 5rem;
`;

const NoProductsOffer = styled.div`
  text-align: center;
`;

const HomePage = () => {
  const { posts } = useBlog();
  const { productsWithOffer } = useProducts();

  return (
    <>
      <ProgressBarComponent />
      <>
        <HeaderComponent />
        <HomePageContainer>
          <div>
            <div className="mt-5 mb-3">
              <h5 className="text-white fw-bold">Produtos em destaque</h5>
            </div>
            <section className="d-flex gap-4">
              <div className="col-md-9">
                <FeaturedProducts>
                  <Row>
                    {productsWithOffer?.length === 0 ? (
                      <NoProductsOffer>
                        <HiOutlineTag fontSize={30} />
                        <p>Não temos nenhum produto em oferta no momento</p>
                      </NoProductsOffer>
                    ) : (
                      productsWithOffer?.map((item, index) => (
                        <Col key={index} md={4}>
                          <ProductCardComponent item={item} />
                        </Col>
                      ))
                    )}
                  </Row>
                </FeaturedProducts>
                <div style={{ marginTop: "5%" }}>
                  <h5 className="text-white fw-bold">Últimas postagens realizadas</h5>
                  <Row className="mt-4">
                    {posts?.map((item) => (
                      <Col key={item.id} md={3}>
                        <NewsCardComponent post={item} />
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
              <div className="col-md-3 mt-2">
                <CardCopyIPComponent />
                <DiscordWidgetComponent />
              </div>
            </section>
          </div>
        </HomePageContainer>
      </>
      <Footer/>
    </>
  );
};

export default HomePage;
