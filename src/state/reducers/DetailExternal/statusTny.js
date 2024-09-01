const reducer = (state = "", action) => {
    switch (action.type) {
        case "STATUS_TNY":
            return action.payload;
        default:
            return state;
    }
}

export default reducer;

