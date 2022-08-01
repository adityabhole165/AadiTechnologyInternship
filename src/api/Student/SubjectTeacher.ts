import http from "../../Client_Api/SchoolService/schoolServices";
import ISubjectTeacher from "src/Interface/Student/SubjectTeacher";


const GetSubjectTeacherList = (data:ISubjectTeacher) => {
    return http.post<ISubjectTeacher>('Student/GetSubjectTeacher',data);
  };

  const SubjectTeacherApi={
    GetSubjectTeacherList 
  }

  export default SubjectTeacherApi