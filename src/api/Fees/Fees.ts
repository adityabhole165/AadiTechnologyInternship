import http from "../../requests/SchoolService/schoolServices";
import IFees, { IGetReceiptFileName, IPayOnline ,GetAllAcademicYearsApiBody,IGetFeeDetailsOfOldAcademicBody,IGetFeeDetailsOfOldAcademicResult,IGetInternalFeeDetailsBody,IGetInternalFeeDetailsResult,IGetNextYearDetailsBody,IGetNextYearDetailsResult,IGetNextYearFeeDetailsBody,IGetNextYearFeeDetailsResult, IGetOldStudentDetailsBody, IGetOldStudentDetailsResult, IGetFeeStructureLinksBody, IGetFeeStructureLinksResult , IGetInternalFeeReceiptBody , IGetCautionMoneyReceiptBody}  from "../../interfaces/Student/Fees";

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
};

const InternalFeeDetails = (data:IGetInternalFeeDetailsBody) => {
  return http.post<IGetInternalFeeDetailsResult>('Student/GetInternalFeeDetails',data);
}

const GetNextYearDetails = (data:IGetNextYearDetailsBody) => {
  return http.post<IGetNextYearDetailsResult>('Student/GetNextYearDetails',data);
}

const GetNextYearFeeDetails = (data:IGetNextYearFeeDetailsBody) => {
  return http.post<IGetNextYearFeeDetailsResult>('Student/GetNextYearFeeDetails',data);
}
const GetOldStudentDetails = (data:IGetOldStudentDetailsBody) => {
  return http.post<IGetOldStudentDetailsResult>('Student/GetOldStudentDetails',data);
}
const GetFeeStructureLinks = (data:IGetFeeStructureLinksBody) => {
  return http.post<IGetFeeStructureLinksResult>('Student/GetFeeStructureLinks',data);
}
const GetInternalFeeReceipt  = (data: IGetInternalFeeReceiptBody) => {

  return http.post('Student/GetInternalFeeReceiptFileName',data);
};
const GetCautionMoneyReceipt  = (data: IGetCautionMoneyReceiptBody) => {

  return http.post('Student/GetCautionMoneyReceiptFileName',data);
};


const FeesApi ={
    GetFeesList,
    getPaymentUrl,
    getReceiptFileName,
    getAllAcademicYears,
    GetFeeDetailsOfOldAcademic,
    InternalFeeDetails,
    GetNextYearDetails,
    GetNextYearFeeDetails,
    GetOldStudentDetails,
    GetFeeStructureLinks,
    GetInternalFeeReceipt,
    GetCautionMoneyReceipt
    
}

export default FeesApi;