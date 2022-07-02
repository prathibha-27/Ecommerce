export const productList = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_PRODUCT_LIST": {
      return action.val;
    }
    default:
      return state;
  }
};
