import http from "../../requests/SchoolService/schoolServices";
import { IHomework,IHomeworkSubject } from "src/interfaces/Student/Homework";

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