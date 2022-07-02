export const cart = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_CART": {
      return action.val;
    }
    default:
      return state;
  }
};
