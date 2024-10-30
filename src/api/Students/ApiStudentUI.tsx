import { IGetSingleStudentDetailsBody, IGetSingleStudentDetailsResult, IMasterDatastudentBody, IMasterDataStudentResult, IStaffNameBody, IStaffNameResult } from 'src/interfaces/Students/IStudentUI';
import http from '../../requests/SchoolService/schoolServices';

const GetSingleStudentDetailsApi = (data: IGetSingleStudentDetailsBody) => {
    return http.post<IGetSingleStudentDetailsResult>('Teacher/GetStandardDivisionOfTeacher', data);
}

const GetMasterDatastudentApi = (data: IMasterDatastudentBody) => {
    return http.post<IMasterDataStudentResult>('Teacher/MasterDatastudent', data);
}

//2
const StaffNameApi = (data: IStaffNameBody) => {
    return http.post<IStaffNameResult[]>('Teacher/StaffName', data);
};

const GetStudentUIAPI = {
    GetSingleStudentDetailsApi,
    GetMasterDatastudentApi,
    StaffNameApi
};
export default GetStudentUIAPI;