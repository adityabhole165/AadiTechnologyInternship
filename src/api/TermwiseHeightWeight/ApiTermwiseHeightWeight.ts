import {
  IClassTeacherDropdownBody,
  IClassTeacherDropdownResult,
  IStudentsListBody,
  IStudentsListResult,
  ITermDropdownBody,
  ITermDropdownResult,
  IUpdateStudentDetailsBody
} from 'src/interfaces/TermwiseHeightWeight/ITermwiseHeightWeight';
import http from '../../requests/SchoolService/schoolServices';

const ClassTeacherDropdown = (data: IClassTeacherDropdownBody) => {
  return http.post<IClassTeacherDropdownResult[]>(
    'Teacher/GetAllPrimaryClassTeachers',
    data
  );
};
const TermDropdown = (data: ITermDropdownBody) => {
  return http.post<ITermDropdownResult[]>('Teacher/GetTestwiseTerm', data);
};
const StudentList = (data: IStudentsListBody) => {
  return http.post<IStudentsListResult[]>(
    'Teacher/GetStudentListToCaptureHeighthWeight',
    data
  );
};
const UpdateStudentList = (data: IUpdateStudentDetailsBody) => {
  return http.post('Teacher/UpdateStudentDetailsForHeightWeight', data);
};

const TeacherDropdownApi = {
  ClassTeacherDropdown,
  TermDropdown,
  StudentList,
  UpdateStudentList
};

export default TeacherDropdownApi;
