import { Col, Row } from "react-bootstrap";

import HeroSection from "@/global/components/HeroSection";
import NavbarComponent from "@/global/components/navbar.component";
import { NotFoundList } from "@/global/components/NotFound-List";
import PaginationComponent from "@/global/components/pagination.component";
import { useState } from "react";
import { PostsActions } from "./actions/posts.actions";
import { ModalCreatePost } from "./components/modal-create-post.component";
import { NewsCardComponent } from "./components/news-card.component";

const BlogPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { posts, paginationFilter, handlePageChange } = PostsActions();
  return (
    <HeroSection>
      <NavbarComponent
        title="Gerenciar Blog"
        buttonText2="Criar uma nova postagem"
        buttonAction2={() => {
          handleShow();
        }}
      />
      <ModalCreatePost showModal={show} handleClose={handleClose} />
      
      <Row className="mt-5">
        {posts && posts.length > 0 ? (
          posts.map((item: any) => (
            <Col md={4} lg={3}>
              <NewsCardComponent post={item} />
            </Col>
          ))
        ) : (
          <NotFoundList title="Nenhum post disponível" />
        )}
      </Row>

      <div className="d-flex justify-content-center mt-5">
        <PaginationComponent
          paginationCount={paginationFilter?.paginationCount}
          hasMoreResults={paginationFilter?.hasMoreResults}
          onPageChange={handlePageChange}
        ></PaginationComponent>
      </div>
    </HeroSection>
  );
};

export default BlogPage;
