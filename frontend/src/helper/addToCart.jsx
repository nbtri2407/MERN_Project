import { toast } from "react-toastify";
import SummaryApi from "../common";

const addToCart = async (productId, quantity = 1) => {
    const dataResponse = await fetch(SummaryApi.addToCart.url, {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: productId,
        quantity,
        checkout: false,
      }),
    });
    const dataApi = await dataResponse.json();
    if (dataApi.status) {
      toast.success("Add to cart successfully");
    } else {
      toast.error(dataApi.message);
    }
  };

export default addToCart;