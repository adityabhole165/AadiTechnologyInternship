import { IGetClassTeachersBody, IGetClassTeachersResult } from "src/interfaces/ProgressReport/IprogressReport";
import http from '../../requests/SchoolService/schoolServices';
import { IGetStudentNameDropdownBody, IGetStudentNameDropdownResult,IStudentProgressReportBody ,IStudentProgressReportResult} from "src/interfaces/ProgressReport/IprogressReport";

const GetClassTeachers = (data: IGetClassTeachersBody ) => {
    return http.post<IGetClassTeachersResult[]>(
      'Teacher/GetClassTeachers',
      data
    );
  };


  const GetStudentNameDropdown = (data: IGetStudentNameDropdownBody) => {
    return http.post<IGetStudentNameDropdownResult[]>(
      'Teacher/GetStudentNameDropdown',
      data
    );
  };

  const StudentProgressReport = (data: IStudentProgressReportBody) => {
    return http.post<IStudentProgressReportResult[]>(
      'Teacher/StudentProgressReport',
      data
    );
  };

const ApiProgressReport = {
    GetClassTeachers,
    GetStudentNameDropdown,
    StudentProgressReport
   
  };
  export default ApiProgressReport;