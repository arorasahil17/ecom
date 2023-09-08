import Checkout from "../components/checkout";
import Footer from "../components/footer";
import Nav from "../components/nav";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddressAC,
  emptyCartAC,
  placeOrderAC,
  setShipAddressAC,
} from "../actions";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const addAddress = (address) => {
    dispatch(addAddressAC(address));
  };
  const setShipAddress = (address) => {
    dispatch(setShipAddressAC(address));
  };
  const placeOrder = () => {
    if (order.shipping_address) {
      dispatch(placeOrderAC(order, navigate));
      console.log(order);
      emptyCart();
    } else {
      alert("please choose a shipping address");
    }
  };
  const emptyCart = () => {
    dispatch(emptyCartAC());
  };
  return (
    <>
      <Nav cartCount={items.length} user={user}></Nav>
      <Checkout
        order={order}
        addAddress={addAddress}
        user={user}
        setShipAddress={setShipAddress}
        placeOrder={placeOrder}
      ></Checkout>
      <Footer></Footer>
    </>
  );
};

export default CheckoutPage;
