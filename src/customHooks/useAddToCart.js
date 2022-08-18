import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CART } from "../redux/actions";

export default function useAddToCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleAddToCart = (data, qty) => {
    const newData = data;

    const checkNewID = cart?.filter((item) => item.id != data.id);
    const newItem = cart?.find((item) => item.id == data.id);
    if (cart.length === 0 || (checkNewID && !newItem)) {
      newData.qty = qty;
    }

    if (cart.length) {
      const dup = cart?.find((item) => item.id == data.id);
      if (dup && dup?.id) {
        const dup1 = dup.qty; // 1,2
        dup.qty = dup1 + parseInt(qty); //1+1=2, 2+1=3
        const existItem = cart.filter((item) => item.id != data.id);
        dispatch(UPDATE_CART([...existItem, dup])); // qty=2, qty=3
      } else {
        dispatch(UPDATE_CART([...cart, newData]));
      }
    } else {
      dispatch(UPDATE_CART([...cart, newData]));
    }
  };
  return { handleAddToCart };
}
