import http from "../../requests/SchoolService/schoolServices";
import { IGetTestwiseTermBody,IGetTestwiseTermResult, IGetClassTeachersResult,IGetClassTeachersBody, IGetTeacherXseedSubjectsBody, IGetTeacherXseedSubjectsResult} from "src/interfaces/AssignPrePrimaryGrade/IAssignPrePrimaryGrades"

  const GetTestwiseTermA = (data: IGetTestwiseTermBody) => {
    return http.post<IGetTestwiseTermResult[]>('Teacher/GetTestwiseTerm',data);
  };


  const GetClassTeachers = (data: IGetClassTeachersBody) => {
    return http.post<IGetClassTeachersResult[]>('Teacher/GetClassTeacherss',data);
  };

  const GetTeacherXseedSubjects = (data: IGetTeacherXseedSubjectsBody) => {
    return http.post<IGetTeacherXseedSubjectsResult[]>('Teacher/GetTeacherXseedSubjects',data);
  };


  const ApiAssignPrePrimaryGrades={
    GetTestwiseTermA,
    GetClassTeachers,
    GetTeacherXseedSubjects
  }
  export default  ApiAssignPrePrimaryGrades