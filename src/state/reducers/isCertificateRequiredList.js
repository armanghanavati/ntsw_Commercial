
const reducer = (state = [], action) => {
  switch (action.type) {
    case "isCertificateRequiredList":
      return action.payload;
    default:
      return state
  }
}


export default reducer;
