import { IGetClassTeachersBody, IGetClassTeachersResult, IGetPassedAcademicYearsResult } from "src/interfaces/ProgressReport/IprogressReport";
import http from '../../requests/SchoolService/schoolServices';
import { IGetStudentNameDropdownBody, IGetStudentNameDropdownResult,IStudentProgressReportBody ,IStudentProgressReportResult,IGetPassedAcademicYearsBody,IGetAllMarksGradeConfigurationResult,IGetAllMarksGradeConfigurationBody} from "src/interfaces/ProgressReport/IprogressReport";

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
    return http.post<IStudentProgressReportResult>(
      'Teacher/StudentProgressReport',
      data
    );
  };

  const GetPassedAcademicYears = (data: IGetPassedAcademicYearsBody) => {
    return http.post<IGetPassedAcademicYearsResult[]>(
      'Teacher/GetPassedAcademicYears',
      data
    );
  };


  const GetAllMarksGradeConfiguration = (data: IGetAllMarksGradeConfigurationBody) => {
    return http.post<IGetAllMarksGradeConfigurationResult>(
      'Teacher/GetAllMarksGradeConfiguration',
      data
    );
  };



const ApiProgressReport = {
    GetClassTeachers,
    GetStudentNameDropdown,
    StudentProgressReport,
    GetPassedAcademicYears,
    GetAllMarksGradeConfiguration
   
  };
  export default ApiProgressReport;