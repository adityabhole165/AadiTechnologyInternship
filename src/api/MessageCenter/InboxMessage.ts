import http from "../../requests/SchoolService/schoolServices";
import {IInboxList} from "../../interfaces/MessageCenter/InboxMessage"
import { IgetList,GetMessagesResult } from "src/interfaces/MessageCenter/GetList";

  const GetInboxList = (data: IgetList) => {
    return http.post<GetMessagesResult>('MessageCenter/GetMessages',data);
  };
  
const InboxMessageApi  ={
    GetInboxList
}

export default InboxMessageApi ;
