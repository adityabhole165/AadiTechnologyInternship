import http from "../../requests/SchoolService/schoolServices";
import IFees, { IPayOnline }  from "../../interfaces/Student/Fees";
import IReceipt from "../../interfaces/Student/Fees"

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