import {
  GetAllAcademicYearsApiBody,
  GetAllAcademicYearsResult,
  GetFinancialYearDetails,
  GetFinancialYearDetailsBody,
  IGetITRFileNameBody,
  IGetITRFileNameResult
} from 'src/interfaces/Student/IIncomeTaxReport';
import http from '../../requests/SchoolService/schoolServices';
// import  { GetAllAcademicYearsApiBody } from 'src/interfaces/Student/Fees';

const GetIncomeTaxReportApi = (data: IGetITRFileNameBody) => {
  return http.post<IGetITRFileNameResult>('Student/GetITRFileName', data);
};

const getAllAcademicYears = (data: GetAllAcademicYearsApiBody) => {
  return http.post<GetAllAcademicYearsResult>(
    'Student/GetAllAcademicYearsOfStudent',
    data
  );
};
const getAllFinancialYears = (data: GetFinancialYearDetailsBody) => {
  return http.post<GetFinancialYearDetails>(
    'School/GetFinancialYearDetails',
    data
  );
};

const ApiIncomeTaxReport = {
  GetIncomeTaxReportApi,
  getAllAcademicYears,
  getAllFinancialYears
};
export default ApiIncomeTaxReport;
