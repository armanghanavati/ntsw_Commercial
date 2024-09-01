const reducer = (state = [], action) => {
  switch (action.type) {
      case "editGoods":
          return action.payload;
      default:
          return state;
  }
}

export default reducer;
