const express = require("express");
const router = express.Router();
const userSignUp = require("../controllers/user/userSignUp");
const userLogin = require("../controllers/user/userLogin");
const authToken = require("../middleware/authToken");
const userDetails = require("../controllers/user/userDetails");
const userLogout = require("../controllers/user/userLogout");
const allUsers = require("../controllers/user/allUsers");
const updateUser = require("../controllers/user/updateUser");
const addCategory = require("../controllers/category/addCategory");
const allCategories = require("../controllers/category/allCategories");
const editCategory = require("../controllers/category/editCategory");
const addProduct = require("../controllers/product/addProduct");
const allProducts = require("../controllers/product/allProducts");
const deleteCategory = require("../controllers/category/deleteCategory");
const updateProduct = require("../controllers/product/updateProduct");
const deleteProduct = require("../controllers/product/deleteProduct");
const productDetails = require("../controllers/product/productDetails");
const categoryProduct = require("../controllers/category/categoryProduct");
const addToCart = require("../controllers/cart/addToCart");
const viewCart = require("../controllers/cart/viewCart");
const updateCart = require("../controllers/cart/updateCart");
const deleteCartProduct = require("../controllers/cart/deleteCartProduct");
const checkoutCart = require("../controllers/cart/checkoutCart");
const countCartProduct = require("../controllers/user/countCartProduct");
const productCartSelectedCheckout = require("../controllers/cart/productCartSelectedCheckout");
const changePassword = require("../controllers/user/changePassword");
const orderHistory = require("../controllers/user/orderHistory");
const orderDetails = require("../controllers/user/orderDetails");
const allOrders = require("../controllers/cart/allOrders");
const updateOrder = require("../controllers/cart/updateOrder");

router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.get("/user-details", authToken, userDetails);
router.get("/logout", authToken, userLogout);
router.post("/all-users", allUsers);
router.put("/update-user", authToken, updateUser);
router.put("/change-password", authToken, changePassword);

// Admin Routes
router.post("/add-category",authToken, addCategory);
router.get("/all-categories", allCategories);
router.put("/edit-category", authToken, editCategory);
router.delete("/delete-category", authToken, deleteCategory);
router.post("/add-product", authToken, addProduct);
router.post("/all-products", allProducts);
router.put("/edit-product",authToken, updateProduct);
router.delete("/delete-product", authToken, deleteProduct);
router.post("/product-details", productDetails);
router.post("/category-product", categoryProduct);

// Cart
router.post("/add-to-cart", authToken, addToCart);
router.get("/cart", authToken, viewCart);
router.get("/count-cart-product", authToken, countCartProduct);
router.put("/update-cart", authToken, updateCart);
router.delete("/delete-cart-product", authToken, deleteCartProduct);
router.post("/checkout-cart", authToken, checkoutCart);
router.get("/order-history", authToken, orderHistory);

router.post("/product-checkout", authToken, productCartSelectedCheckout);
router.post('/order-details',authToken,orderDetails)

// Order
router.get('/all-orders',authToken,allOrders);
router.post("/update-order",authToken,updateOrder)

module.exports = router;
