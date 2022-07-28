import http from "../../Client_Api/SchoolService/schoolServices";
import {MessageTemplateSMSCenter} from "src/Interface/AdminSMSCenter/ACompose_SendSMS"; 
import ACompose_SendSMS from "src/Interface/AdminSMSCenter/ACompose_SendSMS";

const GetMessageTemplateAdminSMSList = (data:MessageTemplateSMSCenter)=>{
    return http.post<MessageTemplateSMSCenter>('AdminStaff/GetTemplate',data);
};

const GetSendSMS = (data:ACompose_SendSMS)=>{
    return http.post<ACompose_SendSMS>('SMS/SendSMS',data);
};

const GetMessageTemplateAdminSMSListApi={
    GetMessageTemplateAdminSMSList,
    GetSendSMS
}
export default GetMessageTemplateAdminSMSListApi;