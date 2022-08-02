import http from "../../Client_Api/SchoolService/schoolServices";
import IPta from "../../Interface/Common/PTA"

  const GetPtaList = (data: IPta) => {
    return http.post<IPta>('Student/GetPTADetails',data);
    
  };
  
const PtaApi ={
    GetPtaList
}

export default PtaApi;