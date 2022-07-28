export const pickup = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_PICKUP": {
      return action.val;
    }
    default:
      return state;
  }
};