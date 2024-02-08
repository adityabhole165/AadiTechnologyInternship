import IGetEventsInMonth, {
  GetEventsInMonthResult,
  IEventList,
  IGetEventsMonthResult,
  IGetFilePathBody,IGetAllStandardsBody,IGetAllStandardsResult,IGetAllMonthsDropDownBody,IGetAllMonthsDropDownResult,IGetAcadamicYearDropDownBody,IGetAcadamicYearDropDownResult
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
const AnnualPlannerApi = {
  GetEventOverviewList,
  GetEventsMonth,
  GetFilePath,
  GetallStandards,
  MonthsDropDown,
  AcadamicYearDropDown
};

export default AnnualPlannerApi;
