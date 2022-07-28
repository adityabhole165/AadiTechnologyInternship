
import http from "../../Client_Api/SchoolService/schoolServices";
import {ISmsList, IMobileNumber, IViewSms} from "../../Interface/Student/SMSCenter"

//Sms center list
  const GetSmsCenterList = (data: ISmsList) => {
    return http.post<ISmsList>('SMS/GetSMSList',data);
  };

//Mobile number
  const GetMobileNumber = (data: IMobileNumber) => {
    return http.post<IMobileNumber>('SMS/GetUserMobileNumber',data);
  };

//View SMS details
  const GetSmsDetails = (data: IViewSms) => {
    return http.post<IViewSms>('SMS/GetSMSDetails',data);
  };

const SmsCenterApi ={
    GetSmsCenterList,
    GetMobileNumber,
    GetSmsDetails
}

export default SmsCenterApi;
