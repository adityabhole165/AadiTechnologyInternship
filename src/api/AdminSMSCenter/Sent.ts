import ISentMsg from 'src/interfaces/AdminSMSCenter/Sent';
import http from '../../requests/SchoolService/schoolServices';

const GetSentMsg = (data: ISentMsg) => {
  return http.post<ISentMsg>('MessageCenter/GetSentMessages', data);
};

const GetSentSMSApi = {
  GetSentMsg
};

export default GetSentSMSApi;
