import { CategoriesHandler, CategoriesHandlerModalCreate } from "./actions/CategoriesHandler";

import HeroSection from "@/global/components/HeroSection";
import NavbarComponent from "@/global/components/navbar.component";
import { NotFoundList } from "@/global/components/NotFound-List";
import PaginationComponent from "@/global/components/pagination.component";
import CategoryCard from "./components/card-categories.component";
import { ModalCreateCategories } from "./components/modal-category-create.component";

const ProductsPage = () => {
  const { categories, paginationFilter, handlePageChange} = CategoriesHandler();
  const {
    showModalCreateCategories,
    handleCloseModalCreateCategories,
    handleShowModalCreateCategories,
  } = CategoriesHandlerModalCreate();

  return (
    <HeroSection>
      <NavbarComponent
        title="Gerenciar Estoque"
        buttonText2="Criar uma nova categoria"
        buttonAction2={handleShowModalCreateCategories}
      />

      <ModalCreateCategories
        showModal={showModalCreateCategories}
        handleModalClose={handleCloseModalCreateCategories}
      />

      {categories && categories.length > 0 ? (
        categories.map((item: any) => (
          <CategoryCard
            key={item.id}
            category={item}
            id={item?.id}
          />
        ))
      ) : (
        <NotFoundList title="Você ainda não criou nenhuma categoria." />
      )}

      <div className="d-flex justify-content-center">
        <PaginationComponent
          paginationCount={paginationFilter?.paginationCount}
          hasMoreResults={paginationFilter?.hasMoreResults}
          onPageChange={handlePageChange}
        ></PaginationComponent>
      </div>
    </HeroSection>
  );
};

export default ProductsPage;
