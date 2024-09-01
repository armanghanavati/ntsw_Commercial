const reducer = (state = [], action) => {
    switch (action.type) {
        case "DETAIL":
            return action.payload;
        default:
            return state;
    }
}

export default reducer;