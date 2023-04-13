import http from "../../requests/SchoolService/schoolServices";
import { IGetDatewiseHomeworkDetailsBody, IGetDatewiseHomeworkDetailsResult } from "src/interfaces/Student/IHomeworkNew";

const GetDatewiseHomeworkDetails = (data:IGetDatewiseHomeworkDetailsBody) => {
    return http.post<IGetDatewiseHomeworkDetailsResult>('Student/GetDatewiseHomeworkDetails',data);
}

const ApiHomework ={
    GetDatewiseHomeworkDetails
    
}

export default ApiHomework