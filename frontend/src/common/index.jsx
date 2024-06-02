
const backendDomain = "http://localhost:8080";

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
  },
  login: {
    url: `${backendDomain}/api/login`,
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
  },
  orderHistory: {
    url: `${backendDomain}/api/order-history`,
  },
  logout: {
    url: `${backendDomain}/api/logout`,
  },
  allUsers: {
    url: `${backendDomain}/api/all-users`,
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
  },
  changePassword: {
    url: `${backendDomain}/api/change-password`,
  },
  addCategory: {
    url: `${backendDomain}/api/add-category`,
  },
  allCategories: {
    url: `${backendDomain}/api/all-categories`,
  },
  editCategory: {
    url: `${backendDomain}/api/edit-category`,
  },
  deleteCategory: {
    url: `${backendDomain}/api/delete-category`,
  },
  addProduct: {
    url: `${backendDomain}/api/add-product`,
  },
  allProducts: {
    url: `${backendDomain}/api/all-products`,
  },
  deleteProduct: {
    url: `${backendDomain}/api/delete-product`,
  },
  editProduct: {
    url: `${backendDomain}/api/edit-product`,
  },
  productDetails: {
    url: `${backendDomain}/api/product-details`,
  },
  categoryProduct: {
    url: `${backendDomain}/api/category-product`,
  },
  addToCart: {
    url: `${backendDomain}/api/add-to-cart`,
  },
  cart: {
    url: `${backendDomain}/api/cart`,
  },
  countCartProduct: {
    url: `${backendDomain}/api/count-cart-product`,
  },
  updateCart: {
    url: `${backendDomain}/api/update-cart`,
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/delete-cart-product`,
  },
  checkoutCart: {
    url: `${backendDomain}/api/checkout-cart`,
  },
  productCartSelectedCheckout: {
    url: `${backendDomain}/api/product-checkout`,
  },
  orderDetails: {
    url: `${backendDomain}/api/order-details`,
  },
  allOrders: {
    url: `${backendDomain}/api/all-orders`,
  },
  updateOrder: {
    url: `${backendDomain}/api/update-order`,
  }
};

//logout
export default SummaryApi;
