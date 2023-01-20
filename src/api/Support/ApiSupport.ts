import http from "../../requests/SchoolService/schoolServices";
import {ISaveStudentDetailsForSupportBody,ISaveStudentDetailsForSupportResult} from "src/interfaces/Student/ISupport"


  const SaveSupportapi = (data: ISaveStudentDetailsForSupportBody) => {
    return http.post<ISaveStudentDetailsForSupportResult>('SaveStudentDetailsForSupport',data);
  };
  const ApiSupport ={
    SaveSupportapi
  }
  export default ApiSupport;