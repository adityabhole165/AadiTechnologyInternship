import ISent from 'src/interfaces/AdminSMSCenter/SentSMS';
import http from '../../requests/SchoolService/schoolServices';

const GetSentSMS = (data: ISent) => {
  return http.post<ISent>('SMS/GetAllSentSMSPermissionAndCounts', data);
};

const GetSMSApi = {
  GetSentSMS
};

export default GetSMSApi;
