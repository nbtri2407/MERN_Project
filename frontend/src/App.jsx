import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Context from "./context";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import SummaryApi from "./common";

function App() {
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: "get",
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const [cartProductCount, setCartProductCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const handleSetSelectedProduct = (product = []) => {
    setSelectedProduct(product);
  }

  const getCountCartProduct = async () => {
    const dataResponse = await fetch(SummaryApi.countCartProduct.url, {
      method: "get",
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      setCartProductCount(dataApi.data);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    getCountCartProduct();
  });

  return (
    <Context.Provider
      value={{
        fetchUserDetails,
        getCountCartProduct,
        cartProductCount,
        handleSetSelectedProduct,
        selectedProduct
      }}
    >
      <div className="relative overflow-hidden">
        <Navbar className="" />
        <ToastContainer position="bottom-right" />
        <Outlet />
        <Footer />
      </div>
    </Context.Provider>
  );
}

export default App;
