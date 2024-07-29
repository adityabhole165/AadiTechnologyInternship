import { IGetDataForAdditionalClassesBody, IGetDataForAdditionalClassesResult, IGetDivisionForStdDropdownBody, IGetDivisionForStdDropdownResult, IGetResetTimetableBody, IGetTeacherAndStandardForTimeTableBody, IGetTeacherAndStandardForTimeTableResult, IGetTeacherSubjectMaxLecDetailsBody, IGetTeacherSubjectMaxLecDetailsResult } from 'src/interfaces/WeeklyTimeTable/IWeeklyTimetable';
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

const GetDivisionForStdDropdownApi = (data: IGetDivisionForStdDropdownBody) => {
    return http.post<IGetDivisionForStdDropdownResult[]>('Teacher/GetAllDivisionsForStandardDropDown', data)
}

const GetTeacherSubjectMaxLecDetailsApi = (data: IGetTeacherSubjectMaxLecDetailsBody) => {
    return http.post<IGetTeacherSubjectMaxLecDetailsResult>('Teacher/GetTeacherSubjectMaxLecDetails', data)
}

const WeeklyTimeTableApi = {
    GetTeacherAndStandardForTimeTableApi,
    GetDataForAdditionalClassesApi,
    GetResetTimetableApi,
    GetDivisionForStdDropdownApi,
    GetTeacherSubjectMaxLecDetailsApi
};

export default WeeklyTimeTableApi;