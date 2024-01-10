import http from "../../requests/SchoolService/schoolServices"
import { IGetSubjectListForTeacherBody,IGetSubjectListForTeacherResult,IPublishUnPublishHomeworkBody,IGetAllHomeworkDocumentsBody,IGetAllHomeworkDocumentsResult} from "src/interfaces/AssignHomework/IHomeworkSubjectList"

const ApiHomeworkSubjectList = (data: IGetSubjectListForTeacherBody) => {
    return http.post<IGetSubjectListForTeacherResult[]>('Teacher/GetSubjectListForTeacher', data);
};
const PublishUnpublish = (data: IPublishUnPublishHomeworkBody) => {
    return http.post('Teacher/PublishUnPublishHomework', data);
};
const GetAllHomeworkDocuments = (data: IGetAllHomeworkDocumentsBody) => {
    return http.post<IGetAllHomeworkDocumentsResult[]>('Homework/GetAllHomeworkDocuments', data);
};
const HomeworkListTeacher ={
    ApiHomeworkSubjectList,
    PublishUnpublish,
    GetAllHomeworkDocuments,
    
}
export default  HomeworkListTeacher 