import {
  IAuthenticateUser,
  IStaffDetailsForloginBody,
  IStaffDetailsForloginResult,
  IStudentDetails
} from 'src/interfaces/Authentication/Login';
import http from '../../requests/SchoolService/schoolServices';

const AuthenticateUser = (data: IAuthenticateUser) => {
  return http.post<IAuthenticateUser>('User/AuthenticateUser', data);
};

const StudentDetails = (data: IStudentDetails) => {
  return http.post<IStudentDetails>('Student/Get', data);
};
const StaffDetailsForlogin = (data: IStaffDetailsForloginBody) => {
  return http.post<IStaffDetailsForloginResult>(
    'Student/GetStaffDetailsForlogin',
    data
  );
};

const LoginApi = {
  AuthenticateUser,
  StudentDetails,
  StaffDetailsForlogin
};

export default LoginApi;
