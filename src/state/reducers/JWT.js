import Cookies from 'js-cookie';
const defaultVlaue = Cookies.get('JWT') || null;

const reducer = (state = defaultVlaue, action) => {
  switch (action.type) {
    case "JWT":
      return action.payload;
    default:
      return state
  }
}

export default reducer;
