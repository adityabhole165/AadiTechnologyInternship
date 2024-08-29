import { IGetCheckDuplicateLecturesMsgBody, IGetCheckDuplicateLecturesMsgResult, IGetClassTimeTableBody, IGetClassTimeTableResult, IGetDataForAddClassesPopUpBody, IGetDataForAddClassesPopUpResult, IGetDataForAdditionalClassesBody, IGetDataForAdditionalClassesResult, IGetDeleteAdditionalLectureBody, IGetDeleteAdditionalLecturesBody, IGetDivisionForStdDropdownBody, IGetDivisionForStdDropdownResult, IGetGroupwiseOptionalSubjectBody, IGetGroupwiseOptionalSubjectResult, IGetManageClassTimeTableBody, IGetOptionalSubjectLecturesBody, IGetOptionalSubjectLecturesResult, IGetResetTimetableBody, IGetSaveClassTimeTableBody, IGetSaveTeacherTimeTableBody, IGetTeacherAndStandardForTimeTableBody, IGetTeacherAndStandardForTimeTableResult, IGetTeacherSubjectMaxLecDetailsBody, IGetTeacherSubjectMaxLecDetailsResult, IGetTimeTableForTeacherBody, IGetTimeTableForTeacherResult, IGetValidateAddDataForTeacherBody, IGetValidateAddDataForTeacherResult, IGetValidateDataForClassBody, IGetValidateDataForClassBody1, IGetValidateDataForClassResult, IGetValidateTeacherDataBody, IGetValidateTeacherDataResult } from 'src/interfaces/WeeklyTimeTable/IWeeklyTimetable';
import http from '../../requests/SchoolService/schoolServices';



const GetTeacherAndStandardForTimeTableApi = (data: IGetTeacherAndStandardForTimeTableBody) => {
    return http.post<IGetTeacherAndStandardForTimeTableResult>('Teacher/TeacherAndStandardForTimeTable', data);
};

const GetDataForAdditionalClassesApi = (data: IGetDataForAdditionalClassesBody) => {
    return http.post<IGetDataForAdditionalClassesResult>('Teacher/GetDataForAdditionalClasses', data);
};

const GetIGetDataForAddClassesPopUpApi = (data: IGetDataForAddClassesPopUpBody) => {
    return http.post<IGetDataForAddClassesPopUpResult>('Teacher/AdditionalClasses', data);
}

const GetResetTimetableApi = (data: IGetResetTimetableBody) => {
    return http.post<string>('Teacher/ResetTimetable', data);
};

const GetCheckDuplicateLecturesMsgApi = (data: IGetCheckDuplicateLecturesMsgBody) => {
    return http.post<IGetCheckDuplicateLecturesMsgResult>('Teacher/CheckDuplicateLecturesMsg', data);
}

const GetDivisionForStdDropdownApi = (data: IGetDivisionForStdDropdownBody) => {
    return http.post<IGetDivisionForStdDropdownResult[]>('Teacher/GetAllDivisionsForStandardDropDown', data)
}

const GetTeacherSubjectMaxLecDetailsApi = (data: IGetTeacherSubjectMaxLecDetailsBody) => {
    return http.post<IGetTeacherSubjectMaxLecDetailsResult>('Teacher/GetTeacherSubjectMaxLecDetails', data)
}

// const GetTeacherSubjectMaxLecDetailsApi = async (data: IGetTeacherSubjectMaxLecDetailsBody) => {
//     try {
//         return await http.post<IGetTeacherSubjectMaxLecDetailsResult>('Teacher/GetTeacherSubjectMaxLecDetails', data);
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// };


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
const GetValidateClassDataApi = (data: IGetValidateDataForClassBody) => {
    return http.post<IGetValidateDataForClassResult[]>('Teacher/ValidateDataForClass', data)
}
const GetDeleteAdditionalLectureApi = (data: IGetDeleteAdditionalLectureBody) => {
    return http.post<string>('Teacher/DeleteAdditionalLecture', data)
}
const GetValidateAdditionalDataForTeacherApi = (data: IGetValidateAddDataForTeacherBody) => {
    return http.post<IGetValidateAddDataForTeacherResult[]>('Teacher/ValidateAdditionalDataForTeacher', data)
}
const GetManageClassTimeTableApi = (data: IGetManageClassTimeTableBody) => {
    return http.post<string>('Teacher/ManageClassTimeTable', data)
}
const GetOptionalSubjectLecturesApi = (data: IGetOptionalSubjectLecturesBody) => {
    return http.post<IGetOptionalSubjectLecturesResult>('Teacher/OptionalSubjectLectures', data)
}
const GetGroupwiseOptionalSubjectApi = (data: IGetGroupwiseOptionalSubjectBody) => {
    return http.post<IGetGroupwiseOptionalSubjectResult[]>('Teacher/GetGroupwiseOptionalSubject', data)
}
const GetDeleteAdditionalLecturesApi = (data: IGetDeleteAdditionalLecturesBody) => {
    return http.post<string>('Teacher/DeleteAdditionalLectures', data)
}
const GetValidateDataForClassApi = (data: IGetValidateDataForClassBody1) => {
    return http.post<IGetValidateDataForClassResult[]>('Teacher/ValidateDataForClass', data)
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
    GetValidateTeacherDataApi,
    GetValidateClassDataApi,
    GetIGetDataForAddClassesPopUpApi,
    GetCheckDuplicateLecturesMsgApi,
    GetValidateAdditionalDataForTeacherApi,
    GetOptionalSubjectLecturesApi,
    GetGroupwiseOptionalSubjectApi,
    GetValidateDataForClassApi
};

export default WeeklyTimeTableApi;