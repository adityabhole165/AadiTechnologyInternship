import {
  IGetAllStudentStatusBody,
  IGetAllStudentStatusResult,
  IGetTeacherListBody,
  IGetTeacherListResult
} from 'src/interfaces/StudentRecords/IStudentRecords';
import http from '../../requests/SchoolService/schoolServices';

const ClassTeacherList = (data: IGetTeacherListBody) => {
  return http.post<IGetTeacherListResult>('Homework/GetTeacherList', data);
};
const AllStudentStatus = (data: IGetAllStudentStatusBody) => {
  return http.post<IGetAllStudentStatusResult[]>(
    'Homework/GetAllStudentStatus',
    data
  );
};

const StudentRecordsApi = {
  ClassTeacherList,
  AllStudentStatus
};
export default StudentRecordsApi;
