
import http from "../../requests/SchoolService/schoolServices";
import {IEventList} from "../../interfaces/Common/AnnualPlanner"

  const GetEventOverviewList = (data: IEventList) => {
    return http.post<IEventList>('School/GetEventsInMonth',data);
  };
  
const AnnualPlannerApi  ={
    GetEventOverviewList
}

export default AnnualPlannerApi ;