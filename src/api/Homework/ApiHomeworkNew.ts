import http from "../../requests/SchoolService/schoolServices";
import { IGetDatewiseHomeworkDetailsBody,HomeworkDates } from "src/interfaces/Student/IHomeworkNew";

const GetHomeworkList = (data:IGetDatewiseHomeworkDetailsBody) => {
    return http.post<HomeworkDates>('Student/GetDatewiseHomeworkDetails',data);
}


const ApiHomework ={
    GetHomeworkList
    
}

export default ApiHomework