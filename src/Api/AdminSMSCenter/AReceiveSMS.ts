import http from "../../Client_Api/SchoolService/schoolServices";
import AReceiveSMSListBody from "src/Interface/AdminSMSCenter/AReceiveSMS"; 

const GetAReceiveSMSList = (data:AReceiveSMSListBody)=>{
    return http.post<AReceiveSMSListBody>('MessageCenter/GetMessages',data);
};
const GetReceiveSMSListApi={
    GetAReceiveSMSList
}
export default GetReceiveSMSListApi;