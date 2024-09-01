  import moment from 'jalali-moment'

const converGregorianDateToJalali = (date) => {
  if (date) {

    const temp = moment.from(date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
    return temp;
  } else {
    return undefined
  }
};

export default converGregorianDateToJalali
