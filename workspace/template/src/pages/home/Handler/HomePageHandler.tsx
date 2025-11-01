// import { useEffect, useState } from "react";


// export const HomePageHandler = () => {
//   const [currentDomain, setCurrentDomain] = useState('');
//   const { ProviderGetStore, content, store, categories, products } = useHome()

//   useEffect(() => {
//     setCurrentDomain("fivemarket.com");
//   }, []);

//   return { store, categories, content, products }
// };

// export const HomeHandler = () => {
//   const [currentDomain, setCurrentDomain] = useState('');
//   const { products } = useCategories();
//   const { posts } = useBlog();

//   const productsOffer = products
//     ?.filter((item: any) => item?.product_price_discount !== 0)
//     .slice(0, 4);

//   const postsHome = posts?.filter((item: any) => item).slice(0, 4);
//   const uniquePost = posts?.filter((item: any) => item).slice(0, 1);


//   useEffect(() => {
//     setCurrentDomain("fivemarket.com");
//   }, []);

//   return {productsOffer, postsHome, uniquePost}
// };
