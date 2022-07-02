export const product = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_PRODUCT": {
      return action.val;
    }
    default:
      return state;
  }
};
