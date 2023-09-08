import { useSelector } from "react-redux";
import Footer from "../components/footer";
import Nav from "../components/nav";
import Order from "../components/order";

const OrderPage = () => {
  const user = useSelector((state) => state.user);
  const items = useSelector((state) => state.cart.items);
  console.log(user.orders);
  return (
    <>
      <Nav cartCount={items.length} user={user}></Nav>
      {user.orders.map((order) => (
        <Order order={order} items={order.items}></Order>
      ))}
      <Footer></Footer>
    </>
  );
};

export default OrderPage;
