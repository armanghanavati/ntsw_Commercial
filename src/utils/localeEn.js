import locale from 'antd/es/locale/en_US';

export default {
    ...locale,
    DatePicker: {
        ...locale.DatePicker,
        lang: {
            ...locale.DatePicker.lang,
            placeholder: 'Select date',
            today: 'Today',
            now: 'Now',
            backToToday: 'Back to Today',
            ok: 'OK',
            clear: 'Clear',
            month: 'Month',
            year: 'Year',
            timeSelect: 'Select time',
            dateSelect: 'Select date',
            monthSelect: 'Choose a month',
            yearSelect: 'Choose a year',
            decadeSelect: 'Choose a decade',
            yearFormat: 'YYYY',
            dayFormat: 'D',
            dateFormat: 'M/D/YYYY',
            dateTimeFormat: 'M/D/YYYY HH:mm:ss',
            monthFormat: 'MMMM',
            monthBeforeYear: false,
        },
    },
};