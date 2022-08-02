import http from "../../Client_Api/SchoolService/schoolServices";
import { IHomework,IHomeworkSubject } from "src/Interface/Student/Homework";

const GetHomeworkList = (data:IHomework) => {
    return http.post<IHomework>('Student/GetHomeworkDetails',data);
}

const GetHomeworkSubjectList = (data:IHomeworkSubject) => {
    return http.post<IHomeworkSubject>('Student/GetHomeworkSubjects',data);
}

const HomeworkApi ={
    GetHomeworkList,
    GetHomeworkSubjectList
}

export default HomeworkApi