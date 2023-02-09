export function isFutureDate(date) {
    return ((new Date(date.toLocaleDateString()))
        >
        (new Date(new Date().toLocaleDateString())))
}

export function getMonthYear() {
    const date = new Date();
    const Month = new Date(date).toLocaleString('default', { month: 'short' });
    const Month_num = new Date(date).getMonth();
    const Year = new Date(date).getFullYear()
    const NewDateFormat = `${Month}-${Year}`;

}

//date='02 Oct 2022'
export function isTodaysDate(date) {
    const todaysDate = new Date().toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric' })
    return date === getDateFormatted(todaysDate)
}

export function ReturnTimeOrDateYear(date) {
    var dateFormat = new Date(date);
    if (new Date(dateFormat.toLocaleDateString()) === new Date(new Date().toLocaleDateString()))
        return formatAMPM(dateFormat)
    return date;

}

export const isValueInArrayContains = (value, validarray) => {
    return validarray.some((a) => {
        return (a.includes(value))
    })
}

export const isValueInArray = (value, validarray) => {
    return validarray.some((a) => {
        return (a === value)
    })
}

export const isRepeat = (value, arr) => {
    return !arr.slice(0, -2).some((a) => {
        return (a === value)
    })
}

export const checkIsNumber = (value) => {
    const re = /^[0-9\b]+$/;
    return re.test(value)
}

const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export const getDateFormatted = (date) => {
    date = date || new Date();
    const Day = new Date(date).getDate();
    const Month = new Date(date).toLocaleString('default', { month: 'short' });
    const Year = new Date(date).getFullYear();
    return `${Day} ${Month} ${Year}`;
}

export const getNextDate = (date, prevNext) => {
    var nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + prevNext);
    return nextDate.toLocaleString('default', { day: '2-digit', month: 'short', year: 'numeric' })
}

export const monthArray = [
    { Value: 1, Name: "January" },
    { Value: 2, Name: "February" },
    { Value: 3, Name: "March" },
    { Value: 4, Name: "April" },
    { Value: 5, Name: "May" },
    { Value: 6, Name: "June" },
    { Value: 7, Name: "July" },
    { Value: 8, Name: "August" },
    { Value: 9, Name: "September" },
    { Value: 10, Name: "October" },
    { Value: 11, Name: "November" },
    { Value: 12, Name: "December" },
]

export const ChangeFileIntoBase64 = (fileData) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(fileData);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };
export const CheckFileValidation = (fileData, allowedFileTypes, fileSize) => {
    const fileExtension = fileData?.name?.split('.').at(-1);
    if (fileExtension != undefined || null) {

        if (fileData?.size > fileSize) {
            return 'Please upload a file smaller than 20 MB';
        }
        if (!allowedFileTypes.includes(fileExtension.toUpperCase())) {
            return 'File does not support. Please check Note';
        } else if (allowedFileTypes.includes(fileExtension)) {
            return null;
        }
    }
};

export function isBetweenDate(date, dayCount) {
    var fromDate = new Date(new Date().toLocaleDateString())
    var toDate = getNextDate(fromDate, dayCount)
    var compareDate = new Date(new Date(date).toLocaleDateString())
    return ((compareDate >= fromDate) &&
        (compareDate <= new Date(toDate)))
}

export const sitePath = localStorage.getItem('SiteURL');
export const logoURL = "https://riteschoolmobileservicehttps.riteschool.com/images/";
export const androidCurrentAppVersion = "2.0.4";
export const appleCurrentAppVersion = "2.0.0";
export const deviceType = ((typeof window.localStorage.getItem('deviceType') != undefined &&
    window.localStorage.getItem('deviceType') == 'ios') ? "iOS" : "Android");
// export const sitePath = 'https://192.168.1.80';