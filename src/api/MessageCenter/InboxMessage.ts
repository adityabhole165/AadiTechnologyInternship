import http from "../../requests/SchoolService/schoolServices";
import {IInboxList} from "../../interfaces/MessageCenter/InboxMessage"
import { IgetList,GetMessagesResult,
  IUpdateReadReceiptStatusBody, IUpdateReadReceiptStatusResult} from "src/interfaces/MessageCenter/GetList";

const GetInboxList = (data: IgetList) => {
  return http.post<GetMessagesResult>('MessageCenter/GetMessages',data);
};

const UpdateReadReceiptStatus = (data: IUpdateReadReceiptStatusBody) => {
  return http.post<IUpdateReadReceiptStatusResult>('MessageCenter/UpdateReadReceiptStatus',data);
};

const InboxMessageApi  ={
    GetInboxList,
    UpdateReadReceiptStatus
}

export default InboxMessageApi ;
