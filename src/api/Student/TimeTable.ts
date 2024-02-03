import ITimetable, {
  GetTimetableResult,
  GetWeekDaysResult,
  IWeekdays
} from '../../interfaces/Student/TimeTable';
import http from '../../requests/SchoolService/schoolServices';

const GetWeekdaysList = (data: IWeekdays) => {
  return http.post<GetWeekDaysResult>('School/GetWeekDays', data);
};

const GetTimetableList = (data: ITimetable) => {
  return http.post<GetTimetableResult>('Student/GetTimeTable', data);
};

const WeekdaysApi = {
  GetWeekdaysList,
  GetTimetableList
};

export default WeekdaysApi;
