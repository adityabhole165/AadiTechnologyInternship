export function isFutureDate(date) {
  return (
    new Date(date.toLocaleDateString()) >
    new Date(new Date().toLocaleDateString())
  );
}

export function isFutureDateTime(date) {
  return new Date(date) > new Date();
}
export function getMonthYear() {
  const date = new Date();
  const Month = new Date(date).toLocaleString('default', { month: 'short' });
  const Month_num = new Date(date).getMonth();
  const Year = new Date(date).getFullYear();
  const NewDateFormat = `${Month}-${Year}`;
}
export const getAttendanceLegend = (Status) => {
  //return Status=="Y"?"green":Status=="B"?"blue":"orange"
  return Status == 'Y'
    ? 'mediumturquoise'
    : Status == 'B'
    ? 'lightcoral'
    : Status == 'D'
    ? 'lightsalmon '
    : Status == 'L'
    ? 'Skyblue'
    : Status == 'X'
    ? 'plum'
    : Status == 'N'
    ? 'tomato'
    : 'salmon';
};
export const getDateMonthYearFormattedDash = (date) => {
  let arrDate = date.split(' ')[0].split('-');
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  return `${arrDate[0]}-${monthNames[parseInt(arrDate[1]) - 1]}-${arrDate[2]}`;
};
export function compareStringWithoutSpace(value1, value2) {
  if (value1.replace(/ /g, '') === value2.replace(/ /g, '')) return true;
  else return false;
}
//date='02 Oct 2022'
export function isTodaysDate(date) {
  const todaysDate = new Date().toLocaleString('default', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  return date === getDateFormatted(todaysDate);
}

export function ReturnTimeOrDateYear(date) {
  var dateFormat = new Date(date);
  if (
    new Date(dateFormat.toLocaleDateString()) ===
    new Date(new Date().toLocaleDateString())
  )
    return formatAMPM(dateFormat);
  return date;
}

export const isValueInArrayContains = (value, validarray) => {
  return validarray.some((a) => {
    return a.includes(value);
  });
};

export const isValueInArray = (value, validarray) => {
  return validarray.some((a) => {
    return a === value;
  });
};

export const isRepeat = (value, arr) => {
  return !arr.slice(0, -2).some((a) => {
    return a === value;
  });
};

export const checkIsNumber = (value) => {
  const re = /^[0-9\b]+$/;
  return re.test(value);
};

export const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

export const getDateFormatted = (date) => {
  date = date || new Date();
  let Day = new Date(date).getDate();
  
  const Month = new Date(date).toLocaleString('default', { month: 'short' });
  const Year = new Date(date).getFullYear();
  return `${Day<10?"0"+Day.toString():Day.toString()} ${Month} ${Year}`;
};

export const getDateFormattedDash = (date) => {
  date = date || new Date();
  const Day = new Date(date).getDate();
  const Month = new Date(date).toLocaleString('default', { month: 'short' });
  const Year = new Date(date).getFullYear();
  return `${Day}-${Month}-${Year}`;
};

export const getDateFormatWithSpaceAndMonthInString = (date) => {
  // date = String(date || new Date());
  // date = date.split(" ")[0]
  // date = date.split("-")

  // const month = new Date();
  // month.setMonth(date[1] - 1);
  // date[1] = month.toLocaleString('en-US', { month: 'short' });

  // return `${date[0]} ${date[1]} ${date[2]}`
  return getDateFormatFeedback(date);
};

export const getDateFormatFeedback = (date) => {
  date = String(date || new Date());
  date = date.split(' ')[0];
  date = date.split('-');

  const month = new Date();
  month.setMonth(date[0] - 1);
  date[0] = month.toLocaleString('en-US', { month: 'short' });
  return `${date[1]} ${date[0]} ${date[2]}`;
};

export const getDateFormatFeedbackTime = (date) => {
  date = String(date || new Date());
  let time = date.split(' ')[1] + ' ' + date.split(' ')[2];
  date = date.split(' ')[0];
  date = date.split('/');
  const month = new Date();
  month.setMonth(date[0] - 1);
  date[0] = month.toLocaleString('en-US', { month: 'short' });

  return `${date[1]} ${date[0]} ${date[2]} ${time}`;
};

export const getDateFormatDraftTime = (date) => {
  date = String(date || new Date());
  let time = date.split(' ')[1];
  time = time.split(':')[0] + ':' + time.split(':')[1];
  time = time + ':' + date.split(':')[2];
  date = date.split(' ')[0];
  date = date.split('-');
  const month = new Date();
  month.setMonth(date[0] - 1);
  date[0] = month.toLocaleString('en-US', { month: 'short' });

  return `${date[1]} ${date[0]} ${time}`;
};

export const getDateFormat = (date) => {
  date = date || new Date();
  const Day = new Date(date).getDate();
  const Month = new Date(date).toLocaleString('default', { month: 'short' });
  const Year = new Date(date).getFullYear();
  return `${Day}-${Month}-${Year}`;
};

export const getDateFormat1 = (date) => {
  date = date || new Date();
  const Day = new Date(date).getDate();
  const Month = new Date(date).toLocaleString('default', { month: 'short' });
  const Year = new Date(date).getFullYear();
  return `${Year}-${Month}-${Day}`;
};
export const getHomeworkDateFormatted = (date) => {
  date = date || new Date();
  const Day = new Date(date).getDate();
  const Month = new Date(date).toLocaleString('default', { month: 'short' });
  const Year = new Date(date).getFullYear();
  return `${Day}-${Month}-${Year}`;
};
export const getDateMonthFormatted = (date) => {
  let arrDate = date.split('-');
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  return `${arrDate[0]} ${monthNames[parseInt(arrDate[1]) - 1]}`;
};

export const getDateMonthFormat = (date) => {
  const parts = date.split(' ');
  const arrDate = parts[0].split('-');
  const time = parts[1].split(':').slice(0, 2).join(':');

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  return `${arrDate[0]} ${monthNames[parseInt(arrDate[1]) - 1]} ${time}`;
};

export const getDateMonthYearFormatted = (date) => {
  let arrDate = date.split(' ')[0].split('-');
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  return `${arrDate[0]} ${monthNames[parseInt(arrDate[1]) - 1]} ${arrDate[2]}`;
};
export const getMonthYearFormatted = (date) => {
  date = date || new Date();
  const Day = new Date(date).getDate();
  const Month = new Date(date).toLocaleString('default', { month: 'short' });
  const Year = new Date(date).getFullYear();
  return `${Month}-${Year}`;
};

export const getNextDate = (date, prevNext) => {
  var nextDate = new Date(date);
  // console.log(date,"nextDate",nextDate)
  // console.log(nextDate.getDate() + prevNext,"nextDate",nextDate.getDate())
  nextDate.setDate(nextDate.getDate() + prevNext);
  return getDateFormatted(nextDate);
};

export const getDateFromatDateTime = (date) => {
  date = String(date || new Date());
  date = date.split(' ')[0];
  date = date.split('-');
  return date[0];
};
export const CheckFileValidationUploadPic = (
  fileData,
  allowedFileTypes,
  fileSize
) => {
  const fileExtension = fileData.name.split('.').at(-1);
  if (fileExtension != undefined || null) {
    if (!allowedFileTypes.includes(fileExtension)) {
      return 'Please attach the file in the valid or supportive format';
    } else if (fileData.size > fileSize) {
      return 'Please upload a file smaller than 80 kb';
    } else if (allowedFileTypes.includes(fileExtension)) {
      return null;
    }
  }
};
export const CheckFileValidationEditeProfile = (
  fileData,
  allowedFileTypes,
  fileSize
) => {
  const fileExtension = fileData.name.split('.').at(-1);
  if (fileExtension != undefined || null) {
    if (!allowedFileTypes.includes(fileExtension)) {
      return 'Please attach the file in the valid or supportive format';
    } else if (fileData.size > fileSize) {
      return 'Please upload a file smaller than 1 Mb';
    } else if (allowedFileTypes.includes(fileExtension)) {
      return null;
    }
  }
};
export const monthArray = [
  { Value: 1, Name: 'January' },
  { Value: 2, Name: 'February' },
  { Value: 3, Name: 'March' },
  { Value: 4, Name: 'April' },
  { Value: 5, Name: 'May' },
  { Value: 6, Name: 'June' },
  { Value: 7, Name: 'July' },
  { Value: 8, Name: 'August' },
  { Value: 9, Name: 'September' },
  { Value: 10, Name: 'October' },
  { Value: 11, Name: 'November' },
  { Value: 12, Name: 'December' }
];

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
export const CheckFileValidationAdhar = (
  fileData,
  allowedFileTypes,
  fileSize
) => {
  const fileExtension = fileData?.name?.split('.').at(-1);
  if (fileExtension != undefined || null) {
    if (fileData?.size > fileSize) {
      return 'Please upload a file smaller than 3 MB';
    }
    if (!allowedFileTypes.includes(fileExtension.toUpperCase())) {
      return 'File type is not supportive. Please check the note';
    } else if (allowedFileTypes.includes(fileExtension)) {
      return null;
    }
  }
};

export function isBetweenDate(date, dayCount) {
  var compareDate = new Date(getDateFormatted(new Date()));
  var fromDate = new Date(new Date(date));
  var toDate = getNextDate(fromDate, dayCount);
  return compareDate >= fromDate && compareDate <= new Date(toDate);
}

export const toolbarOptions = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }],
      [{ align: [] }],
      [{ size: ['small', 'normal', 'large', 'huge'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  }
};

export const getImgSrcForBinary = (fileBase64, FileExtension) => {
  return 'data:image/' + FileExtension + ';base64,' + fileBase64;
};
export const sitePath = localStorage.getItem('SiteURL');
export const logoURL =
  'https://riteschoolmobileservicehttps.riteschool.com/images/';
export const androidCurrentAppVersion = '2.1.1';
export const appleCurrentAppVersion = '2.0.6';
export const deviceType =
  typeof window.localStorage.getItem('deviceType') != undefined &&
  window.localStorage.getItem('deviceType') == 'ios'
    ? 'iOS'
    : 'Android';
// export const sitePath = 'https://192.168.1.80';
