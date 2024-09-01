const reducer = (state = {}, action) => {
    switch (action.type) {
        case "DETAIL_EXTERNAL":
            return action.payload;
        default:
            return state;
    }
}

export default reducer;