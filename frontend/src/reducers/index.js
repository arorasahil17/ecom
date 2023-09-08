import {
  ADD_ADDRESS,
  ALL_ORDERS,
  CHANGE_ITEM_IN_CART,
  CHANGE_ORDER,
  DECRE_QUANTITY,
  DELETE_ITEM,
  EMPTY_CART,
  FILTER_PRODUCT,
  INCRE_QUANTITY,
  INIT_ADMIN,
  INIT_CART,
  INIT_PRODUCT,
  INIT_USER,
  PLACE_ORDER,
  SET_SHIP_ADDRESS,
} from "../actions";

const initialStateProducts = {
  products: [],
  filterProducts: [],
  filterCategory: [
    { id: 1, category: "all" },
    { id: 2, category: "watches" },
    { id: 3, category: "shoes" },
    { id: 4, category: "glasses" },
    { id: 5, category: "t-shirt" },
    { id: 6, category: "pants" },
    { id: 7, category: "bag" },
  ],
};

const initialStateCart = {
  items: [],
};

const initialStateOrder = {
  items: [],
  shipping_charges: 10,
  discount: 5,
  total_cost: 0,
  shipping_address: "",
};

const initialStateUser = {
  name: "",
  email: "",
  addresses: [],
  orders: [],
};

const initialStateAdmin = {
  admin: {},
  orders: [],
};

const productReducer = (state = initialStateProducts, action) => {
  switch (action.type) {
    case INIT_PRODUCT:
      return { ...state, products: action.payload };
    case FILTER_PRODUCT:
      const products = state.products;
      const category = action.payload.category;
      const x = products.filter((item) => item.category === category);
      if (x) {
        return { ...state, filterProducts: x };
      } else {
        return { ...state, filterProducts: [] };
      }
    default:
      return state;
  }
};

const orderReducer = (state = initialStateOrder, action) => {
  switch (action.type) {
    case CHANGE_ORDER:
      const items = action.payload;
      const total_cost = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return { ...state, items: items, total_cost: total_cost };
    case SET_SHIP_ADDRESS:
      return { ...state, shipping_address: action.payload };
    default:
      return state;
  }
};

const cartReducer = (state = initialStateCart, action) => {
  switch (action.type) {
    case CHANGE_ITEM_IN_CART:
      return { ...state, items: action.payload.items };
    case INIT_CART:
      return {
        ...state,
        items: action.payload.items,
        userId: action.payload.userId,
      };
    case INCRE_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item._id === action.payload._id) {
            item.quantity += 1;
          }
          return item;
        }),
      };
    case DECRE_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item._id === action.payload._id) {
            if (item.quantity > 1) {
              item.quantity -= 1;
            }
          }
          return item;
        }),
      };
    case DELETE_ITEM:
      return { ...state, items: action.payload };
    case EMPTY_CART:
      return { ...state, items: [] };
    default:
      return state;
  }
};

const userReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    case INIT_USER:
      return action.payload;
    case ADD_ADDRESS:
      return { ...state, addresses: [...state.addresses, action.payload] };
    case PLACE_ORDER:
      return { ...state, orders: [...state.orders, { ...action.payload }] };
    default:
      return state;
  }
};

const adminReducer = (state = initialStateAdmin, action) => {
  switch (action.type) {
    case INIT_ADMIN:
      return { ...state, admin: action.payload };
    case ALL_ORDERS:
      return { ...state, orders: action.payload };
    default:
      return state;
  }
};

export { productReducer, cartReducer, orderReducer, userReducer, adminReducer };
