import { useEffect } from "react";
import "./allOrder.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAC } from "../../../../actions";
const AllOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.admin.orders);
  console.log(orders);
  useEffect(() => {
    dispatch(getAllOrdersAC());
  }, []);
  return (
    <>
      <h4>All Orders</h4>
      <div className="container">
        <table className="table table-striped responsive-table">
          <thead className="thead-dark admin-thead">
            <tr>
              <th className="order-th">Order ID</th>
              <th className="order-th">Products</th>
              <th className="order-th">Price</th>
            </tr>
          </thead>
          <tbody>
            {/* Order 1 */}
            {orders.map((order) => (
              <>
                <tr>
                  <td data-title="Order ID">{order._id}</td>
                  <td data-title="Products">{order.items.length}</td>
                  <td data-title="Price">${order.total_cost}</td>
                </tr>
              </>
            ))}

            {/* <tr>
              <td data-title="Order ID">2</td>
              <td data-title="Products">Product 3, Product 4</td>
              <td data-title="Price">$80.00</td>
            </tr>

            <tr>
              <td data-title="Order ID">3</td>
              <td data-title="Products">Product 5</td>
              <td data-title="Price">$50.00</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default AllOrders;
