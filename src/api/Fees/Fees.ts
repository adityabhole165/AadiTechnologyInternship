import http from "../../requests/SchoolService/schoolServices";
import IFees, { IGetReceiptFileName, IPayOnline ,GetAllAcademicYearsApiBody,IGetFeeDetailsOfOldAcademicBody,IGetFeeDetailsOfOldAcademicResult,IGetInternalFeeDetailsBody,IGetInternalFeeDetailsResult,IGetNextYearDetailsBody,IGetNextYearDetailsResult,IGetNextYearFeeDetailsBody,IGetNextYearFeeDetailsResult, IGetOldStudentDetailsBody, IGetOldStudentDetailsResult, IGetFeeStructureLinksBody, IGetFeeStructureLinksResult, IGetAcademicYearsforFeeChallanBody, IGetAcademicYearsFeeChallanResult, IGetDetailsForChallanImportResult, IGetDetailsForChallanImportBody, IGetFeeTypesForChallanImportResult, IGetAllFeeTypesForChallanImportBody, IGetAllPayableforChallanBody, IGetPayableforChallanResult, IGetFileNameForSNSChallanBody}  from "../../interfaces/Student/Fees";

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

const GetAcademicYearsforFeeChallan= (data:IGetAcademicYearsforFeeChallanBody) => {
  return http.post<IGetAcademicYearsFeeChallanResult>('Student/GetAcademicYearsforFeeChallan',data);
}

const GetDetailsForChallanImport= (data:IGetDetailsForChallanImportBody) => {
   return http.post<IGetDetailsForChallanImportResult>('Student/GetDetailsForChallanImport',data);
}

const GetAllFeeTypesForChallanImport= (data:IGetAllFeeTypesForChallanImportBody) => {
  return http.post<IGetFeeTypesForChallanImportResult>('Student/GetAllFeeTypesForChallanImport',data);
}

const GetAllPayableforChallan= (data:IGetAllPayableforChallanBody) => {
  console.log(data,"GetAllPayableforChallan")
   return http.post<IGetPayableforChallanResult>('Student/GetAllPayableforChallan',data);
}

const FileNameForSNSChallan = (data:IGetFileNameForSNSChallanBody) => {
  return http.post<string>('Student/GetFileNameForSNSChallan',data);
}

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
    GetAcademicYearsforFeeChallan,
    GetDetailsForChallanImport,
    GetAllFeeTypesForChallanImport,
    GetAllPayableforChallan,
    FileNameForSNSChallan
}

export default FeesApi;