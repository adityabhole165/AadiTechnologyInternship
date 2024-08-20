
  import { IGetAbsentStudentDetailsBody, IGetAbsentStudentDetailsResult } from 'src/interfaces/AbsentStudentDetails/IAbsentStudentPopup';
import http from '../../requests/SchoolService/schoolServices';
  
  const GetAbsentStudentDetails = (data: IGetAbsentStudentDetailsBody) => {
    return http.post<IGetAbsentStudentDetailsResult>('Teacher/AbsentStudentDetails', data);
  
  };
  
  
  const apiAbsentStudentPopup = {
    GetAbsentStudentDetails  
  };
  
  export default apiAbsentStudentPopup;