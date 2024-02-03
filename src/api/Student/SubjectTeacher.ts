import ISubjectTeacher from 'src/interfaces/Student/SubjectTeacher';
import http from '../../requests/SchoolService/schoolServices';

const GetSubjectTeacherList = (data: ISubjectTeacher) => {
  return http.post<ISubjectTeacher>('Student/GetSubjectTeacher', data);
};

const SubjectTeacherApi = {
  GetSubjectTeacherList
};

export default SubjectTeacherApi;
