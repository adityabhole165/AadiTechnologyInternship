import { IGetSingleStudentDetailsBody, IGetSingleStudentDetailsResult, IMasterDatastudentBody, IMasterDatastudentResult } from 'src/interfaces/Students/IStudentUI';
import http from '../../requests/SchoolService/schoolServices';

const GetSingleStudentDetailsApi = (data: IGetSingleStudentDetailsBody) => {
    return http.post<IGetSingleStudentDetailsResult[]>('Teacher/GetStandardDivisionOfTeacher', data);
}

const GetMasterDatastudentApi = (data: IMasterDatastudentBody) => {
    return http.post<IMasterDatastudentResult[]>('Teacher/MasterDatastudent', data);
}

const GetStudentUIAPI = {
    GetSingleStudentDetailsApi,
    GetMasterDatastudentApi
};
export default GetStudentUIAPI;