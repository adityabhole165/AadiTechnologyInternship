export function isFutureDate(date) {
    return ((new Date(date.toLocaleDateString()))
        >
        (new Date(new Date().toLocaleDateString())))
}

export function changeDateFormat(date) {
    const dateValues = date?.split("-")
    if (Array.isArray(dateValues)) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return {
            day: Number(dateValues[0]),
            month: Number((months.indexOf(dateValues[1]) + 1)),
            year: Number(dateValues[2])
        }
    } else {
        return {
            day: 0,
            month: 0,
            year: 0
        }
    }
}

//date='02 Oct 2022'
export function isTodaysDate(date) {
    const dateValue = changeDateFormat(date).day + '/' + changeDateFormat(date).month + '/' + changeDateFormat(date).year
    return dateValue === new Date().toLocaleDateString()
}

//date='02 Oct 2022'
export function isBetweenDate(date, dayCount) {
    var fromDate = new Date(new Date().toLocaleDateString())
    var toDate = getNextDate(fromDate,dayCount)
    var compareDate = new Date(new Date(date).toLocaleDateString())
    return ((compareDate  >= fromDate) && 
    (compareDate <= toDate))
}

export function ReturnTimeOrDateYear(date){
    var dateFormat = new Date(date);
    if(new Date(dateFormat.toLocaleDateString()) === new Date(new Date().toLocaleDateString()))
    return formatAMPM(dateFormat)
    return date;

}

export const isValueInArrayContains = (value,validarray) => {
    return validarray.some((a) => {
        return (a.includes(value))
    })
}

export const isValueInArray = (value,validarray) => {
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
    return `${Day}-${Month}-${Year}`;
}
export const getNextDate = (date,prevNext) => {
    return new Date(
        changeDateFormat(date).year,
        changeDateFormat(date).month - 1,
        changeDateFormat(date).day + prevNext)
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

  export const CheckFileValidation = (fileData,allowedFileTypes, fileSize) => {
    const fileExtension = fileData?.name?.split('.').at(-1);
    if (fileExtension != undefined || null) {
      if (!allowedFileTypes.includes(fileExtension)) {
        return 'File does not support. Please cheked Note';
      } else if (allowedFileTypes.includes(fileExtension)) {
        return null;
      }
      if (fileData?.size > fileSize) {
        return 'Please upload a file smaller than 20 MB';
      }
    }
  };

  export const sitePath = 'https://192.168.1.80';