import http from "../../requests/SchoolService/schoolServices";
import { IUserGroupList,ISendMessage} from "../../interfaces/MessageCenter/MessageCenter";
import { IgetList } from "src/interfaces/MessageCenter/GetList";

  const GetTrashList = (data: IgetList) => {
    return http.post('MessageCenter/GetTrashMessages',data);
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