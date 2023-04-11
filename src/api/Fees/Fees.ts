import http from "../../requests/SchoolService/schoolServices";
import IFees, { IGetReceiptFileName, IPayOnline ,GetAllAcademicYearsApiBody,IGetFeeDetailsOfOldAcademicBody,IGetFeeDetailsOfOldAcademicResult}  from "../../interfaces/Student/Fees";

  const GetFeesList = (data: IFees) => {
    return http.post<IFees>('Student/GetFeeDetails',data);
  };

  const getPaymentUrl = (data: IPayOnline) => {
    return http.post<IPayOnline>('School/GetSingleSignOnPageEncryptedURL',data);
  };

  const getReceiptFileName = (data: IGetReceiptFileName) => {
    return http.post<any>('Student/GetReceiptFileName',data);
  };
  const getAllAcademicYears = (data: GetAllAcademicYearsApiBody) => {
  return http.post<any> ('Student/GetAllAcademicYearsOfStudent',data);
 
  };
  const GetFeeDetailsOfOldAcademic = (data:IGetFeeDetailsOfOldAcademicBody) => {
    return http.post<IGetFeeDetailsOfOldAcademicResult>('Student/GetFeeDetailsOfOldAcademic',data);
}
const FeesApi ={
    GetFeesList,
    getPaymentUrl,
    getReceiptFileName,
    getAllAcademicYears,
    GetFeeDetailsOfOldAcademic
}

export default FeesApi;