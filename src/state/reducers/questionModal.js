const reducer = (
  state = {
    isModalOpen: false,
    showColorFooter: false,
    describe: "",
    answer: "",
    title: "ثبت اطلاعات",
    titleOfSubmitButton: "بله",
    titleOfCancelButton: "خیر",
    name: "",
  },
  action
) => {
  switch (action.type) {
    case "questionModal":
      return {
        isModalOpen: action.payload?.isModalOpen,
        describe: action.payload?.describe,
        answer: action.payload?.answer,
        title: action.payload?.title,
        showColorFooter: action.payload?.showColorFooter,
        backgroundColorSubmitButton:
          action.payload?.backgroundColorSubmitButton,
        titleOfSubmitButton: action.payload?.titleOfSubmitButton,
        titleOfCancelButton: action.payload?.titleOfCancelButton,
        name: action.payload?.name,
      };
    default:
      return state;
  }
};

export default reducer;
