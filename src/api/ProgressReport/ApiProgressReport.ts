import { IGetClassTeachersBody, IGetClassTeachersResult } from "src/interfaces/ExamResult/IExamResult";
import http from '../../requests/SchoolService/schoolServices';

const GetClassTeachers = (data: IGetClassTeachersBody ) => {
    return http.post<IGetClassTeachersResult[]>(
      'Teacher/GetClassTeachers',
      data
    );
  };

const ApiProgressReport = {
    GetClassTeachers
   
  };
  export default ApiProgressReport;