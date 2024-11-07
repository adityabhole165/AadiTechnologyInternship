
export const WeekdaysFull = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
// export const WeekdaysFull = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
export function isFutureDate(date) {
  return (
    new Date(date.toLocaleDateString()) >
    new Date(new Date().toLocaleDateString())
  );
}
export function isGreaterThanDate(date1, date2) {

  return (
    new Date(date1) >
    new Date(date2)
  );
}

export function isLessThanDate(date1, date2) {

  return (
    new Date(date1) <
    new Date(date2)
  );
}

export function isOutsideAcademicYear(date) {
  return (
    (new Date(sessionStorage.getItem('StartDate')) > new Date(date)) ||
    (new Date(sessionStorage.getItem('EndDate')) < new Date(date))
  );
}

export function isEqualtonDate(date1, date2) {
  return (
    new Date(date1) ==
    new Date(date2)
  );
}
export function isFutureDate1(date) {
  return (
    new Date(date.toLocaleDateString()) <
    new Date(new Date().toLocaleDateString())
  );
}

export function Equal(date) {
  return new Date(date) == new Date();
}

export function isGreaterDate(date1, date2) {

  return (
    new Date(date1.toLocaleDateString()) >
    new Date(date2.toLocaleDateString())
  );
}


export function isGreaterOrEqualDate(date1) {

  return (
    new Date(date1.toDateString()) >=
    new Date((new Date()).toDateString())
  );
}


export const formatDateAsDDMMMYYYY = (date) => {
  const Day = new Date(date).getDate().toString().padStart(2, '0');
  const Month = monthNames[new Date(date).getMonth()];
  const Year = new Date(date).getFullYear();
  return `${Day}-${Month}-${Year}`;
};


export function isFutureDateTime(date) {
  return new Date(date) > new Date();
}
export function isPastDateTime(date) {
  return new Date(date) < new Date();
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
export const monthNames = [
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

export const getDateMonthYearFormattedDash = (date) => {
  let arrDate = date.split(' ')[0].split('-');

  return `${arrDate[0]}-${monthNames[parseInt(arrDate[1]) - 1]}-${arrDate[2]}`;
};

export const getDateMonthYearDayDash = (date) => {
  let arrDate = date.split(' ')[0].split('-');
  let dateFormatted = `${arrDate[0]}-${monthNames[parseInt(arrDate[1]) - 1]}-${arrDate[2]}`
  let Weekday = new Date(dateFormatted).getDay()

  return `${arrDate[0]}-${monthNames[parseInt(arrDate[1]) - 1]}-${arrDate[2]} (${WeekdaysFull[Weekday]})`;
};


export const getDateMonthYearTimeDayDash = (date) => {
  let arrDate = date.split(' ')[0].split('-');
  let dateFormatted = `${arrDate[0]}-${monthNames[parseInt(arrDate[1]) - 1]}-${arrDate[2]}`
  let Weekday = new Date(dateFormatted).getDay()
  let yearIndex = arrDate[0].length == 4 ? 0 : 2
  let dateIndex = arrDate[0].length == 2 ? 0 : 2

  return `${arrDate[dateIndex]}-${monthNames[parseInt(arrDate[1]) - 1]}-${arrDate[yearIndex]} ${date.split(' ')[1].substring(0, 5)}`;
};


export const getDateMonthYearFormatted = (date) => {
  let separator = date.indexOf('/') > 0 ? '/' : '-'
  let arrDate = date.split(' ')[0].split(separator);
  let yearIndex = arrDate[0].length == 4 ? 0 : 2
  let dateIndex = arrDate[0].length == 2 ? 0 : 2
  return `${arrDate[dateIndex]} ${monthNames[parseInt(arrDate[1]) - 1]} ${arrDate[yearIndex]}`;
};
export const getYearFirstDateFormatted = (date) => {
  let separator = date.indexOf('/') > 0 ? '/' : '-'
  let arrDate = date.split(' ')[0].split(separator);
  let yearIndex = arrDate[0].length == 4 ? 0 : 2
  let dateIndex = arrDate[0].length == 2 ? 0 : 2
  return `${arrDate[dateIndex]} ${monthNames[parseInt(arrDate[1]) - 1]} ${arrDate[yearIndex]}`;
};
export const getYearFirstDateDashFormatted = (date) => {
  let separator = date.indexOf('/') > 0 ? '/' : '-'

  let arrDate = date.split(separator)
  return `${arrDate[2]} ${monthNames[parseInt(arrDate[1]) - 1]} ${arrDate[0]}`;
};
export const getDateMonthSpace = (date) => {
  let arrDate = date.split(' ')[0].split('-');

  return `${arrDate[0]} ${monthNames[parseInt(arrDate[1]) - 1]}`;
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
export function getDateDDMMMDash(date) {
  const Day = new Date(date).getDate();
  const Month = monthNames[date.getMonth()];
  const Year = new Date(date).getFullYear();
  return `${Day.toString().padStart(2, '0')}-${Month.toString().padStart(2, '0')}-${Year}`;
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
  return `${Day < 10 ? '0' + Day.toString() : Day.toString()} ${Month} ${Year}`;
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
export const getCalendarDateFormatDate = (date) => {
  date = String(date || new Date());
  date = date.split(' ')[0];
  date = date.split('-');
  let Day = date[0]
  let Month = date[1]
  let Year = date[2]
  return `${Year}-${Month}-${Day}`;
};
export const getCalendarDateFormatDateNew = (date) => {
  date = new Date(date)
  let Day = date.getDate()
  let Month = date.getMonth() + 1
  let Year = date.getFullYear()
  return `${Year}-${Month < 10 ? '0' + Month.toString() : Month.toString()}-${Day < 10 ? '0' + Day.toString() : Day.toString()}`;
};

export const getDateFormat = (date) => {
  date = date || new Date();
  const Day = new Date(date).getDate();
  const Month = new Date(date).toLocaleString('default', { month: 'short' });
  const Year = new Date(date).getFullYear();
  return `${Day}-${Month}-${Year}`;
};
export function formatDate(dateString) {
  // Parse the input date string (assuming it is in DD-MM-YYYY format)
  let [day, month, year] = dateString.split('-');

  // Pad day and month with leading zeros if necessary
  day = day?.padStart(2, '0');
  month = month?.padStart(2, '0');

  // Create a Date object from the parsed values
  const date = new Date(`${year}-${month}-${day}`);

  // Define an array with month names
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Format the date in DD-MMM-YYYY format
  const formattedDate = `${day}-${months[date.getMonth()]}-${year}`;

  return formattedDate;
}
export function formatDate1(dateString) {
  // Parse the input date string (assuming it is in DD-MM-YYYY format)
  let [day, month, year] = dateString.split('-');

  // Pad day and month with leading zeros if necessary
  day = day?.padStart(2, '0');
  month = month?.padStart(2, '0');

  // Create a Date object from the parsed values
  const date = new Date(`${year}-${month}-${day}`);

  // Define an array with month names
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Format the date in DD-MMM-YYYY format
  const formattedDate = `${day} ${months[date.getMonth()]} ${year}`;

  return formattedDate;
}
export const getDateFormatNew = (date) => {
  date = date || new Date();
  const Day = new Date(date).getDate().toString().length === 1 ? '0' + new Date(date).getDate() : new Date(date).getDate();
  const Month = new Date(date).toLocaleString('default', { month: 'short' });
  const Year = new Date(date).getFullYear();
  return `${Day}-${Month}-${Year}`;
};

export const getDateFormat1 = (date) => {
  date = date || new Date();
  const Day = new Date(date).getDate();
  const Month = new Date(date).toLocaleString('default', { month: 'short' });
  const Year = new Date(date).getFullYear();
  return `${Year}-${Month.substring(0, 3)}-${Day}`;
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
export const getMonthYearSplitFormatted = (date) => {
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

  return `${monthNames[parseInt(arrDate[1]) - 1]} ${arrDate[2]}`;
};
export const getMonthYearFormatted = (date) => {
  date = date || new Date();
  const Day = new Date(date).getDate();
  const Month = new Date(date).toLocaleString('default', { month: 'short' });
  const Year = new Date(date).getFullYear();
  return `${Month}-${Year}`;
};
export const getMonthYearSpaceFormatted = (date) => {
  date = date || new Date();
  const Day = new Date(date).getDate();
  const Month = new Date(date).toLocaleString('default', { month: 'short' });
  const Year = new Date(date).getFullYear();
  return `${Month} ${Year}`;
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
// export const CheckFileValidationAdhar = (
//   fileData,
//   allowedFileTypes,
//   fileSize
// ) => {
//   const fileExtension = fileData?.name?.split('.').at(-1);
//   if (fileExtension != undefined || null) {
//     if (fileData?.size > fileSize) {
//       return 'Please upload a file smaller than ' + (fileSize / 1000000).toString() + ' MB';
//     }
//     if (!allowedFileTypes.includes(fileExtension.toUpperCase())) {
//       return 'File type should be between ' + allowedFileTypes.join(', and ') + ' ';
//     } else if (allowedFileTypes.includes(fileExtension)) {
//       return null;
//     }
//   }
// };
export const CheckFileValidationAdhar = (fileData, allowedFileTypes, fileSize) => {
  const fileExtension = fileData?.name?.split('.').at(-1)?.toLowerCase();
  if (fileExtension !== undefined && fileExtension !== null) {
    if (fileData?.size > fileSize) {
      return 'File size should not be greater than ' + (fileSize / 1000000).toString() + ' MB.';
    }
    if (!allowedFileTypes.map(type => type.toLowerCase()).includes(fileExtension)) {
      const allowedFileTypesFormatted = allowedFileTypes
        .map(type => `.${type.toLowerCase()}`)
        .join(', ')
        .replace(/, ([^,]*)$/, ' and $1'); // Add 'and' before the last item
      return 'File type should be between ' + allowedFileTypesFormatted + '.';
    }
    return null;
  }
  return 'No file selected or invalid file';
};

export function isBetweenDate(date, dayCount) {
  var compareDate = new Date(getDateFormatted(new Date()));
  var fromDate = new Date(new Date(date));
  var toDate = getNextDate(fromDate, dayCount);
  return compareDate >= fromDate && compareDate <= new Date(toDate);
}

export function isBetweenDates(date, date2) {
  var compareDate = new Date();
  var fromDate = new Date(new Date(date));
  var toDate = new Date(new Date(date2));
  return compareDate >= fromDate && compareDate <= new Date(toDate);
}

export const toolbarOptions = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],

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

export function stripHtml(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

export function getSchoolConfigurations(value) {
  const SchoolConfiguration = JSON.parse(sessionStorage.getItem('SchoolConfiguration'));
  let CanEdit = "N"
  SchoolConfiguration.map((Item) => {
    if (Item.Configure_Id == value)
      CanEdit = Item.Can_Edit
  })
  return CanEdit
}

// Do not use following function to get Page Access Status as it rely on Page Name which is inconsistent
// instead rely on function named GetScreenAccessPermissionByPageID('Pass Screen ID over here without quotes as Datatype is Number of this parameter.');
// ❌ DO NOT USE THIS FUNCTION
export function GetScreenPermission(ScreenName) {
  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );
  let perm = 'N';
  ScreensAccessPermission?.map((item) => {
    if (item.ScreenName === ScreenName)
      perm = item.IsFullAccess;
  });
  return perm;
};
// ✔️ USE THIS FUNCTION
export function GetScreenAccessPermissionByPageID(ScreenID) {
  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );
  let perm = 'N';
  ScreensAccessPermission?.map((item) => {
    if (item.ScreenId === ScreenID) {
      perm = item.IsFullAccess;
    }
  });
  return perm;
};


// IsPrePrimary Teacher Checking from Local Storage
export function GetIsPrePrimaryTeacher() {
  let auth_Object = JSON.parse(localStorage.getItem('auth'));
  const isPreprimary = auth_Object?.data?.TeacherDetails?.IsPreprimary;
  let IsPrePrimaryCondition: boolean;
  if (isPreprimary === "Y") {
    IsPrePrimaryCondition = true
  } else {
    IsPrePrimaryCondition = false
  }
  return IsPrePrimaryCondition
}

export function extractTime(datetimeString) {
  const timePart = datetimeString.split(' ')[1]; // Extracts the "02:00:00" part
  const [hours, minutes, seconds] = timePart.split(':'); // Splits the time into hours, minutes, and seconds

  return `${hours}:${minutes}`;
}

export const IsPhoneNoValid = (value) => {
  const phoneRegExp = /^[0-9]{10}$/; // Exactly 10 digits
  if (!phoneRegExp.test(value)) {
    return 'Mobile Number should be of 10 digits';
  }
  return '';
};

// Following Function is to Encrypt and Decrypt the Data which is Passed through URL 
// Importing Buffer Function >>
import { Buffer } from 'buffer';

// Encrypt Function
export const encodeURL = (data) => {
  return Buffer.from(data).toString('base64');
}

// Decrypt Function
export const decodeURL = (data) => {
  return Buffer.from(data, 'base64').toString('utf-8');
}


//SchoolScreensAccessPermission
// The following function is currently being used for setting Facilitator Observation Field
export const SchoolScreensAccessPermission = () => {
  let flag = true;
  const schoolId = localStorage.getItem('SchoolId');
  if (schoolId === '18') {
    flag = false;
  }
  return flag;
}

export const getWithoutHTML = (value) => {
  var div = document.createElement('div');
  div.innerHTML = value;
  var text = div.textContent || div.innerText || '';
  return text;
};