import AScheduledSMSListBody from 'src/interfaces/AdminSMSCenter/AScheduledSMS'; // interface for body as AScheduledSMSList from AdminSMSCenter
import http from '../../requests/SchoolService/schoolServices';

const GetAScheduledSMSList = (data: AScheduledSMSListBody) => {
  return http.post<AScheduledSMSListBody>(
    'MessageCenter/GetScheduledSMS',
    data
  );
};

const GetScheduledSMSListApi = {
  GetAScheduledSMSList
};
export default GetScheduledSMSListApi;
