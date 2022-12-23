import http from "../../requests/SchoolService/schoolServices";
import {INewRelease,GetNewRelease} from "src/interfaces/Authentication/NewRelease";

  const NewRelease = (data: INewRelease) => {
    return http.post<GetNewRelease>('User/GetNewAppVersionDetails',data);
  };
  
const Newrelease ={
    NewRelease,
}

export default Newrelease;