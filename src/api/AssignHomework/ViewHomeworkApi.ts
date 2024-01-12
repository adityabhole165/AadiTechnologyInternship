import http from "../../requests/SchoolService/schoolServices"
import {IGetHomeworkDetailBody,IGetHomeworkDetailResult,IDeleteHomeworkDocumentBody} from "src/interfaces/AssignHomework/IViewHomework"


const HomeworkDetail = (data: IGetHomeworkDetailBody) => {
    return http.post<IGetHomeworkDetailResult[]>('Homework/GetHomeworkDetails', data);
};



const ViewHomeworkApi ={
   
    HomeworkDetail,
  

}
export default  ViewHomeworkApi 