const reducer = (state = null, action) => {
  switch (action.type) {
    case "personType":
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
