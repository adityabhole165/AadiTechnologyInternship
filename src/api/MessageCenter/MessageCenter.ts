import { IgetList } from 'src/interfaces/MessageCenter/GetList';
import {
  IContactGRPBody,
  IContactgrpResult,
  IGetUserEmailSettingsBody,
  IGetUserEmailSettingsResult,
  IUpdateUserEmailSettingBody,
  IUpdateUserEmailSettingResult
} from 'src/interfaces/MessageCenter/MessageCenter';
import {
  IUpdateMessageReadUnreadStatusBody,
  IUpdateMessageReadUnreadStatusResult
} from 'src/interfaces/MessageCenter/ReadUnReadStatus';
import {
  IContactGRPUsersBody,
  IContactgrpUsersResult,
  IGetReadReceiptDetailsBody,
  IGetReadReceiptDetailsResult,
  ISendMessage,
  IUserGroupList
} from '../../interfaces/MessageCenter/MessageCenter';
import http from '../../requests/SchoolService/schoolServices';

const GetTrashList = (data: IgetList) => {
  return http.post('MessageCenter/GetTrashMessages', data);
};

const GetUsegroupList = (data: IUserGroupList) => {
  return http.post<IUserGroupList>('User/GetUsersInGroup', data);
};

const SendMessage = (data: ISendMessage) => {
  return http.post<ISendMessage>('MessageCenter/SendMessage', data);
};

const EmailSettingsapi = (data: IGetUserEmailSettingsBody) => {
  return http.post<IGetUserEmailSettingsResult>(
    'MessageCenter/GetUserEmailSettings',
    data
  );
};

const UpdateUserEmailSettingapi = (data: IUpdateUserEmailSettingBody) => {
  return http.post<IUpdateUserEmailSettingResult>(
    'MessageCenter/UpdateUserEmailSetting',
    data
  );
};
const ContactGRP = (data: IContactGRPBody) => {
  return http.post<IContactgrpResult>('MessageCenter/GetContactGroups', data);
};
const ContactGRPUsers = (data: IContactGRPUsersBody) => {
  return http.post<IContactgrpUsersResult>(
    'MessageCenter/GetContactGroupUsers',
    data
  );
};
const GetReadReceiptDetails = (data: IGetReadReceiptDetailsBody) => {
  return http.post<IGetReadReceiptDetailsResult>(
    'MessageCenter/GetReadReceiptDetails',
    data
  );
};
const GetReadUnReadStatus = (data: IUpdateMessageReadUnreadStatusBody) => {
  return http.post<IUpdateMessageReadUnreadStatusResult>(
    'MessageCenter/UpdateMessageReadUnreadStatus',
    data
  );
};

const MessageCenterApi = {
  GetTrashList,
  GetUsegroupList,
  SendMessage,
  EmailSettingsapi,
  UpdateUserEmailSettingapi,
  ContactGRP,
  ContactGRPUsers,
  GetReadReceiptDetails,
  GetReadUnReadStatus
};

export default MessageCenterApi;
