import Nav from "../components/nav";
import Slider from "../components/slider";
import Category from "../components/category";
import Product from "../components/product-list";
import Footer from "../components/footer";
import Client from "../components/clients";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAC,
  checkAuth,
  filtertedProductAC,
  initProductAC,
} from "../actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);
  const cartItems = useSelector((state) => state.cart.items);
  const filterProduct = useSelector((state) => state.product.filterProducts);
  const filterCategory = useSelector((state) => state.product.filterCategory);
  const user = useSelector((state) => state.user);
  console.log("user", user);

  useEffect(() => {
    dispatch(initProductAC());
    // dispatch(checkAuth(navigate));
  }, []);

  const addToCart = (product) => {
    dispatch(addToCartAC(product, navigate));
  };

  const filtertedProducts = (filter) => {
    dispatch(filtertedProductAC(filter));
  };

  return (
    <>
      <Nav cartCount={cartItems.length} user={user}></Nav>
      <Slider></Slider>
      <Category></Category>
      <Product
        products={products}
        addToCart={addToCart}
        filterProduct={filterProduct}
        filterCategory={filterCategory}
        filtertedProducts={filtertedProducts}
      ></Product>
      <Client></Client>
      <Footer></Footer>
    </>
  );
};
export default Home;
