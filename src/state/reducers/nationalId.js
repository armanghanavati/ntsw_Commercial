// const defaultValue = localStorage.getItem("mainUserCode") || null;

const reducer = (state = null, action) => {
  switch (action.type) {
    case "nationalId":
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
