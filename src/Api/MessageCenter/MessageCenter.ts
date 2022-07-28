import http from "../../Client_Api/SchoolService/schoolServices";
import { IUserGroupList,ISendMessage} from "../../Interface/MessageCenter/MessageCenter";
import { IgetList } from "src/Interface/MessageCenter/GetList";

  const GetTrashList = (data: IgetList) => {
    return http.post<IgetList>('MessageCenter/GetTrashMessages',data);
  };

  const GetUsegroupList = (data: IUserGroupList) => {
    return http.post<IUserGroupList>('User/GetUsersInGroup',data);
  };
  
  const GetSendMessage = (data: ISendMessage) => {
    return http.post<ISendMessage>('MessageCenter/SendMessage',data);
  };
  
const MessageCenterApi  = {
    GetTrashList,
    GetUsegroupList,
    GetSendMessage
}

export default MessageCenterApi ;