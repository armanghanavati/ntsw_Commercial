const reducer = (state = {
  isModalOpen: false,
  describe: '',
  title:'',
  type: ''
}, action) => {
  switch (action.type) {
    case "messageModal":
      return {
        type: action.payload?.type || 'error',
        isModalOpen: action.payload?.isModalOpen,
        describe: action.payload?.describe,
        title: action.payload?.title,
      }
        ;
    default:
      return state
  }
}

export default reducer;
