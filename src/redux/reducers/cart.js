export const cart = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_CART": {
      return action.val;
    }
    default:
      return state;
  }
};

export const minicart = (state = false, action) => {
  switch (action.type) {
    case "DISPLAY_MINICART": {
      return action.val;
    }
    default:
      return state;
  }
};
