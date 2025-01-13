import ACompose_SendSMS, {
  GetSMSTemplates,
  MessageTemplateSMSCenter
} from 'src/interfaces/AdminSMSCenter/ACompose_SendSMS';
import http from '../../requests/SchoolService/schoolServices';

const GetMessageTemplateAdminSMSList = (data: MessageTemplateSMSCenter) => {
  return http.post<GetSMSTemplates[]>('Teacher/GetUseTemplate', data);
};

const SendSMS = (data: ACompose_SendSMS) => {
  return http.post<ACompose_SendSMS>('SMS/SendSMS', data);
};

const GetMessageTemplateAdminSMSListApi = {
  GetMessageTemplateAdminSMSList,
  SendSMS
};
export default GetMessageTemplateAdminSMSListApi;
