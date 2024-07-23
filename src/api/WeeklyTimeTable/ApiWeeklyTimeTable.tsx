import { IGetDataForAdditionalClassesBody, IGetDataForAdditionalClassesResult, IGetResetTimetableBody, IGetTeacherAndStandardForTimeTableBody, IGetTeacherAndStandardForTimeTableResult } from 'src/interfaces/WeeklyTimeTable/IWeeklyTimetable';
import http from '../../requests/SchoolService/schoolServices';



const GetTeacherAndStandardForTimeTableApi = (data: IGetTeacherAndStandardForTimeTableBody) => {
    return http.post<IGetTeacherAndStandardForTimeTableResult>('Teacher/TeacherAndStandardForTimeTable', data);
};

const GetDataForAdditionalClassesApi = (data: IGetDataForAdditionalClassesBody) => {
    return http.post<IGetDataForAdditionalClassesResult>('Teacher/GetDataForAdditionalClasses', data);
};

const GetResetTimetableApi = (data: IGetResetTimetableBody) => {
    return http.post<string>('Teacher/ResetTimetable', data);
};


const WeeklyTimeTableApi = {
    GetTeacherAndStandardForTimeTableApi,
    GetDataForAdditionalClassesApi,
    GetResetTimetableApi
};

export default WeeklyTimeTableApi;