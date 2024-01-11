import http from "../../requests/SchoolService/schoolServices"
import { IGetAllHomeworkDocumentsBody,IGetAllHomeworkDocumentsResult} from "src/interfaces/AssignHomework/IHomeworkDocuments"

const GetAllHomeworkDocuments = (data: IGetAllHomeworkDocumentsBody) => {
    return http.post<IGetAllHomeworkDocumentsResult[]>('Homework/GetAllHomeworkDocuments', data);
};
const ApiHomeworkDocuments ={
    
    GetAllHomeworkDocuments,
    
}
export default  ApiHomeworkDocuments 