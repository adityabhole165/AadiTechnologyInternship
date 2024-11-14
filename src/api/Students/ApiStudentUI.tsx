import { IAddStudentAdditionalDetailsBody, ICheckIfAttendanceMarkedBody, ICheckIfAttendanceMarkedResult, IGetAllGroupsOfStreamBody, IGetAllGroupsOfStreamResult, IGetAllStreamsBody, IGetAllStreamsResult, IGetAllUserRolesBody, IGetAllUserRolesResult, IGetFeeAreaNamesBody, IGetFeeAreaNamesResult, IGetSingleStudentDetailsBody, IGetSingleStudentDetailsResult, IGetStreamwiseSubjectDetailsBody, IGetStreamwiseSubjectDetailsResult, IGetStudentAdditionalDetailsBody, IGetStudentAdditionalDetailsResult, IIsAnyExamPublishedBody, IIsAnyExamPublishedResult, IIsOnLeaveBody, IIsOnLeaveResult, IMasterDatastudentBody, IMasterDataStudentResult, IRetriveStudentStreamwiseSubjectBody, IRetriveStudentStreamwiseSubjectResult, IStaffNameBody, IStaffNameResult, IStandrdwiseStudentsDocumentBody, IStandrdwiseStudentsDocumentResult, IUpdateStudentBody, IUpdateStudentResult } from 'src/interfaces/Students/IStudentUI';
import http from '../../requests/SchoolService/schoolServices';

const GetSingleStudentDetailsApi = (data: IGetSingleStudentDetailsBody) => {
    return http.post<IGetSingleStudentDetailsResult[]>('Teacher/GetSingleStudentDetails', data);
}
const GetStudentAdditionalDetailsApi = (data: IGetStudentAdditionalDetailsBody) => {
    return http.post<IGetStudentAdditionalDetailsResult[]>('Teacher/GetStudentAdditionalDetails', data);
};
const AddStudentAdditionalDetailsApi = (data: IAddStudentAdditionalDetailsBody) => {
    return http.post<string>('Teacher/AddStudentAdditionalDetails', data);
};

const GetMasterDatastudentApi = (data: IMasterDatastudentBody) => {
    return http.post<IMasterDataStudentResult>('Teacher/MasterDatastudent', data);
}

//2
const StaffNameApi = (data: IStaffNameBody) => {
    return http.post<IStaffNameResult[]>('Teacher/StaffName', data);
};
//3
const GetAllUserRolesApi = (data: IGetAllUserRolesBody) => {
    return http.post<IGetAllUserRolesResult[]>('Teacher/GetAllUserRoles', data);
};
//4
const StandrdwiseStudentsDocumentApi = (data: IStandrdwiseStudentsDocumentBody) => {
    return http.post<IStandrdwiseStudentsDocumentResult[]>('Teacher/StandrdwiseStudentsDocument', data);
};
//Streamwise Subject API's
//1
const GetAllStreamsApi = (data: IGetAllStreamsBody) => {
    return http.post<IGetAllStreamsResult[]>('Teacher/GetAllStreams', data);
};
//2
const GetAllGroupsOfStreamApi = (data: IGetAllGroupsOfStreamBody) => {
    return http.post<IGetAllGroupsOfStreamResult[]>('Teacher/GetAllGroupsOfStream', data);
};
//3
const GetStreamwiseSubjectDetailsApi = (data: IGetStreamwiseSubjectDetailsBody) => {
    return http.post<IGetStreamwiseSubjectDetailsResult>('Teacher/GetStreamwiseSubjectDetails', data);
};
//4
const RetriveStudentStreamwiseSubjectApi = (data: IRetriveStudentStreamwiseSubjectBody) => {
    return http.post<IRetriveStudentStreamwiseSubjectResult>('Teacher/RetriveStudentStreamwiseSubject', data);
};

//Update Student
const UpdateStudentApi = (data: IUpdateStudentBody) => {
    return http.post<IUpdateStudentResult>('Teacher/UpdateStudent', data);
};
//IsOnLeave
const IsOnLeaveApi = (data: IIsOnLeaveBody) => {
    return http.post<IIsOnLeaveResult>('Teacher/IsOnLeave', data);
};
const IsAnyExamPublishedApi = (data: IIsAnyExamPublishedBody) => {
    return http.post<IIsAnyExamPublishedResult>('School/IsAnyExamPublished', data);
};
const CheckIfAttendanceMarkedApi = (data: ICheckIfAttendanceMarkedBody) => {
    return http.post<ICheckIfAttendanceMarkedResult[]>('School/CheckIfAttendanceMarked', data);
};
const GetFeeAreaNamesApi = (data: IGetFeeAreaNamesBody) => {
    return http.post<IGetFeeAreaNamesResult[]>('Teacher/GetFeeAreaNames', data);
};


const GetStudentUIAPI = {
    GetSingleStudentDetailsApi,
    GetStudentAdditionalDetailsApi,
    AddStudentAdditionalDetailsApi,
    GetMasterDatastudentApi,
    StaffNameApi,
    GetAllUserRolesApi,
    StandrdwiseStudentsDocumentApi,
    GetAllStreamsApi, GetAllGroupsOfStreamApi, GetStreamwiseSubjectDetailsApi, RetriveStudentStreamwiseSubjectApi,
    UpdateStudentApi,
    IsOnLeaveApi,
    IsAnyExamPublishedApi,
    CheckIfAttendanceMarkedApi,
    GetFeeAreaNamesApi
};
export default GetStudentUIAPI;