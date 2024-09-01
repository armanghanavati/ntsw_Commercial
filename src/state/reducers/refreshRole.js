const reducer = (
  state = {
    isRefresh: false,
  },
  action
) => {
  switch (action.type) {
    case "refreshRole":
      return {
        isRefresh: action.payload?.isRefresh,
      };
    default:
      return state;
  }
};

export default reducer;
