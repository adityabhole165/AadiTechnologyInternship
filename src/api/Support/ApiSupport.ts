import http from "../../requests/SchoolService/schoolServices";
import { IGetSupportDetailsBody, IGetSupportDetailsResult} from "src/interfaces/Student/ISupport"

const Supportapi = (data: IGetSupportDetailsBody) => {
    return http.post<IGetSupportDetailsResult>('Student/GetSupportDetails',data);
  };
  const ApiSupport ={
    Supportapi
  }
  export default ApiSupport;