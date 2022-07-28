import http from "../../Client_Api/SchoolService/schoolServices";
import IFees, { IPayOnline }  from "../../Interface/Student/Fees";
import IReceipt from "../../Interface/Student/Fees"

  const GetFeesList = (data: IFees) => {
    return http.post<IFees>('Student/GetFeeDetails',data);
  };

  const getPaymentUrl = (data: IPayOnline) => {
    return http.post<IPayOnline>('School/GetSingleSignOnPageEncryptedURL',data);
  };
  
const FeesApi ={
    GetFeesList,
    getPaymentUrl
}

export default FeesApi;