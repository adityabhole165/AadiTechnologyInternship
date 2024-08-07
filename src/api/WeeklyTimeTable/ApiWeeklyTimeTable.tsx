import { IGetClassTimeTableBody, IGetClassTimeTableResult, IGetDataForAdditionalClassesBody, IGetDataForAdditionalClassesResult, IGetDeleteAdditionalLectureBody, IGetDeleteAdditionalLecturesBody, IGetDivisionForStdDropdownBody, IGetDivisionForStdDropdownResult, IGetManageClassTimeTableBody, IGetResetTimetableBody, IGetSaveTeacherTimeTableBody, IGetTeacherAndStandardForTimeTableBody, IGetTeacherAndStandardForTimeTableResult, IGetTeacherSubjectMaxLecDetailsBody, IGetTeacherSubjectMaxLecDetailsResult, IGetTimeTableForTeacherBody, IGetTimeTableForTeacherResult } from 'src/interfaces/WeeklyTimeTable/IWeeklyTimetable';
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

const GetTimeTableForTeacherApi = (data: IGetTimeTableForTeacherBody) => {
    return http.post<IGetTimeTableForTeacherResult>('Teacher/GetTimeTableForTeacher', data)
}

const GetTimeTableForClassApi = (data: IGetClassTimeTableBody) => {
    return http.post<IGetClassTimeTableResult>('Teacher/GetTimeTableForClass', data)
}

const GetSaveTeacherTimeTableApi = (data: IGetSaveTeacherTimeTableBody) => {
    return http.post<string>('Teacher/SaveTeacherTimeTable', data)
}
const GetDeleteAdditionalLectureApi = (data: IGetDeleteAdditionalLectureBody) => {
    return http.post<string>('Teacher/DeleteAdditionalLecture', data)
}

const GetManageClassTimeTableApi = (data: IGetManageClassTimeTableBody) => {
    return http.post<string>('Teacher/ManageClassTimeTable', data)
}

const GetDeleteAdditionalLecturesApi = (data: IGetDeleteAdditionalLecturesBody) => {
    return http.post<string>('Teacher/DeleteAdditionalLectures', data)
}

// GetDeleteAdditionalLectureApi  | to be used before Saving Teacher Time Table
// GetDeleteAdditionalLecturesApi (s) | to delete Add. Lectures after Saving Teacher Time Table

const WeeklyTimeTableApi = {
    GetTeacherAndStandardForTimeTableApi,
    GetDataForAdditionalClassesApi,
    GetResetTimetableApi,
    GetDivisionForStdDropdownApi,
    GetTeacherSubjectMaxLecDetailsApi,
    GetTimeTableForTeacherApi,
    GetTimeTableForClassApi,
    GetSaveTeacherTimeTableApi,
    GetManageClassTimeTableApi,
    GetDeleteAdditionalLectureApi,
    GetDeleteAdditionalLecturesApi
};

export default WeeklyTimeTableApi;