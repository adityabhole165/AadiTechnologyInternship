
import http from "../../requests/SchoolService/schoolServices";
import { IUserLoginExpiresBody, IUserLoginExpiresResult} from "src/interfaces/Student/ICheckForUserLoginExpires";

const UserLoginExpiresapi = (data: IUserLoginExpiresBody) => {
    return http.post<IUserLoginExpiresResult>('User/CheckForUserLoginExpires',data);
  };
  const ApiUserLoginExpires ={
    UserLoginExpiresapi
  }

  export default ApiUserLoginExpires;

 