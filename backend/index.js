const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const port = 8080;
const cloudinary = require("cloudinary").v2;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.static("public"));

app.use(express.json());
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

cloudinary.config({
  cloud_name: "dgn9a3ev1",
  api_key: "917468258265746",
  api_secret: "pDYns6lXX0Ood3VmCYbn8ymePy0",
});

// databse connection function
main().catch((err) => console.log(`Unable to connect ${err}`));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("Database Connected");
}

// Schemas

// product schema
const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
});

// cart schema
const cartSchema = new Schema({
  items: { type: [Object], default: [] },
  userId: { type: String },
});

// order schema
const orderSchema = new Schema({
  items: { type: [Object], default: [] },
  shipping_address: Object,
  shipping_charges: { type: Number },
  discount: { type: Number },
  total_cost: { type: Number },
});

// user schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  addresses: [Object],
  orders: [Object],
});

// admin schema
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// models
const Product = new mongoose.model("Product", productSchema);
const Cart = new mongoose.model("Cart", cartSchema);
const Order = new mongoose.model("Order", orderSchema);
const User = new mongoose.model("User", userSchema);
const Admin = new mongoose.model("Admin", adminSchema);

// add new product

// path for image
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/"); // Update the destination path
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const uploads = multer({ storage: storage });
// api for adding product

// add product api
const upload = multer({ dest: "uploads/" });

app.post("/products", upload.single("image"), async (req, res) => {
  const { name, price, category, description } = req.body;
  const image = req.file.path;

  try {
    // Create a new product instance
    const result = await cloudinary.uploader.upload(image, {
      folder: "products",
    });
    console.log("Uploaded image result:", result);

    const newProduct = new Product({
      name,
      price,
      category,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      description,
    });
    console.log("New product instance:", newProduct);

    await newProduct.save();
    res.status(200).send("Product saved successfully");
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).send("Error saving product");
  }
});

// get all products api
app.get("/product", (req, res) => {
  Product.find({})
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

// user authentication
app.get("/userauth", (req, res) => {
  if (req.session.user) {
    User.findOne({ email: req.session.user.email }).then((result) => {
      req.session.user = result;
      res.status(200).send({ status: true, user: result });
    });
  } else {
    res.send({ status: false });
  }
});

// add to cart api
app.post("/cart", authenticate, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const item = req.body.item;
    const result = await Cart.findOne({ userId: userId });
    if (result) {
      const itemIndex = result.items.findIndex((it) => it._id === item._id);
      if (itemIndex >= 0) {
        result.items.splice(itemIndex, 1, item);
      } else {
        result.items.push(item);
      }
      const cart = await result.save();
      res.json({ success: true, cart: cart });
    } else {
      const cart = new Cart({
        userId: userId,
        items: [item],
      });
      const savedCart = await cart.save();
      res.send(savedCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, message: "Internal Server Error!" });
  }
});

// get cart products
app.get("/cart", (req, res) => {
  const userId = req.session.user._id;
  Cart.findOne({ userId: userId }).then((result) => {
    if (result) {
      res.send(result);
    } else {
      res.send({ userId: req.session.user._id, items: [] });
    }
  });
});

// updating addresses
app.post("/updateAddress", async (req, res) => {
  const userId = req.session.user._id;
  const address = req.body.address;
  User.findOne({ _id: userId }).then((user) => {
    user.addresses.push(address);
    user
      .save()
      .then((user) => {
        res.send(address);
      })
      .catch((err) => {
        res.send(err);
      });
  });
});

// deleting cart items
app.post("/empty", (req, res) => {
  const userId = req.session.user._id;
  Cart.findOne({ userId: userId }).then((result) => {
    result.items = [];
    result
      .save()
      .then((cart) => {
        res.send(cart);
      })
      .catch((err) => res.send(err));
  });
});

// authenctication
async function authenticate(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send("Unauthorized");
  } else {
    next();
  }
}

// order api
app.post("/order", authenticate, async (req, res) => {
  try {
    const userId = req.session.user._id;
    const order = req.body.order;
    let newOrder = new Order(order);
    const savedOrder = await newOrder.save();
    const user = await User.findOne({ _id: userId });
    user.orders.push(savedOrder);
    const savedUser = await user.save();
    res.send(savedOrder);
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
});

// remove item from cart
app.post("/removeItem", (req, res) => {
  const userId = req.session.user._id;
  const item = req.body.item;
  Cart.findOne({ userId: userId }).then((result) => {
    const itemIndex = result.items.findIndex((it) => it._id === item._id);
    result.items.splice(itemIndex, 1);
    result.save().then((cart) => res.send(cart));
  });
});

// login api
app.post("/login", async (req, res) => {
  const email = req.body.user.email;
  const password = req.body.user.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .send({ status: false, message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ status: false, message: "Invalid email or password" });
    }
    req.session.user = user;
    return res.status(200).send({ status: true, user: user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: false, message: "Internal server error" });
  }
});

// sign up api
app.post("/sign", async (req, res) => {
  const name = req.body.user.name;
  const email = req.body.user.email;
  const password = req.body.user.password;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .send({ status: false, message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await user.save();
    req.session.user = user;
    return res.status(200).send({ status: true, user: user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ status: false, message: "Internal server error" });
  }
});

// logout api
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send({ status: true });
});

// admin login

app.post("/adminSignup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("admin@123", 10);
    const admin = new Admin({
      username: "admin_123",
      password: hashedPassword,
    });
    await admin.save();
    res.send("Admin added successfully");
  } catch (err) {
    console.log(err);
  }
});

// authenticate admin

app.post("/adminLogin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const adminDetail = await Admin.findOne({ username: username });
    if (!adminDetail) {
      return res.status(400).send({ message: "Bad Request Admin not found!" });
    }
    const isMatch = await bcrypt.compare(password, adminDetail.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "Incorrect Password!", admin: adminDetail });
    }
    req.session.admin = adminDetail;
    res.status(200).send({
      status: true,
      admin: adminDetail,
      message: "Admin Login Successfully!",
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/adminauth", (req, res) => {
  if (req.session.admin) {
    Admin.findOne({ username: req.session.admin.username })
      .then((result) => {
        req.session.admin = result;
        res.status(200).send({ status: true, admin: result });
      })
      .catch((error) => {
        res.status(500).json({ message: "Server Error" });
      });
  } else {
    res.send({ status: false });
  }
});

app.post("/adminLogout", (req, res) => {
  try {
    req.session.admin = null;

    res
      .status(200)
      .send({ status: true, message: "Admin Logout Successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/allOrders", async (req, res) => {
  try {
    const order = await Order.find();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(port, function () {
  console.log(`server is running at ${port}`);
});
