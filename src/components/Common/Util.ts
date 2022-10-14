export function isFutureDate(date) {
    return ((new Date(date.toLocaleDateString()))
        >
        (new Date(new Date().toLocaleDateString())))
}

//date='02 Oct 2022'
export function isTodaysDate(date) {
    return (new Date(date)).toLocaleDateString() 
    === 
    (new Date().toLocaleDateString())
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
    const currentDayInMilli = new Date(date).getTime();
    const oneDay = prevNext * 1000 * 60 * 60 * 24;
    const nextDayInMilli = currentDayInMilli + oneDay;
    return new Date(nextDayInMilli);
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