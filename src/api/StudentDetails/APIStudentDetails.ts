import { IGenerateTransportFeeEntriesBody, IGetBinaryImagesBody, IGetBinaryImagesResult, IGetStandardwiseMinMaxDOBBody, IGetStandardwiseMinMaxDOBResult, IGetStudentMandatoryFieldsBody, IGetStudentMandatoryFieldsResult, IGetStudentsFormBody, IGetStudentUIPreConditionMsgBody, IGetStudentUIPreConditionMsgResult, IRemoveStudentPhotoBody, IsAnyExamPublishedBody, IsAnyExamPublishedResult, IsClassTeacherBody, IsClassTeacherResult, IStaffNameBody, IStaffNameResult, IStandrdwiseStudentsDocumentBody, IStandrdwiseStudentsDocumentResult } from 'src/interfaces/StudentDetails/IStudentDetails';
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
const GetBinaryImages = (data: IGetBinaryImagesBody) => {
    return http.post<IGetBinaryImagesResult>('School/GetBinaryImages', data);
};
const GetGenerateTransportFeeEntriesBody = (data: IGenerateTransportFeeEntriesBody) => {
    return http.post<String>('School/GenerateTransportFeeEntries', data);
};
const GetIsAnyExamPublished = (data: IsAnyExamPublishedBody) => {
    return http.post<IsAnyExamPublishedResult>('School/IsAnyExamPublished', data);
};
const GetStudentMandatoryFields = (data: IGetStudentMandatoryFieldsBody) => {
    return http.post<IGetStudentMandatoryFieldsResult>('School/GetStudentMandatoryFields', data);
};
const GetStandrdwiseStudentsDocument = (data: IStandrdwiseStudentsDocumentBody) => {
    return http.post<IStandrdwiseStudentsDocumentResult[]>('Teacher/StandrdwiseStudentsDocument', data);
};
const GetStudentsForm = (data: IGetStudentsFormBody) => {
    return http.post<String>('Teacher/GetStudentsForm', data);
};
const GetStaffName = (data: IStaffNameBody) => {
    return http.post<IStaffNameResult[]>('Teacher/StaffName', data);
};
const GetRemoveStudentPhoto = (data: IRemoveStudentPhotoBody) => {
    return http.post<String>('Teacher/RemoveStudentPhoto', data);
};


const APIStudentDetails = {
    GetStandardwiseMinMaxDOB,
    GetStudentUIPreConditionMsg,
    GetIsClassTeacher,
    GetBinaryImages,
    GetGenerateTransportFeeEntriesBody,
    GetIsAnyExamPublished,
    GetStudentMandatoryFields,
    GetStandrdwiseStudentsDocument,
    GetStudentsForm,
    GetStaffName,
    GetRemoveStudentPhoto
};

export default APIStudentDetails;
