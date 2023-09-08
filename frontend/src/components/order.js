import { Link } from "react-router-dom";
import "./App.css";
const Order = ({ order, items }) => {
  console.log(order);
  return (
    <>
      {!items ? (
        <div className="d-flex justify-content-center align-items-center flex-column mt-5">
          <h2 style={{ color: "#f5614d" }}>Your Cart is empty!</h2>
          <Link to="/" className="shop-now">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="container my-5 cart-container">
          <table class="cart-table border my-3">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                {items.map((item) => (
                  <>
                    <td>
                      <div className="cart-info">
                        <img src={`images/${item.image}`} alt="product" />
                        <div>
                          <p>{item.name}</p>
                          <small>${item.price}</small>
                        </div>
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>
                      ${item.price * item.quantity} {""}
                    </td>
                  </>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default Order;
