import axios from "axios";
axios.defaults.withCredentials = true;
export const INIT_PRODUCT = "INIT_PRODUCT";
export const INIT_CART = "INIT_CART";
export const CHANGE_ITEM_IN_CART = "CHANGE_ITEM_IN_CART";
export const INCRE_QUANTITY = "INCRE_QUANTITY";
export const DECRE_QUANTITY = "DECRE_QUANTITY";
export const DELETE_ITEM = "DELETE_ITEM";
export const CHANGE_ORDER = "CHANGE_ORDER";
export const ADD_ADDRESS = "ADD_ADDRESS";
export const SET_SHIP_ADDRESS = "SET_SHIP_ADDRESS";
export const FILTER_PRODUCT = "FILTER_PRODUCT";
export const PLACE_ORDER = "PLACE_ORDER";
export const EMPTY_CART = "EMPTY_CART";
export const INIT_USER = "INIT_USER";
export const INIT_ADMIN = "INIT_ADMIN";
export const ALL_ORDERS = "ALL_ORDERS";

export const checkAuth = (navigate) => {
  return async function (dispatch) {
    try {
      const res = await axios.get("http://localhost:8080/userauth");
      if (res.data.status) {
        dispatch({ type: INIT_USER, payload: res.data.user });
        dispatch(initCartAC(res.data.user._id));
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const checkAuthAdmin = (navigate) => {
  return async function (dispatch) {
    try {
      const res = await axios.get("http://localhost:8080/adminauth");
      console.log(res);
      if (res.data.status) {
        dispatch({ type: INIT_ADMIN, payload: res.data.admin });
        navigate("/dashboard");
      } else {
        navigate("/adminLogin");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const adminLoginAc = (admin, navigate) => {
  return async function (dispatch) {
    const res = await axios.post("http://localhost:8080/adminLogin", admin);
    if (res.data.status) {
      dispatch({ type: INIT_ADMIN, payload: res.data.admin });
      navigate("/dashboard");
      console.log(admin);
    }
  };
};

export const getAllOrdersAC = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get("http://localhost:8080/allOrders");
      dispatch({ type: ALL_ORDERS, payload: res.data });
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const adminLogoutAC = (navigate) => {
  return function (dispatch) {
    axios
      .post("http://localhost:8080/adminLogout")
      .then(function (res) {
        if (res.data.status) {
          dispatch({ type: INIT_ADMIN, payload: {} });
          navigate("/adminLogin");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };
};

export const loginAC = (user, navigate) => {
  return async function (dispatch) {
    try {
      const res = await axios.post("http://localhost:8080/login", { user });
      if (res.data.status) {
        dispatch({ type: INIT_USER, payload: res.data.user });
        dispatch(initCartAC(res.data.user._id));
        navigate("/");
        console.log(user);
      }
    } catch (err) {
      console.log(err);
      alert("Email or password is incorrect!");
    }
  };
};

export const signupAC = (user, navigate) => {
  return async function (dispatch) {
    try {
      const res = await axios.post("http://localhost:8080/sign", { user });
      if (res.data.status) {
        dispatch({ type: INIT_USER, payload: res.data.user });
        dispatch(initCartAC(res.data.user._id));
        navigate("/");
        console.log(user);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const logoutAC = (navigate) => {
  return function (dispatch) {
    axios
      .get("http://localhost:8080/logout")
      .then(function (res) {
        if (res.data.status) {
          dispatch({ type: INIT_USER, payload: {} });
          navigate("/login");
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };
};

export const initProductAC = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get("http://localhost:8080/product");
      dispatch({ type: INIT_PRODUCT, payload: res.data });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const initCartAC = (userId) => {
  return function (dispatch) {
    axios
      .get("http://localhost:8080/cart")
      .then(function (res) {
        dispatch({
          type: INIT_CART,
          payload: { items: res.data.items, userId: userId },
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  };
};

export const changeOrderAC = (items) => {
  return function (dispatch) {
    dispatch({ type: CHANGE_ORDER, payload: items });
  };
};

export const addToCartAC = (product, navigate) => {
  return function (dispatch) {
    changeCartAC(dispatch, navigate, product);
  };
};

export const increQuantityAC = (item) => {
  return function (dispatch) {
    dispatch({ type: INCRE_QUANTITY, payload: item });
    changeCartAC();
  };
};

export const decreQuantityAC = (item) => {
  return function (dispatch) {
    dispatch({ type: DECRE_QUANTITY, payload: item });
    changeCartAC();
  };
};

export const deleteItemAC = (item) => {
  return function (dispatch) {
    axios
      .post("http://localhost:8080/removeItem", { item: item })
      .then(function (res) {
        dispatch({ type: DELETE_ITEM, payload: res.data.items });
      })
      .catch(function (err) {
        console.log(err);
      });
  };
};

export const filtertedProductAC = (filter) => {
  return function (dispatch) {
    dispatch({ type: FILTER_PRODUCT, payload: filter });
    console.log(filter);
  };
};

export const addAddressAC = (address) => {
  return function (dispatch) {
    axios
      .post("http://localhost:8080/updateAddress", { address })
      .then(function (res) {
        dispatch({ type: ADD_ADDRESS, payload: res.data });
      })
      .catch(function (err) {
        console.log(err);
      });
  };
};
export const setShipAddressAC = (address) => {
  return function (dispatch) {
    dispatch({ type: SET_SHIP_ADDRESS, payload: address });
  };
};

export const placeOrderAC = (order, navigate) => {
  return function (dispatch) {
    axios
      .post("http://localhost:8080/order", { order })
      .then(function (res) {
        dispatch({ type: PLACE_ORDER, payload: res.data });
        navigate("/");
      })
      .catch(function (err) {
        console.log(err);
      });
  };
};

export const emptyCartAC = () => {
  return function (dispatch) {
    axios
      .post("http://localhost:8080/empty")
      .then(function (res) {
        dispatch({ type: CHANGE_ITEM_IN_CART, payload: res.data });
      })
      .catch(function (err) {
        console.log(err);
      });
  };
};

async function changeCartAC(dispatch, navigate, item) {
  try {
    const res = await axios.post("http://localhost:8080/cart", { item: item });
    if (res.data.success) {
      dispatch({ type: CHANGE_ITEM_IN_CART, payload: res.data.cart });
    }
  } catch (err) {
    console.log(err);
    navigate("/login");
  }
}
