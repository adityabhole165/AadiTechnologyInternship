import http from "../../requests/SchoolService/schoolServices";
import IHolidays, {GetHolidayListResult} from "../../interfaces/Common/Holidays"

  const GetHolidayList = (data: IHolidays) => {
    return http.post<GetHolidayListResult>('School/GetHolidayList',data);
  };
  
const HolidaysApi ={
    GetHolidayList
}

export default HolidaysApi;