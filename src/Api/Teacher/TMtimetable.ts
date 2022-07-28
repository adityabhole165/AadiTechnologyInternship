import http from "../../Client_Api/SchoolService/schoolServices";
import IWdays ,{ItimeTable} from "../../Interface/Student/Tmtimetable"

  const GetWeekdays = (data: IWdays) => {
    return http.post<IWdays>('School/GetWeekDays',data);
  };
  
  const GetTimetable = (data: ItimeTable) => {
    return http.post<ItimeTable>('Student/GetTimeTable',data);
  };
  
const WeekdayApi ={
    GetWeekdays,
    GetTimetable
}

export default WeekdayApi;