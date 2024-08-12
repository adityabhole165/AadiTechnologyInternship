import { IGetStudentRecordCommentBody, IGetStudentRecordCommentResult, IGetStudentRecordDataBody, IGetStudentRecordDataResult, IMarkRecordAsReadBody, ISaveStudentRecordBody, ISubmitStudentRecordBody, ISubmitStudentRecordCommentBody } from 'src/interfaces/StudentRecords/IAddStudentRecords';
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
const SubmitStudentRecordComment = (data: ISubmitStudentRecordCommentBody) => {
    return http.post<string>('Teacher/SubmitStudentRecordComment', data);
};
const GetStudentRecordComment = (data: IGetStudentRecordCommentBody) => {
    return http.post<IGetStudentRecordCommentResult>('Teacher/GetStudentRecordComment', data);
};
const SaveStudentRecord = (data: ISaveStudentRecordBody) => {
    return http.post<string>('Teacher/SaveStudentRecord', data);
};
const GetStudentRecordDataAPI = {
    GetStudentRecordDataApi,
    SubmitStudentRecord,
    MarkRecordAsRead,
    SubmitStudentRecordComment,
    GetStudentRecordComment,
    SaveStudentRecord
};
export default GetStudentRecordDataAPI;