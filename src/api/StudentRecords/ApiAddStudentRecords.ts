import { IGetStudentRecordDataBody, IGetStudentRecordDataResult, IMarkRecordAsReadBody, ISubmitStudentRecordBody } from 'src/interfaces/StudentRecords/IAddStudentRecords';
import http from '../../requests/SchoolService/schoolServices';

const GetStudentRecordDataApi = (data: IGetStudentRecordDataBody) => {
    return http.post<IGetStudentRecordDataResult>('Teacher/GetStudentRecordData', data);
}
const SubmitStudentRecord = (data: ISubmitStudentRecordBody) => {
    return http.post<string>('Teacher/SubmitStudentRecordComment', data);
};
const MarkRecordAsRead = (data: IMarkRecordAsReadBody) => {
    return http.post<string>('Teacher/MarkRecordAsRead', data);
};

const GetStudentRecordDataAPI = {
    GetStudentRecordDataApi,
    SubmitStudentRecord,
    MarkRecordAsRead
};
export default GetStudentRecordDataAPI;