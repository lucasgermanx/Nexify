import { Badge, Button, Col, Container, Row } from "react-bootstrap";

import { HeaderComponent } from "@/core/client/components/header.component";
import { NewsCardComponent } from "@/core/client/components/new-card.component";
import PaginationComponent from "@/core/client/components/pagination.component";
import ReadingTime from "@/core/client/utils/reading-time.utils";
import Footer from "@/global/components/footer";
import { Buffer } from "buffer";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { blogAction } from "./actions/blog.action";

const NewsCardContainer = styled.div`
  img {
    border-radius: 10px;
    width: 100%;
  }
`;

const ReadingTimeBadge = styled(Badge)`
  color: #040c56;
  background-color: #ffd987 !important;
  margin-top: 10px;
`;

const NewsTitle = styled.h4`
  color: white;
  width: 100%;
`;

const NewsContent = styled.p`
  color: white;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
`;

const ButtonBlack = styled(Button)`
  background-color: #303030;
  color: white;
  border: 0px;
`;


const NewsText = styled.div`
  padding-left: 3%;
  width: 100%;
`;

export const Blog = () => {
  const { postsHome, uniquePost, handlePageChange, paginationFilter } =
    blogAction();

  return (
    <>
      <Container>
        <HeaderComponent />
      </Container>

      <div
        style={{ backgroundColor: "#0D0E10", height: "150px", color: "white" }}
        className="mt-4"
      >
        <Container>
          <div className="pt-5">
            <h3 className="m-0 p-0 fw-bold">Blog</h3>
            <p>
              Veja as ultimas noticias e fique por dentro dos acontecimentos do
              servidor!!
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="mt-5">
          <Col md={12}>
            {uniquePost?.map((post: any) => (
              <div className="d-flex justify-content-start">
                <section>
                  <NewsCardContainer>
                    <img
                      src={
                        "data:image/png;base64," +
                        Buffer.from(post?.post_image).toString("base64")
                      }
                      alt="blog-post"
                      className="w-100"
                    />
                  </NewsCardContainer>
                </section>
                <NewsText>
                  <div className="mt-1">
                    <ReadingTimeBadge>
                      {ReadingTime(
                        String(
                          post?.post_description == undefined
                            ? ""
                            : post?.post_description
                        )
                      )}
                    </ReadingTimeBadge>
                  </div>
                  <div className="mt-3">
                    <NewsTitle>{post?.post_title}</NewsTitle>
                    <NewsContent>
                      {parse(
                        String(
                          post?.post_description == undefined
                            ? ""
                            : post?.post_description.substring(0, 550) + "..."
                        )
                      )}
                    </NewsContent>
                    <div className="mt-3">
                      <Link to={`/post/${post?.post_reference}`}>
                        <ButtonBlack>Ler mais</ButtonBlack>
                      </Link>
                    </div>
                  </div>
                </NewsText>
              </div>
            ))}
          </Col>
        </div>
        <div style={{ marginTop: "5%" }}>
          <Row>
            {postsHome?.map((item: any) => (
              <Col key={item?.id} md={6} className="mt-5">
                <NewsCardComponent post={item} />
              </Col>
            ))}
          </Row>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <PaginationComponent
            paginationCount={paginationFilter?.paginationCount}
            hasMoreResults={paginationFilter?.hasMoreResults}
            onPageChange={handlePageChange}
          ></PaginationComponent>
        </div>
      </Container>
      <Footer />
    </>
  );
};
