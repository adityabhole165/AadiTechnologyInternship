import AReceiveSMSListBody from 'src/interfaces/AdminSMSCenter/AReceiveSMS';
import http from '../../requests/SchoolService/schoolServices';

const GetAReceiveSMSList = (data: AReceiveSMSListBody) => {
  return http.post<AReceiveSMSListBody>('MessageCenter/GetMessages', data);
};
const GetReceiveSMSListApi = {
  GetAReceiveSMSList
};
export default GetReceiveSMSListApi;
