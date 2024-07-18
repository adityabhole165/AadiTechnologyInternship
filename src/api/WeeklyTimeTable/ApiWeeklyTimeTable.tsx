import { IGetTeacherAndStandardForTimeTableBody, IGetTeacherAndStandardForTimeTableResult } from 'src/interfaces/WeeklyTimeTable/IWeeklyTimetable';
import http from '../../requests/SchoolService/schoolServices';



const GetTeacherAndStandardForTimeTableApi = (data: IGetTeacherAndStandardForTimeTableBody) => {
    return http.post<IGetTeacherAndStandardForTimeTableResult>('Teacher/TeacherAndStandardForTimeTable', data);
};


const WeeklyTimeTableApi = {
    GetTeacherAndStandardForTimeTableApi
};

export default WeeklyTimeTableApi;