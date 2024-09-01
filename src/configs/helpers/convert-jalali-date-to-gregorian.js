import moment from "jalali-moment";

const convertJalaliDateToGregorian = (date) => {
  if (date) {
    const temp = moment
      .from(`${date?.year}/${date?.month}/${date?.day}`, "fa", "YYYY/MM/DD ")
      .format("jYYYY/jMM/jDD");
    return temp;
  } else {
    return undefined;
  }
};

export default convertJalaliDateToGregorian;
