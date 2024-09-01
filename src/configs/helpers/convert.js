const convert = (date) => {
  let day = date?.day;
  let month = date?.month;
  let year = date?.year;
  let resulte = year + "/" + month + "/" + day;
  let newResulte = resulte.toString();
  if (date) {
    return newResulte;
  } else {
    return undefined;
  }
};

export default convert;

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
