import {
  AllAcademicYearsResult,
  GetAllMonthsResult,
  IGetAllMonths,
  Iyears
} from '../../interfaces/MessageCenter/Search';
import http from '../../requests/SchoolService/schoolServices';

const getyears = (data: Iyears) => {
  return http.post<AllAcademicYearsResult>('School/GetAllAcademicYears', data);
};

const getmonths = (data: IGetAllMonths) => {
  return http.post<GetAllMonthsResult>('School/GetAllMonths', data);
};

const filterApi = {
  getyears,
  getmonths
};

export default filterApi;
