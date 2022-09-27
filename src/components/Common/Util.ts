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