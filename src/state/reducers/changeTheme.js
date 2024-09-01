const defaultValue = localStorage.getItem('theme') || 'light';

const reducer = (state = defaultValue, action) => {
    switch (action.type) {
        case "theme":
            return action.payload;
        default:
            return state
    }
}

export default reducer;
