import http from "../../Client_Api/SchoolService/schoolServices";
import {IInboxList} from "../../Interface/MessageCenter/InboxMessage"
import { IgetList } from "src/Interface/MessageCenter/GetList";

  const GetInboxList = (data: IgetList) => {
    return http.post<IgetList>('MessageCenter/GetMessages',data);
  };
  
const InboxMessageApi  ={
    GetInboxList
}

export default InboxMessageApi ;
