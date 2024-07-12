import { IGetStudentRecordDataBody, IGetStudentRecordDataResult } from 'src/interfaces/StudentRecords/IAddStudentRecords';
import http from '../../requests/SchoolService/schoolServices';

const GetStudentRecordDataApi = (data: IGetStudentRecordDataBody) => {
    return http.post<IGetStudentRecordDataResult>('Teacher/GetStudentRecordData', data);
}

const GetStudentRecordDataAPI = {
    GetStudentRecordDataApi
};
export default GetStudentRecordDataAPI;