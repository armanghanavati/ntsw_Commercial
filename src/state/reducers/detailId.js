const reducer = (state = {}, action) => {
    switch (action.type) {
      case "detailId":
        return action.payload;
      default:
        return state
    }
  }
  
  export default reducer;
  