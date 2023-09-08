import { useState } from "react";
import "./App.css";
const Checkout = ({ order, addAddress, user, setShipAddress, placeOrder }) => {
  const blank_address = {
    name: "",
    email: "",
    contact: "",
    address: "",
    state: "",
    country: "",
    pin_code: "",
  };
  const [address, setAddress] = useState(blank_address);
  const validateAddress = () => {
    if (
      !address.name ||
      !address.email ||
      !address.contact ||
      !address.address ||
      !address.state ||
      !address.pin_code ||
      !address.country
    ) {
      alert("You have not enter required fields");
    } else {
      addAddress(address);
      setAddress(blank_address);
    }
  };

  return (
    <>
      <div className="container-fluid top-page">
        <div className="top-flex">
          <h3 className="fw-bold">Shop</h3>
          <h6>Home &gt; Checkout </h6>
        </div>
      </div>
      <div className="container my-5">
        <h3 className="text-muted my-5 text-center">Billing Details</h3>
        <div className="container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validateAddress(address);
            }}
          >
            <label htmlFor="name">
              Name<i class="fa-solid fa-check"></i>
            </label>
            <br />
            <input
              type="text"
              name="name"
              className="form-input"
              value={address.name}
              onChange={(e) => {
                setAddress({ ...address, name: e.target.value });
              }}
            />{" "}
            <br />
            <label htmlFor="email">
              Email<i class="fa-solid fa-check"></i>
            </label>
            <br />
            <input
              type="email"
              name="email"
              className="form-input"
              value={address.email}
              onChange={(e) => {
                setAddress({ ...address, email: e.target.value });
              }}
            />
            <br />
            <label htmlFor="phone">
              Contact<i class="fa-solid fa-check"></i>
            </label>
            <br />
            <input
              type="number"
              name="phone"
              className="form-input"
              value={address.contact}
              onChange={(e) => {
                setAddress({ ...address, contact: e.target.value });
              }}
            />
            <br />
            <label htmlFor="address">
              Address<i class="fa-solid fa-check"></i>
            </label>
            <br />
            <input
              type="Your address"
              name="name"
              className="form-input"
              value={address.address}
              onChange={(e) => {
                setAddress({ ...address, address: e.target.value });
              }}
            />
            <br />
            <label htmlFor="state">
              State<i class="fa-solid fa-check"></i>
            </label>
            <br></br>
            <select
              className="form-input"
              name="state"
              value={address.state}
              onChange={(e) => {
                setAddress({ ...address, state: e.target.value });
              }}
            >
              <option>Chosse...</option>
              <option>Haryana</option>
              <option>New Delhi</option>
              <option>Maharashtra</option>
              <option>Punjab</option>
              <option>Gujrat</option>
            </select>{" "}
            <br></br>
            <label htmlFor="country">
              Country<i class="fa-solid fa-check"></i>
            </label>
            <br />
            <select
              className="form-input"
              name="country"
              value={address.country}
              onChange={(e) => {
                setAddress({ ...address, country: e.target.value });
              }}
            >
              <option>Chosse...</option>
              <option>India</option>
            </select>{" "}
            <br></br>
            <label htmlFor="pin-code">
              Pin Code<i class="fa-solid fa-check"></i>
            </label>
            <br />
            <input
              type="text"
              className="form-input"
              name="pin-code"
              value={address.pin_code}
              onChange={(e) => {
                setAddress({ ...address, pin_code: e.target.value });
              }}
            />
            <br />
            <button type="submit" className="address-btn">
              Add New Address
            </button>
            <br></br>
            <button
              className="address-btn-2"
              onClick={() => setShipAddress(address)}
            >
              Set Ship Address
            </button>
          </form>
        </div>
      </div>
      <div className="container my-5">
        <h3 className="text-muted my-5">Your Shipping Address</h3>
        <table className="cart-table address-table">
          {user.addresses.map((address) => (
            <tbody>
              <tr>
                <td>Name</td>
                <td>{address.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{address.email}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>
                  {address.address}, {address.state}, {address.country},{" "}
                  {address.pin_code}
                </td>
              </tr>
              <tr>
                <td>Contact</td>
                <td>{address.contact}</td>
              </tr>
              <tr>
                <td>Use this address</td>
                <td>
                  <input
                    type="radio"
                    name="check"
                    className="mx-2"
                    onClick={() => setShipAddress(address)}
                  ></input>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      {order.items.length ? (
        <div className="container my-5">
          <h3 className="text-muted">Your Order</h3>
          <table class="cart-table checkout-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            {order.items.map((item) => (
              <tbody>
                <tr>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              </tbody>
            ))}
            <tfoot>
              <tr>
                <td colspan="3">Subtotal:</td>
                <td>${order.total_cost}</td>
              </tr>
              <tr>
                <td colspan="3">Shipping Charges:</td>
                <td>${order.shipping_charges}</td>
              </tr>
              <tr>
                <td colspan="3">Discount:</td>
                <td>${order.discount}</td>
              </tr>
              <tr>
                <td colspan="3">Total:</td>
                <td>
                  ${order.total_cost + order.shipping_charges - order.discount}
                </td>
              </tr>
            </tfoot>
          </table>
          <button className="order" onClick={() => placeOrder()}>
            Place Order
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Checkout;
