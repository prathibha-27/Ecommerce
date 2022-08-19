import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CART } from "../redux/actions";

export default function useAddToCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleAddToCart = (data, qty) => {
    const newData = data;
    if (cart.length) {
      const dup = cart?.find((item) => item.id == data.id);
      if (dup && dup?.id) {
        const dup1 = dup.qty; // 1,2
        dup.qty = dup1 + parseInt(qty); //1+1=2, 2+1=3
        const existItem = cart.filter((item) => item.id != data.id);
        dispatch(UPDATE_CART([...existItem, dup])); // qty=2, qty=3
      } else {
        newData.qty = qty;
        dispatch(UPDATE_CART([...cart, newData]));
      }
    } else {
      newData.qty = qty;
      dispatch(UPDATE_CART([...cart, newData]));
    }
  };
  return { handleAddToCart };
}
