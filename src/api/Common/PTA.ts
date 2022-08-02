import http from "../../requests/SchoolService/schoolServices";
import IPta from "../../interfaces/Common/PTA"

  const GetPtaList = (data: IPta) => {
    return http.post<IPta>('Student/GetPTADetails',data);
    
  };
  
const PtaApi ={
    GetPtaList
}

export default PtaApi;