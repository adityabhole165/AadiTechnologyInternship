import http from "../../requests/SchoolService/schoolServices";
import { IGetMonthwiseAttendanceBody ,IGetMonthwiseAttendanceResult } from "src/interfaces/MonthwiseAttendance/IMonthwiseAttendance"

const MonthwiseAttendance = (data: IGetMonthwiseAttendanceBody) => {
    return http.post<IGetMonthwiseAttendanceResult[]>('Teacher/GetMonthwiseAttendance',data);
  };
  const GetMonthwiseAttendanceapi={
    MonthwiseAttendance
  }
  export default  GetMonthwiseAttendanceapi