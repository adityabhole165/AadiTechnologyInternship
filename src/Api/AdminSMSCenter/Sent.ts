import http from "../../Client_Api/SchoolService/schoolServices";
import ISentMsg from "src/Interface/AdminSMSCenter/Sent";

const GetSentMsg = (data: ISentMsg) => {
    return http.post<ISentMsg>('MessageCenter/GetSentMessages',data);
  };

  const GetSentSMSApi  ={
    GetSentMsg
}

export default GetSentSMSApi