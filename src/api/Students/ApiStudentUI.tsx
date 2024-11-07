import { IGetAllGroupsOfStreamBody, IGetAllGroupsOfStreamResult, IGetAllStreamsBody, IGetAllStreamsResult, IGetAllUserRolesBody, IGetAllUserRolesResult, IGetSingleStudentDetailsBody, IGetSingleStudentDetailsResult, IGetStreamwiseSubjectDetailsBody, IGetStreamwiseSubjectDetailsResult, IGetStudentAdditionalDetailsBody, IGetStudentAdditionalDetailsResult, IMasterDatastudentBody, IMasterDataStudentResult, IStaffNameBody, IStaffNameResult, IStandrdwiseStudentsDocumentBody, IStandrdwiseStudentsDocumentResult } from 'src/interfaces/Students/IStudentUI';
import http from '../../requests/SchoolService/schoolServices';

const GetSingleStudentDetailsApi = (data: IGetSingleStudentDetailsBody) => {
    return http.post<IGetSingleStudentDetailsResult[]>('Teacher/GetSingleStudentDetails', data);
}

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
//5
const GetStudentAdditionalDetailsapi = (data: IGetStudentAdditionalDetailsBody) => {
    return http.post<IGetStudentAdditionalDetailsResult>('Teacher/GetStudentAdditionalDetails', data);
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


const GetStudentUIAPI = {
    GetSingleStudentDetailsApi,
    GetStudentAdditionalDetailsapi,
    GetMasterDatastudentApi,
    StaffNameApi,
    GetAllUserRolesApi,
    StandrdwiseStudentsDocumentApi,
    GetAllStreamsApi, GetAllGroupsOfStreamApi, GetStreamwiseSubjectDetailsApi
};
export default GetStudentUIAPI;