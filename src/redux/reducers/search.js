export const search = (state = false, action) => {
  switch (action.type) {
    case "DISPLAY_SEARCH": {
      return action.val;
    }
    default:
      return state;
  }
};