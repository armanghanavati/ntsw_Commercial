const reducer = (state = {}, action) => {
  switch (action.type) {
    case "printInfo":
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
