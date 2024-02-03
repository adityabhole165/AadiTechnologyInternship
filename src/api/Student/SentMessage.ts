import {
  GetScheduledSMSResult,
  IgetList
} from 'src/interfaces/MessageCenter/GetList';
import http from '../../requests/SchoolService/schoolServices';

const GetSentMessageList = (data: IgetList) => {
  return http.post<GetScheduledSMSResult>(
    'MessageCenter/GetSentMessages',
    data
  );
};

const SentMessageApi = {
  GetSentMessageList
};

export default SentMessageApi;
