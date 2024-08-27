import {
  IGetUserDetailsBody,
  IGetUserDetailsResult,
  ISaveStudentDetailsForSupportBody,
  ISaveStudentDetailsForSupportResult
} from 'src/interfaces/Student/ISupport';
import http from '../../requests/SchoolService/schoolServices';

const SaveSupportapi = (data: ISaveStudentDetailsForSupportBody) => {
  return http.post<ISaveStudentDetailsForSupportResult>(
    'Teacher/SaveSupportDetails',
    data
  );
};

const GetUserDetailApi = (data: IGetUserDetailsBody) => {
  return http.post<IGetUserDetailsResult>('User/GetUserDetails', data);
};

const ApiSupport = {
  SaveSupportapi,
  GetUserDetailApi
};
export default ApiSupport;
