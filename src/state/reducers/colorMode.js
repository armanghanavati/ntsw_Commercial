const defaultValue = localStorage.getItem('colorMode') || '#024158';

const reducer = (state = defaultValue, action) => {
  switch (action.type) {
    case "colorMode":
      return action.payload;
    default:
      return state
  }
}

export default reducer;
