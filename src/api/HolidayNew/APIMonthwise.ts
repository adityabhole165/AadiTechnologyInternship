
import { MonthwiseAttendanceIBody, MonthwiseAttendanceIResult } from 'src/interfaces/HolidayNew/IMonthwise';
import http from '../../requests/SchoolService/schoolServices';
const ListsMonthwiseAttendance = (data: MonthwiseAttendanceIBody) => {
    return http.post<MonthwiseAttendanceIResult>('Teacher/GetMonthwiseAttendance', data);
};
const GetAllMonthwiseAttendanceApi =
{
    ListsMonthwiseAttendance
};
export default GetAllMonthwiseAttendanceApi;