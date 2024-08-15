import { IGetClassTimeTableBody, IGetClassTimeTableResult, IGetDataForAdditionalClassesBody, IGetDataForAdditionalClassesResult, IGetDeleteAdditionalLectureBody, IGetDeleteAdditionalLecturesBody, IGetDivisionForStdDropdownBody, IGetDivisionForStdDropdownResult, IGetManageClassTimeTableBody, IGetResetTimetableBody, IGetSaveClassTimeTableBody, IGetSaveTeacherTimeTableBody, IGetTeacherAndStandardForTimeTableBody, IGetTeacherAndStandardForTimeTableResult, IGetTeacherSubjectMaxLecDetailsBody, IGetTeacherSubjectMaxLecDetailsResult, IGetTimeTableForTeacherBody, IGetTimeTableForTeacherResult, IGetValidateTeacherDataBody, IGetValidateTeacherDataResult } from 'src/interfaces/WeeklyTimeTable/IWeeklyTimetable';
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

// const GetTeacherSubjectMaxLecDetailsApi = (data: IGetTeacherSubjectMaxLecDetailsBody) => {
//     return http.post<IGetTeacherSubjectMaxLecDetailsResult>('Teacher/GetTeacherSubjectMaxLecDetails', data)
// }

const GetTeacherSubjectMaxLecDetailsApi = async (data: IGetTeacherSubjectMaxLecDetailsBody) => {
    try {
        return await http.post<IGetTeacherSubjectMaxLecDetailsResult>('Teacher/GetTeacherSubjectMaxLecDetails', data);
    } catch (error) {
        console.error('Error in GetTeacherSubjectMaxLecDetailsApi:', error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        throw error;
    }
};


const GetTimeTableForTeacherApi = (data: IGetTimeTableForTeacherBody) => {
    return http.post<IGetTimeTableForTeacherResult>('Teacher/GetTimeTableForTeacher', data)
}

const GetTimeTableForClassApi = (data: IGetClassTimeTableBody) => {
    return http.post<IGetClassTimeTableResult>('Teacher/GetTimeTableForClass', data)
}

const GetSaveTeacherTimeTableApi = (data: IGetSaveTeacherTimeTableBody) => {
    return http.post<string>('Teacher/SaveTeacherTimeTable', data)
}

const GetSaveClassTimeTableApi = (data: IGetSaveClassTimeTableBody) => {
    return http.post<string>('Teacher/SaveClassTimeTable', data)
}
const GetValidateTeacherDataApi = (data: IGetValidateTeacherDataBody) => {
    return http.post<IGetValidateTeacherDataResult[]>('Teacher/ValidateDataForTeacher', data)
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
    GetSaveClassTimeTableApi,
    GetManageClassTimeTableApi,
    GetDeleteAdditionalLectureApi,
    GetDeleteAdditionalLecturesApi,
    GetValidateTeacherDataApi
};

export default WeeklyTimeTableApi;