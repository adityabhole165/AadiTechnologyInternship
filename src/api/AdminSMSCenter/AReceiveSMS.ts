import http from "../../requests/SchoolService/schoolServices";
import AReceiveSMSListBody from "src/interfaces/AdminSMSCenter/AReceiveSMS"; 

const GetAReceiveSMSList = (data:AReceiveSMSListBody)=>{
    return http.post<AReceiveSMSListBody>('MessageCenter/GetMessages',data);
};
const GetReceiveSMSListApi={
    GetAReceiveSMSList
}
export default GetReceiveSMSListApi;