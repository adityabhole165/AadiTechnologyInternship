import http from "../../Client_Api/SchoolService/schoolServices";
import AScheduledSMSListBody from "src/Interface/AdminSMSCenter/AScheduledSMS"; // interface for body as AScheduledSMSList from AdminSMSCenter 

const GetAScheduledSMSList = (data:AScheduledSMSListBody)=>{
    return http.post<AScheduledSMSListBody>('MessageCenter/GetScheduledSMS',data);
};

const GetScheduledSMSListApi={
    GetAScheduledSMSList
}
export default GetScheduledSMSListApi;