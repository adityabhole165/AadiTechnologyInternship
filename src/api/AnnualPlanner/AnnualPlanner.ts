
import http from "../../requests/SchoolService/schoolServices";
import IGetUpcomingEventBody, {IEventList,GetEventsInMonthResult  , IGetEventsMonthResult} from "../../interfaces/Common/AnnualPlanner"
import IGetEventsInMonth from "../../interfaces/Common/AnnualPlanner";

  const GetEventOverviewList = (data: IEventList) => {
    return http.post<GetEventsInMonthResult>('School/GetEventsInMonth',data);
  };

  const GetEventsMonth = (data: IGetEventsInMonth) => {
    return http.post<IGetEventsMonthResult>('School/GetEventsInMonth',data);
  };
  
const AnnualPlannerApi  ={
    GetEventOverviewList,
    GetEventsMonth
}

export default AnnualPlannerApi ;