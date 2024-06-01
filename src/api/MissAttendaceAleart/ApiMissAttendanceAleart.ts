import { IMissingattendancealeartNameBody, IMissingattendancealeartNameResult,IMissingattendancealeartDateBody,IMissingattendancealeartDateResult } from 'src/interfaces/MissAttendaceAleart/IMissingAttendaceAleart';
import http from '../../requests/SchoolService/schoolServices';
const MissingNameList = (data: IMissingattendancealeartNameBody) => {
    return http.post<IMissingattendancealeartNameResult>('Teacher/MissingAttendanceDetails', data);
};

const MissingDateList = (data: IMissingattendancealeartDateBody) => {
    return http.post<IMissingattendancealeartDateResult>('Teacher/MissingAttendanceDetails', data);
};

const Missingattendance =
{
    MissingNameList,
    MissingDateList
}
export default Missingattendance;;