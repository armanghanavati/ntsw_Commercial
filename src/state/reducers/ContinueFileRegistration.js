const reducer = (state = [], action) => {
  switch (action.type) {
      case "CONTINUE_FILE_REGISTRATION":
          return action.payload;
      default:
          return state;
  }
}

export default reducer;
