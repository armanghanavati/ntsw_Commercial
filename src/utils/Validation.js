import StringHelpers from "../configs/helpers/string-helpers";
import moment from "jalali-moment";

export default {
  required: (value, message = null) => {
    if (value == 0) {
      return true;
    } else if (!!value) {
      return true;
    }
    return message || "پرکردن این فیلد الزامی است";
  },

  requiredForeign: (value, message = null) =>
    value === 0 || !!value || message || "filling this field is mandatory",
  digits: (value, length) => {
    if (!value) {
      return true;
    }
    return value.length === length || ` یک مقدار عددی ${length} رقمی وارد کنید`;
  },

  decimal: (value, decimalLenght) => {
    if (!value) {
      return true;
    }
    return (
      (value >= 0 &&
        (value * Math.pow(10, Number(decimalLenght))).toFixed(8) % 1 === 0) ||
      (decimalLenght === 0
        ? `عدد صحیح نامنفی وارد نمایید`
        : `عدد صحیح نامنفی یا اعشاری (تا ${decimalLenght} رقم اعشار) وارد نمایید.`)
    );
  },

  minLength: (value, length) => {
    if (!value) {
      return true;
    }
    return (
      (value ? value.trim() : "").length >= length ||
      `حداقل ${length} کاراکتر وارد نمایید`
    );
  },

  minLengthForeign: (value, length) => {
    if (!value) {
      return true;
    }
    return (
      (value ? value.trim() : "").length >= length ||
      `حداقل ${length} کاراکتر وارد نمایید`
    );
  },

  maxLength: (value, length) => {
    if (!value) {
      return true;
    }
    return (
      (value ? value.trim() : "").length <= length ||
      `حداقل ${length} کاراکتر وارد نمایید`
    );
  },

  numberValue: (value) => {
    if (!value) {
      return true;
    }
    return /^\d+$/.test(value) || `عدد صحیح وارد نمایید`;
  },

  maxValue: (value, maximumNumber, message = undefined) =>
    (Number(value) || 0) <= (Number(maximumNumber) || 0) ||
    (message ? message : ` مقدار مجاز کوچکتر از ${maximumNumber + 1} می باشد`),

  minValue: (value, mainimumNumber, message = undefined) =>
    (Number(value) || 0) >= (Number(mainimumNumber) || 0) ||
    (message ? message : `حداقل مقدار مجاز ${mainimumNumber} می باشد`),

  date: (value) =>
    RegExp(
      "^(?:(12|13|14)[0-9]{2})[/.](0[1-9]|1[012])[/.](0[1-9]|[12][0-9]|3[01])$"
    ).test(StringHelpers.convertNumbersToLatin(value)) ||
    "تاریخ وارد شده صحیح نمیباشد",

  nationalCode: (value) => {
    const nationalCode = value
      ? StringHelpers.convertNumbersToLatin(value.trim())
      : "";

    if (nationalCode === "") {
      return true;
    }

    if (
      nationalCode === "" ||
      nationalCode.length !== 10 ||
      isNaN(parseInt(nationalCode, 10))
    ) {
      return "کد ملی وارد شده صحیح نمی باشد";
    }

    const allDigitsAreEqual = [
      "0000000000",
      "1111111111",
      "2222222222",
      "3333333333",
      "4444444444",
      "5555555555",
      "6666666666",
      "7777777777",
      "8888888888",
      "9999999999",
    ];

    if (allDigitsAreEqual.indexOf(nationalCode) >= 0) {
      return "کد ملی وارد شده صحیح نمی باشد";
    }

    const num0 = parseInt(nationalCode[0], 10) * 10;
    const num2 = parseInt(nationalCode[1], 10) * 9;
    const num3 = parseInt(nationalCode[2], 10) * 8;
    const num4 = parseInt(nationalCode[3], 10) * 7;
    const num5 = parseInt(nationalCode[4], 10) * 6;
    const num6 = parseInt(nationalCode[5], 10) * 5;
    const num7 = parseInt(nationalCode[6], 10) * 4;
    const num8 = parseInt(nationalCode[7], 10) * 3;
    const num9 = parseInt(nationalCode[8], 10) * 2;
    const a = parseInt(nationalCode[9], 10);

    const b = num0 + num2 + num3 + num4 + num5 + num6 + num7 + num8 + num9;
    const c = b % 11;

    return (
      (c < 2 && a === c) ||
      (c >= 2 && 11 - c === a) ||
      "کد ملی وارد شده صحیح نمی باشد"
    );
  },

  nationalCodeForeign: (value) => {
    const nationalCode = value
      ? StringHelpers.convertNumbersToLatin(value.trim())
      : "";

    if (nationalCode === "") {
      return true;
    }

    if (
      nationalCode === "" ||
      nationalCode.length !== 10 ||
      isNaN(parseInt(nationalCode, 10))
    ) {
      return "the entered national code is not correct";
    }

    const allDigitsAreEqual = [
      "0000000000",
      "1111111111",
      "2222222222",
      "3333333333",
      "4444444444",
      "5555555555",
      "6666666666",
      "7777777777",
      "8888888888",
      "9999999999",
    ];

    if (allDigitsAreEqual.indexOf(nationalCode) >= 0) {
      return "the entered national code is not correct";
    }

    const num0 = parseInt(nationalCode[0], 10) * 10;
    const num2 = parseInt(nationalCode[1], 10) * 9;
    const num3 = parseInt(nationalCode[2], 10) * 8;
    const num4 = parseInt(nationalCode[3], 10) * 7;
    const num5 = parseInt(nationalCode[4], 10) * 6;
    const num6 = parseInt(nationalCode[5], 10) * 5;
    const num7 = parseInt(nationalCode[6], 10) * 4;
    const num8 = parseInt(nationalCode[7], 10) * 3;
    const num9 = parseInt(nationalCode[8], 10) * 2;
    const a = parseInt(nationalCode[9], 10);

    const b = num0 + num2 + num3 + num4 + num5 + num6 + num7 + num8 + num9;
    const c = b % 11;

    return (
      (c < 2 && a === c) ||
      (c >= 2 && 11 - c === a) ||
      "the entered national code is not correct"
    );
  },

  fileSize: (value, maxFileSizeInKB) => {
    if (!value) {
      return true;
    }

    if (Array.isArray(value)) {
      for (const file of value) {
        if (file.size > maxFileSizeInKB * 1000) {
          return `حداکثر حجم فایل باید ${maxFileSizeInKB} کیلوبایت باشد`;
        }
      }
    } else if (value.size > maxFileSizeInKB * 1000) {
      return `حداکثر حجم فایل باید ${maxFileSizeInKB} کیلوبایت باشد`;
    }

    return true;
  },
  fileSizeImage: (value, maxFileSizeInKB) => {
    if (!value) {
      return true;
    }
    let resulteValue = parseInt(value.size) / 1024;
    if (Array.isArray(value)) {
      for (const file of value) {
        let resulteFile = parseInt(file.size) / 1024;
        if (file.size > maxFileSizeInKB * 1000) {
          return `اندازه تصویر انتخابی شما ${
            value.size >= 1000 ? "کیلوبایت" : "بایت"
          } میباشد`;
        } else if (file.size < maxFileSizeInKB * 1000) {
          return `اندازه تصویر انتخابی شما ${Math.ceil(resulteFile)} ${
            file.size >= 1000 ? "کیلوبایت" : "بایت"
          } میباشد`;
        }
      }
    } else if (value.size > maxFileSizeInKB * 1000) {
      return `اندازه تصویر انتخابی شما ${Math.ceil(resulteValue)} ${
        value.size >= 1000 ? "کیلوبایت" : "بایت"
      } میباشد`;
    } else if (value.size < maxFileSizeInKB * 1000) {
      return `اندازه تصویر انتخابی شما ${Math.ceil(resulteValue)} ${
        value.size >= 1000 ? "کیلوبایت" : "بایت"
      } میباشد`;
    }
    return true;
  },
  fileSizeImageForeign: (value, maxFileSizeInKB) => {
    if (!value) {
      return true;
    }
    let resulteValue = parseInt(value.size) / 1024;
    if (Array.isArray(value)) {
      for (const file of value) {
        let resulteFile = parseInt(file.size) / 1024;
        if (file.size > maxFileSizeInKB * 1000) {
          return `your chosen image size is ${Math.ceil(resulteFile)} ${
            file.size >= 1000 ? "KB" : "Bit"
          }`;
        } else if (file.size < maxFileSizeInKB * 1000) {
          return `your chosen image size is ${Math.ceil(resulteFile)} ${
            file.size >= 1000 ? "KB" : "Bit"
          }`;
        }
      }
    } else if (value.size > maxFileSizeInKB * 1000) {
      return `your chosen image size is ${Math.ceil(resulteValue)} ${
        value.size >= 1000 ? "KB" : "Bit"
      }`;
    } else if (value.size < maxFileSizeInKB * 1000) {
      return `your chosen image size is ${Math.ceil(resulteValue)} ${
        value.size >= 1000 ? "KB" : "Bit"
      }`;
    }
    return true;
  },
  maxValue: (value, maximumNumber, message = undefined) =>
    (Number(value) || 0) <= (Number(maximumNumber) || 0) ||
    (message ? message : ` مقدار مجاز کوچکتر از ${maximumNumber + 1} می باشد`),

  fileFormat: (file, formats, validformats) =>
    formats?.includes(file?.type) || ` فرمت مجاز ${validformats} میباشد`,

  fileFormatForeign: (file, formats, validformats) =>
    formats?.includes(file?.type) || ` allowed format is ${validformats} `,

  postCode: (value) => {
    const postCode = value
      ? StringHelpers.convertNumbersToLatin(value.trim())
      : "";

    if (postCode === "") {
      return "کد پستی وارد شده صحیح نمی باشد";
    }

    if (postCode.length !== 10 || !RegExp(/^\d+$/).test(postCode)) {
      return "کد پستی وارد شده صحیح نمی باشد";
    }

    const firstFiveDigits = postCode.substring(0, 5);

    if (
      firstFiveDigits.indexOf("0") > -1 ||
      firstFiveDigits.indexOf("2") > -1 ||
      postCode[4] === "5" ||
      postCode[5] === "0" ||
      postCode.substring(6, 10) === "0000"
    ) {
      return "کد پستی وارد شده صحیح نمی باشد";
    }

    return true;
  },

  postCodeFreign: (value) => {
    const postCode = value
      ? StringHelpers.convertNumbersToLatin(value.trim())
      : "";

    if (postCode === "") {
      return "the postal code entered is not correct";
    }

    if (postCode.length !== 10 || !RegExp(/^\d+$/).test(postCode)) {
      return "the postal code entered is not correct";
    }

    const firstFiveDigits = postCode.substring(0, 5);

    if (
      firstFiveDigits.indexOf("0") > -1 ||
      firstFiveDigits.indexOf("2") > -1 ||
      postCode[4] === "5" ||
      postCode[5] === "0" ||
      postCode.substring(6, 10) === "0000"
    ) {
      return "the postal code entered is not correct";
    }

    return true;
  },

  phoneNumber: (value) => {
    const phoneNumber = value
      ? StringHelpers.convertNumbersToLatin(value.trim())
      : "";

    if (phoneNumber === "") {
      return true;
    }

    if (
      phoneNumber.length !== 11 ||
      !RegExp(/^\d+$/).test(phoneNumber) ||
      phoneNumber[0] !== "0" ||
      phoneNumber[1] !== "9"
    ) {
      return "شماره تلفن همراه وارد شده صحیح نمی باشد";
    }

    return true;
  },
  phoneNumberForeign: (value) => {
    const phoneNumber = value
      ? StringHelpers.convertNumbersToLatin(value.trim())
      : "";

    if (phoneNumber === "") {
      return true;
    }

    if (
      phoneNumber.length !== 11 ||
      !RegExp(/^\d+$/).test(phoneNumber) ||
      phoneNumber[0] !== "0" ||
      phoneNumber[1] !== "9"
    ) {
      return "the mobile phone number entered is not correct";
    }

    return true;
  },

  checkNumber: (value) => {
    const phoneNumber = value
      ? StringHelpers.convertNumbersToLatin(value.trim())
      : "";

    if (phoneNumber === "") {
      return true;
    }

    if (
      phoneNumber.length !== 11 ||
      !RegExp(/^[\u06F0-\u06F90-9]+$/).test(phoneNumber) ||
      phoneNumber[0] !== "0"
    ) {
      return "شماره تلفن وارد شده صحیح نمی باشد";
    }

    return true;
  },

  checkNumberForeign: (value) => {
    const phoneNumber = value
      ? StringHelpers.convertNumbersToLatin(value.trim())
      : "";

    if (phoneNumber === "") {
      return true;
    }

    if (
      phoneNumber.length !== 11 ||
      !RegExp(/^[\u06F0-\u06F90-9]+$/).test(phoneNumber) ||
      phoneNumber[0] !== "0"
    ) {
      return "the phone number entered is not correct";
    }

    return true;
  },

  isFileRequired: (value, fileName) => {
    if (!fileName && !!!value) {
      return "پرکردن این فیلد الزامی است";
    }
    return true;
  },

  email: (value) => {
    const email = value
      ? StringHelpers.convertNumbersToLatin(value.trim())
      : "";

    if (email === "") {
      return true;
    }

    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "ایمیل وارد شده صحیح نمیباشد";
  },

  emailFreign: (value) => {
    const email = value
      ? StringHelpers.convertNumbersToLatin(value.trim())
      : "";

    if (email === "") {
      return true;
    }

    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "The entered email is not correct";
  },
  serialNumber: (value) => {
    if (!value) {
      return true;
    }
    const pattern = /^(?=.{8,16}$)[0-9]{5}-[A-Za-z0-9_.]{2,10}$/;
    return pattern.test(value) || "سریال وارد شده صحیح نمیباشد";
  },
  passwordNumber: (value) => {
    if (!value) {
      return true;
    }

    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#/^]{8,}$/;
    if (pattern.test(value)) {
      return true;
    } else if (!pattern.test(value)) {
      return "کلمه عبور حداقل بین 8 و25 کاراکتر 3 مورد از انواع کاراکتر- اعداد- حروف کوچک- حروف بزرگ و علائم را دارا باشد";
    }
  },

  repeatPasswordNumber: (value, repeatValue) => {
    if (!value) {
      return true;
    }
    return value === repeatValue || "لطفا مقدار یکسان وارد فرمایید";
  },

  repeatPasswordNumberForeign: (value, repeatValue) => {
    if (!value) {
      return true;
    }
    return value === repeatValue || "please enter the same amount";
  },

  passwordNumberForeign: (value) => {
    if (!value) {
      return true;
    }

    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#/^]{8,}$/;
    if (pattern.test(value)) {
      return true;
    } else if (!pattern.test(value)) {
      return "the password must contain at least 8 and 25 characters, 3 types of characters - numbers - lowercase letters - uppercase letters and symbols";
    }
  },

  legalNationalCode: (value) => {
    if (!value) {
      return true;
    }

    const L = value.length;

    if (L < 11 || parseInt(value, 10) === 0) {
      return "شناسه ملی وارد شده صحیح نمی باشد";
    }

    if (parseInt(value.substr(3, 6), 10) === 0) {
      return "شناسه ملی وارد شده صحیح نمی باشد";
    }

    const c = parseInt(value.substr(10, 1), 10);
    const d = parseInt(value.substr(9, 1), 10) + 2;
    const z = new Array(29, 27, 23, 19, 17);
    let s = 0;
    for (let i = 0; i < 10; i++) {
      s += (d + parseInt(value.substr(i, 1), 10)) * z[i % 5];
    }
    s = s % 11;
    if (s === 10) {
      s = 0;
    }
    return c === s;
  },
  legalNationalCodeOrNationalCode: (value) => {
    if (!value) {
      return true;
    }
    // شناسه ملی
    const c = parseInt(value.substr(10, 1), 10);
    const d = parseInt(value.substr(9, 1), 10) + 2;
    const z = new Array(29, 27, 23, 19, 17);
    let s = 0;
    for (let i = 0; i < 10; i++) {
      s += (d + parseInt(value.substr(i, 1), 10)) * z[i % 5];
    }
    s = s % 11;
    if (s === 10) {
      s = 0;
    }
    // کدملی
    const nationalCode = value
      ? StringHelpers.convertNumbersToLatin(value.trim())
      : "";
    const allDigitsAreEqual = [
      "0000000000",
      "1111111111",
      "2222222222",
      "3333333333",
      "4444444444",
      "5555555555",
      "6666666666",
      "7777777777",
      "8888888888",
      "9999999999",
    ];

    if (allDigitsAreEqual.indexOf(nationalCode) >= 0) {
      return "کد/شناسه ملی وارد شده صحیح نمیباشد";
    }
    const num0 = parseInt(nationalCode[0], 10) * 10;
    const num2 = parseInt(nationalCode[1], 10) * 9;
    const num3 = parseInt(nationalCode[2], 10) * 8;
    const num4 = parseInt(nationalCode[3], 10) * 7;
    const num5 = parseInt(nationalCode[4], 10) * 6;
    const num6 = parseInt(nationalCode[5], 10) * 5;
    const num7 = parseInt(nationalCode[6], 10) * 4;
    const num8 = parseInt(nationalCode[7], 10) * 3;
    const num9 = parseInt(nationalCode[8], 10) * 2;
    const a = parseInt(nationalCode[9], 10);

    const b = num0 + num2 + num3 + num4 + num5 + num6 + num7 + num8 + num9;
    const cc = b % 11;

    return (
      c === s ||
      (cc < 2 && a === cc) ||
      (cc >= 2 && 11 - cc === a) ||
      "کد/شناسه ملی وارد شده صحیح نمیباشد"
    );
  },

  minimumDate: (value, minDate) => {
    if (!value || !minDate) {
      return true;
    }
    const date1 = moment
      .from(`${value?.year}/${value?.month}/${value?.day}`, "fa", "YYYY/M/D ")
      .format("YYYY-MM-DD");
    const date2 = moment
      .from(
        `${minDate?.year}/${minDate?.month}/${minDate?.day}`,
        "fa",
        "YYYY/M/D "
      )
      .format("YYYY-MM-DD");
    return (
      date1 >= date2 ||
      `تاریخ انتخاب شده از ${minDate?.year}/${minDate?.month}/${minDate?.day} نمیتواند کوچکتر باشد`
    );
  },

  minimumDateEn: (value, minDate) => {
    if (!value || !minDate) {
      return true;
    }
    const date1 = moment
      .from(`${value?.year}/${value?.month}/${value?.day}`, "en", "YYYY/M/D ")
      .format("YYYY-MM-DD");
    const date2 = moment
      .from(
        `${minDate?.year}/${minDate?.month}/${minDate?.day}`,
        "en",
        "YYYY/M/D "
      )
      .format("YYYY-MM-DD");
    return (
      date1 >= date2 ||
      `تاریخ انتخاب شده از ${minDate?.year}/${minDate?.month}/${minDate?.day} نمیتواند کوچکتر باشد`
    );
  },
  maximumDate: (value, maxDate) => {
    if (!value || !maxDate) {
      return true;
    }
    const date1 = moment
      .from(`${value?.year}/${value?.month}/${value?.day}`, "fa", "YYYY/M/D ")
      .format("YYYY-MM-DD");
    const date2 = moment
      .from(
        `${maxDate?.year}/${maxDate?.month}/${maxDate?.day}`,
        "fa",
        "YYYY/M/D "
      )
      .format("YYYY-MM-DD");
    return (
      date2 >= date1 ||
      `تاریخ انتخاب شده از ${maxDate?.year}/${maxDate?.month}/${maxDate?.day} نمیتواند بزرگتر باشد`
    );
  },
  maximumDateEn: (value, maxDate) => {
    if (!value || !maxDate) {
      return true;
    }
    const date1 = moment
      .from(`${value?.year}/${value?.month}/${value?.day}`, "en", "YYYY/M/D ")
      .format("YYYY-MM-DD");
    const date2 = moment
      .from(
        `${maxDate?.year}/${maxDate?.month}/${maxDate?.day}`,
        "en",
        "YYYY/M/D "
      )
      .format("YYYY-MM-DD");
    return (
      date2 >= date1 ||
      `تاریخ انتخاب شده از ${maxDate?.year}/${maxDate?.month}/${maxDate?.day} نمیتواند بزرگتر باشد`
    );
  },
  lettersLatin: (value) => {
    if (!value) {
      return true;
    }

    const pattern = /^[a-zA-Z\s]*$/;
    if (pattern.test(value)) {
      return true;
    } else if (!pattern.test(value)) {
      return "فقط حروف لاتین مورد قبول است";
    }
  },
  lettersPersian: (value) => {
    if (!value) {
      return true;
    }

    const pattern = /^[\u0600-\u06FF\s]+$/;
    if (pattern.test(value)) {
      return true;
    } else if (!pattern.test(value)) {
      return "فقط حروف فارسی مورد قبول است";
    }
  },
};
