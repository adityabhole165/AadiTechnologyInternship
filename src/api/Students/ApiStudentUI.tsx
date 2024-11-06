import { IGetAllUserRolesBody, IGetAllUserRolesResult, IGetSingleStudentDetailsBody, IGetSingleStudentDetailsResult, IGetStudentAdditionalDetailsBody, IGetStudentAdditionalDetailsResult, IMasterDatastudentBody, IMasterDataStudentResult, IStaffNameBody, IStaffNameResult, IStandrdwiseStudentsDocumentBody, IStandrdwiseStudentsDocumentResult } from 'src/interfaces/Students/IStudentUI';
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
    return http.post<IGetStudentAdditionalDetailsResult>(
        'Teacher/GetStudentAdditionalDetails',
        data
    );
};

const GetStudentUIAPI = {
    GetSingleStudentDetailsApi,
    GetStudentAdditionalDetailsapi,
    GetMasterDatastudentApi,
    StaffNameApi,
    GetAllUserRolesApi,
    StandrdwiseStudentsDocumentApi
};
export default GetStudentUIAPI;