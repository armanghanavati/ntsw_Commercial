// const defaultValue = localStorage.getItem("mainUserCode") || null;

const reducer = (state = null, action) => {
  switch (action.type) {
    case "mainId":
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
