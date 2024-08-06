import { GetStudentDetailsDropdownResult, IGetAllPrimaryClassTeacherssBody, IGetAllPrimaryClassTeacherssResult,GetStudentDetailsDropdownBody, GetProgressReportDetailsResult, GetProgressReportDetailsBody } from 'src/interfaces/PreprimaryProgressReport/PreprimaryProgressReport';
import http from '../../requests/SchoolService/schoolServices';

const AllPrimaryClassTeachers = (data: IGetAllPrimaryClassTeacherssBody) => {
  return http.post<IGetAllPrimaryClassTeacherssResult[]>(
    'Teacher/GetAllPrimaryClassTeacherss',
    data
  );
};
const StudentDetailsDropdown = (data: GetStudentDetailsDropdownBody) => {
    return http.post<GetStudentDetailsDropdownResult>(
      'Teacher/GetStudentDetailsDropdown',
      data
    );
  };

  const ProgressReportDetails = (data: GetProgressReportDetailsBody) => {
    return http.post<GetProgressReportDetailsResult>(
      'Teacher/GetProgressReportDetails',
      data
    );
  };

const ApiPreprimaryProgressReport = {
    AllPrimaryClassTeachers,
    StudentDetailsDropdown,
    ProgressReportDetails
    
  };
  
  export default ApiPreprimaryProgressReport;