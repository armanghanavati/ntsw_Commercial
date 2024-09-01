
const reducer = (state = [], action) => {
    switch (action.type) {
        case "IPT_CODE_INT":
            return action.payload;
        default:
            return state
    }
}

export default reducer;
