
import http from "../../requests/SchoolService/schoolServices";
import {IAuthenticateUser,IStudentDetails} from "src/interfaces/Authentication/Login";

  const AuthenticateUser = (data: IAuthenticateUser) => {
    return http.post<IAuthenticateUser>('User/AuthenticateUser',data);
  };

  const StudentDetails = (data:IStudentDetails) => {
    return http.post<IStudentDetails>('Student/Get',data);
  }
  
const LoginApi ={
    AuthenticateUser,
    StudentDetails
}

export default LoginApi;
