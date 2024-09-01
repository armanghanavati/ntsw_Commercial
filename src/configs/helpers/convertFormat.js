import moment from 'jalali-moment'

const convertFormat = (date) => {
  if (date) {

    const temp = moment.from(date, 'YYYY/MM/DD').locale('fa')
    return temp;
  } else {
    return undefined
  }
};

export default convertFormat
