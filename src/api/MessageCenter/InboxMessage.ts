import http from "../../requests/SchoolService/schoolServices";
import {IInboxList} from "../../interfaces/MessageCenter/InboxMessage"
import { IgetList } from "src/interfaces/MessageCenter/GetList";

  const GetInboxList = (data: IgetList) => {
    return http.post<IgetList>('MessageCenter/GetMessages',data);
  };
  
const InboxMessageApi  ={
    GetInboxList
}

export default InboxMessageApi ;
