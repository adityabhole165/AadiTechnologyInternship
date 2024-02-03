import IGetEventsInMonth, {
  GetEventsInMonthResult,
  IEventList,
  IGetEventsMonthResult,
  IGetFilePathBody
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

const AnnualPlannerApi = {
  GetEventOverviewList,
  GetEventsMonth,
  GetFilePath
};

export default AnnualPlannerApi;
