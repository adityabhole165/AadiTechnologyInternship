
import http from "../../requests/SchoolService/schoolServices";
import {IEventList,GetEventsInMonthResult} from "../../interfaces/Common/AnnualPlanner"

  const GetEventOverviewList = (data: IEventList) => {
    return http.post<GetEventsInMonthResult>('School/GetEventsInMonth',data);
  };
  
const AnnualPlannerApi  ={
    GetEventOverviewList
}

export default AnnualPlannerApi ;