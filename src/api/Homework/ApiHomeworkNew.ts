import http from "../../requests/SchoolService/schoolServices";
import { IGetDatewiseHomeworkDetailsBody, IGetDatewiseHomeworkDetailsResult } from "src/interfaces/Student/IHomeworkNew";

const GetHomeworkList = (data:IGetDatewiseHomeworkDetailsBody) => {
    return http.post<IGetDatewiseHomeworkDetailsResult>('Student/GetDatewiseHomeworkDetails',data);
}

const ApiHomework ={
    GetHomeworkList
    
}

export default ApiHomework