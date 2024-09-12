import {
  GetNewSMSListResult,
  IMobileNumber,
  INewSmsList,
  ISmsList,
  IViewSms
} from '../../interfaces/Student/SMSCenter';
import http from '../../requests/SchoolService/schoolServices';

//Sms center list
const GetSmsCenterList = (data: ISmsList) => {
  return http.post<ISmsList>('SMS/GetSMSList', data);
};

const GetNewSmsCenterList = (data: INewSmsList) => {
  return http.post<GetNewSMSListResult>('Teacher/SMSCenterList', data);
};
//Mobile number
const GetMobileNumber = (data: IMobileNumber) => {
  return http.post<IMobileNumber>('SMS/GetUserMobileNumber', data);
};

//View SMS details
const GetSmsDetails = (data: IViewSms) => {
  return http.post<IViewSms>('SMS/GetSMSDetails', data);
};

const SmsCenterApi = {
  GetSmsCenterList,
  GetNewSmsCenterList,
  GetMobileNumber,
  GetSmsDetails
};

export default SmsCenterApi;
