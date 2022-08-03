import http from "../../requests/SchoolService/schoolServices";
import ISentMsg from "src/interfaces/AdminSMSCenter/Sent";

const GetSentMsg = (data: ISentMsg) => {
    return http.post<ISentMsg>('MessageCenter/GetSentMessages',data);
  };

  const GetSentSMSApi  ={
    GetSentMsg
}

export default GetSentSMSApi