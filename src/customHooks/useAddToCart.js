import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CART } from "../redux/actions";

export default function useAddToCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleAddToCart = (data, qty) => {
    const newData = data;
    newData.qty = qty;
    if (cart.length) {
      const duplicate = cart?.find((item) => item.id === data.id);
      const dup = duplicate;
      if (dup && dup?.id) {
        const dup1 = dup.qty;
        dup.qty = dup1 + parseInt(qty);
        const existItem = cart.filter((item) => item.id !== data.id);
        dispatch(UPDATE_CART([...existItem, dup]));
      } else {
        dispatch(UPDATE_CART([...cart, newData]));
      }
    } else {
      dispatch(UPDATE_CART([...cart, newData]));
    }
  };
  return { handleAddToCart };
}
