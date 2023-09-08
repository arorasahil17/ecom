import "./App.css";
import { Link } from "react-router-dom";
const Cart = ({ items, increQuantity, decreQuantity, deleteItem, order }) => {
  const total = order.total_cost + order.shipping_charges - order.discount;
  console.log(items);
  return (
    <>
      <div className="container-fluid top-page">
        <div className="d-flex justify-content-between">
          <h3 className="fw-bold">Shop</h3>
          <h6>Home &gt; Cart </h6>
        </div>
      </div>
      <div className="container cart-container">
        {items.length ? (
          <table class="border my-3 cart-table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Subtotal</th>
              </tr>
            </thead>
            {items.map((item) => (
              <tbody>
                <tr>
                  <td>
                    <div className="cart-info">
                      <img src={item.image.url} alt="product" />
                      <div>
                        <p>{item.name}</p>
                        <small>Price: ${item.price}</small>
                        <br />
                        <button
                          className="cart-dlt"
                          onClick={() => {
                            deleteItem(item);
                          }}
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    {" "}
                    <div className="quantityC">
                      <button
                        className="qua-btn"
                        onClick={() => decreQuantity(item)}
                      >
                        <span className="material-symbols-outlined arrow">
                          arrow_downward
                        </span>
                      </button>{" "}
                      {item.quantity}{" "}
                      <button
                        className="qua-btn"
                        onClick={() => increQuantity(item)}
                      >
                        <span className="material-symbols-outlined arrow">
                          arrow_upward
                        </span>
                      </button>
                    </div>
                  </td>
                  <td className="cart-data">
                    $ {item.price * item.quantity} {""}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        ) : (
          <div className="d-flex justify-content-center align-items-center flex-column">
            <h2 style={{ color: "#f5614d" }}>Your Cart is empty!</h2>
            <Link to="/" className="shop-now">
              Shop Now
            </Link>
          </div>
        )}
        {items.length ? (
          <div className="container my-5" align="right">
            <h5 className="cost-head">Cart Total</h5>
            <div className="total-price">
              <table>
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td>${order.total_cost}</td>
                  </tr>
                  <tr>
                    <td>Shipping Charges</td>
                    <td>${order.shipping_charges}</td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>${order.discount}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Link to="/checkout" className="checkout">
              Proceed to checkout
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
};
export default Cart;
