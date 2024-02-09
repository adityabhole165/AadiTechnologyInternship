import IGetEventsInMonth, {
  GetEventsInMonthResult,
  IEventList,
  IGetEventsMonthResult,
  IGetFilePathBody,IGetAllStandardsBody,IGetAllStandardsResult,IGetAllMonthsDropDownBody,IGetAllMonthsDropDownResult,IGetAcadamicYearDropDownBody,
  IGetAcadamicYearDropDownResult,IGetAllEventsBody,IGetAllEventsResult
} from '../../interfaces/Common/AnnualPlanner';
import http from '../../requests/SchoolService/schoolServices';

const GetEventOverviewList = (data: IEventList) => {
  return http.post<GetEventsInMonthResult>('School/GetEventsInMonth', data);
};

const GetEventsMonth = (data: IGetEventsInMonth) => {
  return http.post<IGetEventsMonthResult>('School/GetEventsInMonth', data);
};
const GetFilePath = (data: IGetFilePathBody) => {
  return http.post('School/GetAnnualPlannerFilePath', data);
};
const GetallStandards = (data: IGetAllStandardsBody) => {
  return http.post< IGetAllStandardsResult[]>('Teacher/GetAssociatedStandards',data);
 };
 const  MonthsDropDown = (data: IGetAllMonthsDropDownBody) => {
  return http.post<IGetAllMonthsDropDownResult[]>('Teacher/GetAllMonthsDropDown',data);
};
const  AcadamicYearDropDown = (data: IGetAcadamicYearDropDownBody) => {
  return http.post<IGetAcadamicYearDropDownResult[]>('Teacher/GetAllAcademicYearsForSchool',data);
};
const  AllYearEventList = (data: IGetAllEventsBody) => {
  return http.post<IGetAllEventsResult[]>('Teacher/GetAllEvents',data);
};
const AnnualPlannerApi = {
  GetEventOverviewList,
  GetEventsMonth,
  GetFilePath,
  GetallStandards,
  MonthsDropDown,
  AcadamicYearDropDown,
  AllYearEventList
};

export default AnnualPlannerApi;
