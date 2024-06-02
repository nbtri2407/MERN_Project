import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Shop from "../pages/Shop";
import AllUsers from "../pages/Admin/AllUsers";
import AllCategories from "../pages/Admin/AllCategories";
import AllProducts from "../pages/Admin/AllProducts";
import Admin from "../pages/Admin/Admin";
import Dashboard from "../pages/Admin/Dashboard";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Profile from "../pages/User/Profile";
import AllOrders from "../pages/Admin/AllOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },

      // Admin Routes
      {
        path: "admin-dashboard",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "categories",
            element: <AllCategories />,
          },
          {
            path: "products",
            element: <AllProducts />,
          },
          {
            path: "orders",
            element: <AllOrders />,
          },
        ],
      },
    ],
  },
]);

export default router;
