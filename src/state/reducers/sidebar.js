const reducer = (state = false, action) => {
  switch (action.type) {
    case "sidebar":
      return action.payload;
    default:
      return state
  }
}

export default reducer;
