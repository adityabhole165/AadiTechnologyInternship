import { IGetStudentRecordDataBody, IGetStudentRecordDataResult, ISubmitStudentRecordBody } from 'src/interfaces/StudentRecords/IAddStudentRecords';
import http from '../../requests/SchoolService/schoolServices';

const GetStudentRecordDataApi = (data: IGetStudentRecordDataBody) => {
    return http.post<IGetStudentRecordDataResult>('Teacher/GetStudentRecordData', data);
}
const SubmitStudentRecord = (data: ISubmitStudentRecordBody) => {
    return http.post<string>('Teacher/SubmitStudentRecordComment', data);
};


const GetStudentRecordDataAPI = {
    GetStudentRecordDataApi,
    SubmitStudentRecord
};
export default GetStudentRecordDataAPI;