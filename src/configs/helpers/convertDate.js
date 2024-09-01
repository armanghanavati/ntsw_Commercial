  import moment from 'jalali-moment'

const convertDate = (date) => {
  if (date) {

    const temp = moment.from(date, 'YYYY/MM/DD').format('YYYY/MM/DD');
    return temp;
  } else {
    return undefined
  }
};

export default convertDate
