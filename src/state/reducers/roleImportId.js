const reducer = (state = 0, action) => {
    switch (action.type) {
        case "ROLE_GENERALCODE_INT":
            return action.payload;
        default:
            return state
    }
}

export default reducer;