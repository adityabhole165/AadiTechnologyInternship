import {
    IDeleteStudentAchievementDetailsBody,
    IGenerateTransportFeeEntriesBody,
    IGetAcademicDatesForStandardBody,
    IGetAcademicDatesForStandardResult,
    IGetFormNumberBody,
    IGetFormNumberResult,
    IGetStandardwiseMinMaxDOBBody, IGetStandardwiseMinMaxDOBResult,
    IGetStudentAchievementDetailsBody,
    IGetStudentAchievementDetailsResult,
    IGetStudentMandatoryFieldsBody,
    IGetStudentMandatoryFieldsResult,
    IGetStudentNameForAchievementControlBody,
    IGetStudentNameForAchievementControlResult,
    IGetStudentsAllAchievementDetailsBody,
    IGetStudentsAllAchievementDetailsResult,
    IGetStudentsSiblingDetailBody,
    IGetStudentsSiblingDetailResult,
    IGetStudentUIPreConditionMsgBody, IGetStudentUIPreConditionMsgResult,
    ISaveStudentAchievementDetailsBody,
    IsClassTeacherBody,
    IsClassTeacherResult,
    IUpdateStudentTrackingDetailsBody
} from 'src/interfaces/StudentDetails/IStudentDetails';
import http from '../../requests/SchoolService/schoolServices';

const GetStandardwiseMinMaxDOB = (data: IGetStandardwiseMinMaxDOBBody) => {
    return http.post<IGetStandardwiseMinMaxDOBResult>('Teacher/GetStandardwiseMinMaxDOB', data);
};

const GetStudentUIPreConditionMsg = (data: IGetStudentUIPreConditionMsgBody) => {
    return http.post<IGetStudentUIPreConditionMsgResult[]>('School/GetStudentUIPreConditionMsg', data);
};

const GetIsClassTeacher = (data: IsClassTeacherBody) => {
    return http.post<IsClassTeacherResult>('School/IsClassTeacher', data);
};

const GetGenerateTransportFeeEntriesBody = (data: IGenerateTransportFeeEntriesBody) => {
    return http.post<String>('School/GenerateTransportFeeEntries', data);
};//InProgress

const GetFormNumber = (data: IGetFormNumberBody) => {
    return http.post<IGetFormNumberResult>('School/GetFormNumber', data);
};//used
const GetStudentsSiblingDetail = (data: IGetStudentsSiblingDetailBody) => {
    return http.post<IGetStudentsSiblingDetailResult[]>('Teacher/GetStudentsSiblingDetail', data);
};

const GetAcademicDatesForStandard = (data: IGetAcademicDatesForStandardBody) => {
    return http.post<IGetAcademicDatesForStandardResult>('Teacher/GetAcademicDatesForStandard', data);
};

const GetStudentMandatoryFields = (data: IGetStudentMandatoryFieldsBody) => {
    return http.post<IGetStudentMandatoryFieldsResult>('School/GetStudentMandatoryFields', data);
};
const UpdateStudentTrackingDetails = (data: IUpdateStudentTrackingDetailsBody) => {
    return http.post<String>('Teacher/UpdateStudentTrackingDetails', data);
};//used

//Add Note Popup
//1
const GetStudentNameForAchievementControlApi = (data: IGetStudentNameForAchievementControlBody) => {
    return http.post<IGetStudentNameForAchievementControlResult[]>('Teacher/GetStudentNameForAchievementControl', data);
};
//2 List
const GetStudentsAllAchievementDetailsApi = (data: IGetStudentsAllAchievementDetailsBody) => {
    return http.post<IGetStudentsAllAchievementDetailsResult[]>('Teacher/GetStudentsAllAchievementDetails', data);
};
//3 Edit
const GetStudentAchievementDetailsApi = (data: IGetStudentAchievementDetailsBody) => {
    return http.post<IGetStudentAchievementDetailsResult[]>('Teacher/GetStudentAchievementDetails', data);
};
//4 Save
const SaveStudentAchievementDetailsApi = (data: ISaveStudentAchievementDetailsBody) => {
    return http.post<string>('Teacher/SaveStudentAchievementDetails', data);
};
//5 Delete
const DeleteStudentAchievementDetailsApi = (data: IDeleteStudentAchievementDetailsBody) => {
    return http.post<string>('Teacher/DeleteStudentAchievementDetails', data);
};

const APIStudentDetails = {
    GetStandardwiseMinMaxDOB,
    GetStudentUIPreConditionMsg,
    GetIsClassTeacher,
    GetGenerateTransportFeeEntriesBody,
    GetFormNumber,
    GetStudentsSiblingDetail,
    GetAcademicDatesForStandard,
    GetStudentMandatoryFields,
    UpdateStudentTrackingDetails,
    GetStudentNameForAchievementControlApi, GetStudentsAllAchievementDetailsApi, GetStudentAchievementDetailsApi,
    SaveStudentAchievementDetailsApi, DeleteStudentAchievementDetailsApi

};

export default APIStudentDetails;
