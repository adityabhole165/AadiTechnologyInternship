import http from "../../requests/SchoolService/schoolServices"
import { IClassTeacherListBody,IClassTeacherListRsult ,IGetPagedStudentBody,IGetPagedStudentResult} from "src/interfaces/FinalResult/IFinalResult";

const ClassTeacherList=
(data:IClassTeacherListBody) => {
    return http.post<IClassTeacherListRsult[]>('Teacher/GetClassTeachersDropdown', data)
};


const GetStudentResult=
(data:IGetPagedStudentBody) => {
    return http.post<IGetPagedStudentResult[]>('Homework/GetPagedStudentResult', data)
};

 
const FinalResultApi={
    ClassTeacherList,
    GetStudentResult
}
export default FinalResultApi