import { IGetAllPrimaryClassTeacherssBody, IGetAllPrimaryClassTeacherssResult } from 'src/interfaces/PreprimaryProgressReport/PreprimaryProgressReport';
import http from '../../requests/SchoolService/schoolServices';

const AllPrimaryClassTeachers = (data: IGetAllPrimaryClassTeacherssBody) => {
  return http.post<IGetAllPrimaryClassTeacherssResult[]>(
    'Teacher/GetAllPrimaryClassTeacherss',
    data
  );
};


const ApiPreprimaryProgressReport = {
    AllPrimaryClassTeachers
    
  };
  
  export default ApiPreprimaryProgressReport;