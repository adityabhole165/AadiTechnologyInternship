import { IGetSingleStudentDetailsBody, IGetSingleStudentDetailsResult, IMasterDatastudentBody, IMasterDataStudentResult } from 'src/interfaces/Students/IStudentUI';
import http from '../../requests/SchoolService/schoolServices';

const GetSingleStudentDetailsApi = (data: IGetSingleStudentDetailsBody) => {
    return http.post<IGetSingleStudentDetailsResult>('Teacher/GetStandardDivisionOfTeacher', data);
}

const GetMasterDatastudentApi = (data: IMasterDatastudentBody) => {
    return http.post<IMasterDataStudentResult>('Teacher/MasterDatastudent', data);
}

const GetStudentUIAPI = {
    GetSingleStudentDetailsApi,
    GetMasterDatastudentApi
};
export default GetStudentUIAPI;