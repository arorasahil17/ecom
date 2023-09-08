import Cart from "../components/cart";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOrderAC,
  decreQuantityAC,
  deleteItemAC,
  increQuantityAC,
} from "../actions";
import { useEffect } from "react";

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  useEffect(() => dispatch(changeOrderAC(items)), [items]);

  const increQuantity = (item) => {
    dispatch(increQuantityAC(item));
  };

  const decreQuantity = (item) => {
    dispatch(decreQuantityAC(item));
  };

  const deleteItem = (item) => {
    dispatch(deleteItemAC(item));
  };

  return (
    <>
      <Nav cartCount={items.length} user={user}></Nav>
      <Cart
        items={items}
        increQuantity={increQuantity}
        decreQuantity={decreQuantity}
        deleteItem={deleteItem}
        order={order}
      ></Cart>
      <Footer></Footer>
    </>
  );
};
export default CartPage;
