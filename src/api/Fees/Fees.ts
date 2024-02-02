import IFees, {
  GetAllAcademicYearsApiBody,
  GetAllInternalAcademicYears,
  IGetAcademicYearsFeeChallanResult,
  IGetAcademicYearsforFeeChallanBody,
  IGetAllFeeTypesForChallanImportBody,
  IGetAllPayableforChallanBody,
  IGetCautionMoneyReceiptBody,
  IGetDetailsForChallanImportBody,
  IGetDetailsForChallanImportResult,
  IGetFeeDetailsOfOldAcademicBody,
  IGetFeeDetailsOfOldAcademicResult,
  IGetFeeStructureLinksBody,
  IGetFeeStructureLinksResult,
  IGetFeeTypesForChallanImportResult,
  IGetFileNameForSNSChallanBody,
  IGetInternalFeeDetailsBody,
  IGetInternalFeeDetailsResult,
  IGetInternalFeeReceiptBody,
  IGetNextYearDetailsBody,
  IGetNextYearDetailsResult,
  IGetNextYearFeeDetailsBody,
  IGetNextYearFeeDetailsResult,
  IGetOldStudentDetailsBody,
  IGetOldStudentDetailsResult,
  IGetPayableforChallanResult,
  IGetReceiptFileName,
  IIsPendingFeesForStudentBody,
  IPayOnline
} from '../../interfaces/Student/Fees';
import http from '../../requests/SchoolService/schoolServices';

const GetFeesList = (data: IFees) => {
  return http.post<IFees>('Student/GetFeeDetails', data);
};

const getPaymentUrl = (data: IPayOnline) => {
  return http.post<IPayOnline>('School/GetSingleSignOnPageEncryptedURL', data);
};

const getReceiptFileName = (data: IGetReceiptFileName) => {
  return http.post<any>('Student/GetReceiptFileName', data);
};
const getAllAcademicYears = (data: GetAllAcademicYearsApiBody) => {
  return http.post<any>('Student/GetAllAcademicYearsOfStudent', data);
};
const getAllAcademicInternalYears = (data: GetAllAcademicYearsApiBody) => {
  return http.post<GetAllInternalAcademicYears>(
    'Student/GetAllAcademicYearsForInternalFee',
    data
  );
};
const GetFeeDetailsOfOldAcademic = (data: IGetFeeDetailsOfOldAcademicBody) => {
  return http.post<IGetFeeDetailsOfOldAcademicResult>(
    'Student/GetFeeDetailsOfOldAcademic',
    data
  );
};

const InternalFeeDetails = (data: IGetInternalFeeDetailsBody) => {
  return http.post<IGetInternalFeeDetailsResult>(
    'Student/GetInternalFeeDetails',
    data
  );
};

const GetNextYearDetails = (data: IGetNextYearDetailsBody) => {
  return http.post<IGetNextYearDetailsResult>(
    'Student/GetNextYearDetails',
    data
  );
};

const GetNextYearFeeDetails = (data: IGetNextYearFeeDetailsBody) => {
  return http.post<IGetNextYearFeeDetailsResult>(
    'Student/GetNextYearFeeDetails',
    data
  );
};
const GetOldStudentDetails = (data: IGetOldStudentDetailsBody) => {
  return http.post<IGetOldStudentDetailsResult>(
    'Student/GetOldStudentDetails',
    data
  );
};
const GetFeeStructureLinks = (data: IGetFeeStructureLinksBody) => {
  return http.post<IGetFeeStructureLinksResult>(
    'Student/GetFeeStructureLinks',
    data
  );
};
const GetInternalFeeReceipt = (data: IGetInternalFeeReceiptBody) => {
  return http.post('Student/GetInternalFeeReceiptFileName', data);
};
const GetCautionMoneyReceipt = (data: IGetCautionMoneyReceiptBody) => {
  return http.post('Student/GetCautionMoneyReceiptFileName', data);
};

const GetAcademicYearsforFeeChallan = (
  data: IGetAcademicYearsforFeeChallanBody
) => {
  return http.post<IGetAcademicYearsFeeChallanResult>(
    'Student/GetAcademicYearsforFeeChallan',
    data
  );
};

const GetDetailsForChallanImport = (data: IGetDetailsForChallanImportBody) => {
  return http.post<IGetDetailsForChallanImportResult>(
    'Student/GetDetailsForChallanImport',
    data
  );
};

const GetAllFeeTypesForChallanImport = (
  data: IGetAllFeeTypesForChallanImportBody
) => {
  return http.post<IGetFeeTypesForChallanImportResult>(
    'Student/GetAllFeeTypesForChallanImport',
    data
  );
};

const GetAllPayableforChallan = (data: IGetAllPayableforChallanBody) => {
  console.log(data, 'GetAllPayableforChallan');
  return http.post<IGetPayableforChallanResult>(
    'Student/GetAllPayableforChallan',
    data
  );
};

const FileNameForSNSChallan = (data: IGetFileNameForSNSChallanBody) => {
  return http.post<string>('Student/GetFileNameForSNSChallan', data);
};
const IsPendingFeesForStudent = (data: IIsPendingFeesForStudentBody) => {
  return http.post<string>('Student/IsPendingFeesForStudent', data);
};

const FeesApi = {
  GetFeesList,
  getPaymentUrl,
  getReceiptFileName,
  getAllAcademicYears,
  getAllAcademicInternalYears,
  GetFeeDetailsOfOldAcademic,
  InternalFeeDetails,
  GetNextYearDetails,
  GetNextYearFeeDetails,
  GetOldStudentDetails,
  GetFeeStructureLinks,
  GetInternalFeeReceipt,
  GetCautionMoneyReceipt,
  GetAcademicYearsforFeeChallan,
  GetDetailsForChallanImport,
  GetAllFeeTypesForChallanImport,
  GetAllPayableforChallan,
  FileNameForSNSChallan,
  IsPendingFeesForStudent
};

export default FeesApi;
