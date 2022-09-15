import http from "../../requests/SchoolService/schoolServices";
import ITimetable, { IWeekdays } from "../../interfaces/Student/TimeTable"

  const GetWeekdaysList = (data: IWeekdays) => {
    return http.post<IWeekdays>('School/GetWeekDays',data);
  };
  
  const GetTimetableList = (data: ITimetable) => {
    return http.post<ITimetable>('Student/GetTimeTable',data);
  };
  
const WeekdaysApi ={
    GetWeekdaysList,
    GetTimetableList
}

export default WeekdaysApi;
