const defaultValue = localStorage.getItem('personCode') || null;

const reducer = (state = defaultValue, action) => {
    switch (action.type) {
        case "role":
            return action.payload;
        default:
            return state
    }
}

export default reducer;
