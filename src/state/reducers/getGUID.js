import Cookies from 'js-cookie';
const defaultVlaue = Cookies.get('ssdssh')?.split('=')[1] || null;

const reducer = (state = defaultVlaue, action) => {
  switch (action.type) {
    case "GUid":
      return action.payload;
    default:
      return state
  }
}

export default reducer;
