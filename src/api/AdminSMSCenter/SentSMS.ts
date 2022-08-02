import http from "../../Client_Api/SchoolService/schoolServices";
import  ISent  from "src/Interface/AdminSMSCenter/SentSMS";

const GetSentSMS = (data: ISent) => {
    return http.post<ISent>('SMS/GetAllSentSMSPermissionAndCounts',data);
  };


  const GetSMSApi  ={
    GetSentSMS
}

export default GetSMSApi
  