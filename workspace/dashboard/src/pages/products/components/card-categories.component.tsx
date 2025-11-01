import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Modal,
  Row,
} from "react-bootstrap";

import { ButtonGreen } from "@/assets/Style/GlobalStyle";
import { useCategory } from "@/core/client/providers/categories/categories.provider";
import { NotFoundList } from "@/global/components/NotFound-List";
import { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import styled from "styled-components";
import { CategoriesModalUpdateHandler } from "../actions/CategoriesHandler";
import { ModalCategoriesUpdate } from "./ModalCategoriesUpdate";
import { ProductCardComponent } from "./card-product.component";
import { ModalProductCreate } from "./modal-product-create.component";

const StyledCard = styled(Card)`
  border: 1px solid rgba(255, 255, 255, 0.05);
  background-color: #121212;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  margin-bottom: 2rem;
`;

const StyledHeader = styled(Card.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #121212;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px 24px;
  border-radius: 12px 12px 0 0;
`;

const StyledContent = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTitle = styled.h6`
  margin-top: 0.75rem;
  margin-right: 10px;
  color: white;
  font-weight: 600;
`;

const StyledBadgeContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

const StyledBadge = styled(Badge)`
  margin-right: 10px;
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StyledSlugBadge = styled(Badge)`
  background-color: rgba(255, 140, 0, 0.2) !important;
  color: #ff8c00;
  border: 1px solid rgba(255, 140, 0, 0.3);
`;

const TransparentDropdownButton = styled(DropdownButton)`
  &&& .dropdown-toggle {
    background-color: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
    font-size: 18px;
    
    &:hover {
      color: #ff8c00;
    }
  }
  float: right;
  padding-left: 10px;
  padding-top: 4px;
`;

const CategoryCard = ({ category }: any) => {
  const {showModalUpdateCategories,handleCloseModalUpdateCategories,handleShowModalUpdateCategories} = CategoriesModalUpdateHandler();
  const { ProviderDeleteCategory } = useCategory();
  const [show, setShow] = useState(false);
  const [showModalProductCreate, setShowModalProductCreate] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleModalProductCreateOpen = () => {
    setShowModalProductCreate(true);
  };

  const handleModalProductCreateClose = () => {
    setShowModalProductCreate(false);
  };

  return (
    <>
      <StyledCard>
        <StyledHeader>
          <StyledContent>
            <StyledTitle className="mt-2">{category?.category}</StyledTitle>
            <StyledBadgeContainer>
              <StyledBadge>ID:{category?.id}</StyledBadge>
              <StyledSlugBadge>SLUG: {category?.category_slug}</StyledSlugBadge>
            </StyledBadgeContainer>
          </StyledContent>
          <div>
            <ButtonGreen onClick={handleModalProductCreateOpen}>Novo produto</ButtonGreen>
            <TransparentDropdownButton title={<MdMoreVert />}>
              <Dropdown.Item onClick={handleShowModalUpdateCategories}>
                Editar
              </Dropdown.Item>
              <Dropdown.Item onClick={handleShow}>Excluir</Dropdown.Item>
            </TransparentDropdownButton>
          </div>
        </StyledHeader>
        <Card.Body style={{ backgroundColor: '#121212', padding: '24px' }}>
          <Row className="mt-3">
            {category?.products && category?.products.length > 0 ? (
              category?.products.map((item: any) => (
                <Col md={3} key={item.id}>
                  <ProductCardComponent category={category} product={item} />
                </Col>
              ))
            ) : (
              <NotFoundList title="Nenhum produto encontrado."></NotFoundList>
            )}
          </Row>
        </Card.Body>
      </StyledCard>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <p className="text-center text-danger">
            Ao excluir a categoria, todos os produtos vinculados a ela serão
            permanentemente removidos.
          </p>
          <Button
            className="w-100"
            variant="danger"
            style={{ borderRadius: "40px" }}
            onClick={() => {
              ProviderDeleteCategory(category?.category_reference);
              handleClose();
            }}
          >
            Deletar categoria
          </Button>
        </Modal.Body>
      </Modal>

      <ModalProductCreate
        showModal={showModalProductCreate}
        handleModalClose={handleModalProductCreateClose}
        category={category}
      />
      {showModalUpdateCategories && (
        <ModalCategoriesUpdate
          category={category}
          showModal={showModalUpdateCategories}
          handleModalClose={handleCloseModalUpdateCategories}
        />
      )}
    </>
  );
};

export default CategoryCard;
