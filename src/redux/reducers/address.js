export const address = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_ADDRESS": {
      return action.val;
    }
    case "CLEAR_ADDRESS":{
      return [];
    }
    default:
      return state;
  }
};
