import http from "../../requests/SchoolService/schoolServices";
import { IHomework,IHomeworkSubject,IHomeworkDetailsResult,IHomeworkSubjectResult } from "src/interfaces/Student/Homework";

const GetHomeworkList = (data:IHomework) => {
    return http.post<IHomeworkDetailsResult>('Student/GetHomeworkDetails',data);
}

const GetHomeworkSubjectList = (data:IHomeworkSubject) => {
    return http.post<IHomeworkSubjectResult>('Student/GetHomeworkSubjects',data);
}

const HomeworkApi ={
    GetHomeworkList,
    GetHomeworkSubjectList
}

export default HomeworkApi