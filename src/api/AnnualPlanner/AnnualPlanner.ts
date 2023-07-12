
import http from "../../requests/SchoolService/schoolServices";
import IGetUpcomingEventBody, {IEventList,GetEventsInMonthResult  ,IGetUpcomingeventResult} from "../../interfaces/Common/AnnualPlanner"

  const GetEventOverviewList = (data: IEventList) => {
    return http.post<GetEventsInMonthResult>('School/GetEventsInMonth',data);
  };

  const GetUpcomingEvents = (data: IGetUpcomingEventBody) => {
    return http.post<IGetUpcomingeventResult>('Dashboard/GetUpcomingEvents',data);
  };
  
const AnnualPlannerApi  ={
    GetEventOverviewList,
    GetUpcomingEvents
}

export default AnnualPlannerApi ;