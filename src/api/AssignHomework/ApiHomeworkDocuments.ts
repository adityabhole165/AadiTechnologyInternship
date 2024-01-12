import http from "../../requests/SchoolService/schoolServices"
import { IGetAllHomeworkDocumentsBody,IGetAllHomeworkDocumentsResult,IDeleteHomeworkDocumentBody} from "src/interfaces/AssignHomework/IHomeworkDocuments"

const GetAllHomeworkDocuments = (data: IGetAllHomeworkDocumentsBody) => {
    return http.post<IGetAllHomeworkDocumentsResult[]>('Homework/GetAllHomeworkDocuments', data);
};
const DeleteDocument = (data: IDeleteHomeworkDocumentBody) => {
    return http.post('Homework/DeleteHomeworkDocument', data);
};
const ApiHomeworkDocuments ={
    
    GetAllHomeworkDocuments,
    DeleteDocument
    
}
export default  ApiHomeworkDocuments 