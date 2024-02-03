import {
  IGetMonthwiseAttendanceBody,
  IGetMonthwiseAttendanceResult
} from 'src/interfaces/MonthwiseAttendance/IMonthwiseAttendance';
import http from '../../requests/SchoolService/schoolServices';

const MonthwiseAttendance = (data: IGetMonthwiseAttendanceBody) => {
  return http.post<IGetMonthwiseAttendanceResult[]>(
    'Teacher/GetMonthwiseAttendance',
    data
  );
};
const GetMonthwiseAttendanceapi = {
  MonthwiseAttendance
};
export default GetMonthwiseAttendanceapi;
