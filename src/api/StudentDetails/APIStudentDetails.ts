import {
    IGenerateTransportFeeEntriesBody,
    IGetAcademicDatesForStandardBody,
    IGetAcademicDatesForStandardResult,
    IGetFormNumberBody,
    IGetFormNumberResult,
    IGetStandardwiseMinMaxDOBBody, IGetStandardwiseMinMaxDOBResult,
    IGetStudentMandatoryFieldsBody,
    IGetStudentMandatoryFieldsResult,
    IGetStudentsSiblingDetailBody,
    IGetStudentsSiblingDetailResult,
    IGetStudentUIPreConditionMsgBody, IGetStudentUIPreConditionMsgResult,
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
};

const GetFormNumber = (data: IGetFormNumberBody) => {
    return http.post<IGetFormNumberResult>('School/GetFormNumber', data);
};
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
    UpdateStudentTrackingDetails

};

export default APIStudentDetails;
