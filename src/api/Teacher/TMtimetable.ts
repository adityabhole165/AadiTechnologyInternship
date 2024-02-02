import IWdays, { ItimeTable } from '../../interfaces/Student/Tmtimetable';
import http from '../../requests/SchoolService/schoolServices';

const GetWeekdays = (data: IWdays) => {
  return http.post<IWdays>('School/GetWeekDays', data);
};

const GetTimetable = (data: ItimeTable) => {
  return http.post<ItimeTable>('Student/GetTimeTable', data);
};

const WeekdayApi = {
  GetWeekdays,
  GetTimetable
};

export default WeekdayApi;
