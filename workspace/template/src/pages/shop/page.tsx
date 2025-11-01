import { Container } from "react-bootstrap";
import Footer from "@/global/components/footer";
import { HeaderComponent } from "@/core/client/components/header.component";
import { Link } from "react-router-dom";
import { ProductsOffersComponent } from "@/core/client/components/products-offers.component";
import useCategories from "@/core/client/hooks/categories.hook";

const ShopPage = () => {
  const {categories} = useCategories()
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
              <div key={index} className="hover-effect">
                <Link to={'/shop/'+item.category_slug} style={{color:"white"}}>
                  <i className='bx bxs-star' style={{fontSize:"14px", marginRight:"5px"}}></i>
                  <span style={{fontSize:"14px"}}>{item.category}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
        </section>
      </Container>

      <Container>
        <ProductsOffersComponent/>
      </Container>

      <Footer/>
    </>
  );
};

export default ShopPage;
