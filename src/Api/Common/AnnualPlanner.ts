
import http from "../../Client_Api/SchoolService/schoolServices";
import {IEventList} from "../../Interface/Common/AnnualPlanner"

  const GetEventOverviewList = (data: IEventList) => {
    return http.post<IEventList>('School/GetEventsInMonth',data);
  };
  
const AnnualPlannerApi  ={
    GetEventOverviewList
}

export default AnnualPlannerApi ;