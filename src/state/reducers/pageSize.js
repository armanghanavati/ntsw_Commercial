export const PageSizeReducer = (state = 25, action) => {
    switch (action.type) {
        case "PAGE_SIZE":
            return action.payload;
        default:
            return state;
    }
};
