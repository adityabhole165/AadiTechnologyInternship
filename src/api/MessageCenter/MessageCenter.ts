import http from "../../requests/SchoolService/schoolServices";
import { IUserGroupList,ISendMessage} from "../../interfaces/MessageCenter/MessageCenter";
import { IgetList } from "src/interfaces/MessageCenter/GetList";
import { IGetUserEmailSettingsBody,IGetUserEmailSettingsResult,
  IUpdateUserEmailSettingBody,IUpdateUserEmailSettingResult,IShowPTAOptionBody,IShowPTAOptionResult} from "src/interfaces/MessageCenter/MessageCenter";

  const GetTrashList = (data: IgetList) => {
    return http.post('MessageCenter/GetTrashMessages',data);
  };

  const GetUsegroupList = (data: IUserGroupList) => {
    return http.post<IUserGroupList>('User/GetUsersInGroup',data);
  };
  
  const GetSendMessage = (data: ISendMessage) => {
    return http.post<ISendMessage>('MessageCenter/SendMessage',data);
  };
  
  const EmailSettingsapi = (data: IGetUserEmailSettingsBody) => {
    return http.post<IGetUserEmailSettingsResult>('MessageCenter/GetUserEmailSettings',data);
  }
  
  const UpdateUserEmailSettingapi = (data: IUpdateUserEmailSettingBody) => {
    return http.post<IUpdateUserEmailSettingResult>('MessageCenter/UpdateUserEmailSetting',data);
  }
  const ShowPTAOption = (data: IShowPTAOptionBody) => {
    return http.post<IShowPTAOptionResult>('MessageCenter/ShowPTAOption',data);
  }
  
const MessageCenterApi  = {
    GetTrashList,
    GetUsegroupList,
    GetSendMessage,
    EmailSettingsapi,
    UpdateUserEmailSettingapi,
    ShowPTAOption
}

export default MessageCenterApi ;