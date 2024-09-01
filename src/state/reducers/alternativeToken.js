import Cookies from 'js-cookie';
const defaultVlaue = Cookies.get('AlternativeToken') || null;


const reducer = (state = defaultVlaue, action) => {
  switch (action.type) {
    case "AlternativeToken":
      return action.payload;
    default:
      return state
  }
}


export default reducer;
