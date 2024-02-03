import {
  GetMessagesResult,
  IUpdateReadReceiptStatusBody,
  IUpdateReadReceiptStatusResult,
  IgetList
} from 'src/interfaces/MessageCenter/GetList';
import http from '../../requests/SchoolService/schoolServices';

const GetInboxList = (data: IgetList) => {
  return http.post<GetMessagesResult>('MessageCenter/GetMessages', data);
};

const UpdateReadReceiptStatus = (data: IUpdateReadReceiptStatusBody) => {
  return http.post<IUpdateReadReceiptStatusResult>(
    'MessageCenter/UpdateReadReceiptStatus',
    data
  );
};

const InboxMessageApi = {
  GetInboxList,
  UpdateReadReceiptStatus
};

export default InboxMessageApi;
