
import { IGetDeleteCommentBody, IGetSaveandSubmitCommentBody, IGetSaveCommentBody } from 'src/interfaces/StudentRecords/IStudentRecordComment';
import http from '../../requests/SchoolService/schoolServices';


const GetDeleteComment = (data: IGetDeleteCommentBody) => {
    return http.post<string>('Teacher/DeleteComment', data);
};

const SaveComment = (data: IGetSaveCommentBody) => {
    return http.post<string>('Teacher/SaveComment', data);
}

const SaveandSubmitComment = (data: IGetSaveandSubmitCommentBody) => {
    return http.post<string>('Teacher/SaveAndSubmitComment', data);
}


const ApiStudentRecordComment = {
    GetDeleteComment,
    SaveComment,
    SaveandSubmitComment
};


export default ApiStudentRecordComment;
