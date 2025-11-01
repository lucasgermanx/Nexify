import { Container } from "react-bootstrap";
import Footer from "@/global/components/footer";
import { HeaderComponent } from "@/core/client/components/header.component";
import InputSearchComponent from "../components/input-search.component";
import { Link } from "react-router-dom";
import PaginationComponent from "@/core/client/components/pagination.component";
import { ProductsListComponent } from "@/core/client/components/products-list.component";
import { categoryActions } from "./action/category-action";

const CategoryPage = () => {
  const {categories, category, products, paginationFilter, handlePageChange, register, filterProducts, isFiltering} = categoryActions()

  return (
    <>
      <HeaderComponent/>
      <Container>
        <section className="col-md-12 mt-4" style={{backgroundColor:"#0D0E10", padding:"2%", color:"white", borderRadius:"10px"}}>
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-4 justify-content-end mt-2">
            <div>
                <Link to={`/shop/`} className="hover-effect" style={{color:"white", textDecoration:"none"}}>
                  <i className='bx bxs-star' style={{fontSize:"14px", marginRight:"5px"}}></i>
                  <span style={{fontSize:"14px"}}>Produtos com desconto</span>
                </Link>
              </div>
            {categories?.map((item, index)=>(
              <div key={index}>
                <Link to={`/shop/${item.category_slug}`} className="hover-effect" style={{color:"white", textDecoration:"none"}}>
                  <i className='bx bxs-star' style={{fontSize:"14px", marginRight:"5px"}}></i>
                  <span style={{fontSize:"14px"}}>{item.category}</span>
                </Link>
              </div>
            ))}
          </div>
          <div>
              <InputSearchComponent placeholder="Pesquise por um produto" useForm={{ ...register("value", { required: true }) }}/>
            </div>
        </div>
        </section>
      </Container>

      <Container>
        <div className="mt-5 mb-3">
          <h5 className="text-white">
            {isFiltering ? "Produtos filtrados:" : category?.category}
          </h5>
        </div>
        <ProductsListComponent products={isFiltering ? filterProducts : products}/>
      </Container>

      <div className="d-flex justify-content-center">
        <PaginationComponent
          paginationCount={paginationFilter?.paginationCount}
          hasMoreResults={paginationFilter?.hasMoreResults}
          onPageChange={handlePageChange}
        ></PaginationComponent>
      </div>

      <Footer/>
    </>
  );
};

export default CategoryPage;
