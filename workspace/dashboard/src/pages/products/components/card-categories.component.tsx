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
  background: linear-gradient(135deg, rgba(255, 140, 0, 0.05) 0%, rgba(255, 165, 0, 0.02) 100%);
  border-bottom: 2px solid rgba(255, 140, 0, 0.2);
  padding: 20px 24px;
  border-radius: 12px 12px 0 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(135deg, #ff8c00 0%, #ffa500 100%);
    border-radius: 12px 12px 0 0;
  }
`;

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const StyledTitle = styled.h5`
  margin: 0;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.5px;
`;

const StyledBadgeContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const StyledBadge = styled(Badge)`
  background-color: rgba(255, 255, 255, 0.08) !important;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const StyledSlugBadge = styled(Badge)`
  background-color: rgba(255, 140, 0, 0.15) !important;
  color: #ff8c00;
  border: 1px solid rgba(255, 140, 0, 0.3);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TransparentDropdownButton = styled(DropdownButton)`
  &&& .dropdown-toggle {
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 8px 12px;
    margin: 0;
    color: rgba(255, 255, 255, 0.8);
    font-size: 18px;
    border-radius: 8px;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 140, 0, 0.3);
      color: #ff8c00;
    }
  }
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
            <StyledTitle>{category?.category}</StyledTitle>
            <StyledBadgeContainer>
              <StyledBadge>ID: {category?.id}</StyledBadge>
              <StyledSlugBadge>SLUG: {category?.category_slug}</StyledSlugBadge>
              {category?.products && (
                <StyledBadge style={{ 
                  background: 'rgba(34, 197, 94, 0.15) !important',
                  color: '#22c55e',
                  borderColor: 'rgba(34, 197, 94, 0.3)'
                }}>
                  {category.products.length} {category.products.length === 1 ? 'produto' : 'produtos'}
                </StyledBadge>
              )}
            </StyledBadgeContainer>
          </StyledContent>
          <ActionsContainer>
            <ButtonGreen onClick={handleModalProductCreateOpen} style={{ fontWeight: '600' }}>
              Novo produto
            </ButtonGreen>
            <TransparentDropdownButton title={<MdMoreVert />}>
              <Dropdown.Item onClick={handleShowModalUpdateCategories}>
                Editar categoria
              </Dropdown.Item>
              <Dropdown.Item onClick={handleShow} style={{ color: '#ef4444' }}>
                Excluir categoria
              </Dropdown.Item>
            </TransparentDropdownButton>
          </ActionsContainer>
        </StyledHeader>
        <Card.Body style={{ backgroundColor: '#121212', padding: '24px' }}>
          {category?.products && category?.products.length > 0 ? (
            <Row style={{ marginTop: '0' }}>
              {category?.products.map((item: any) => (
                <Col md={3} sm={6} key={item.id} style={{ marginBottom: '1rem', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                  <ProductCardComponent category={category} product={item} />
                </Col>
              ))}
            </Row>
          ) : (
            <NotFoundList title="Nenhum produto encontrado nesta categoria."></NotFoundList>
          )}
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
