const reducer = (state = [], action) => {
    switch (action.type) {
        case "INFO_EXT_TAB":
            return action.payload;
        default:
            return state;
    }
}

export default reducer;