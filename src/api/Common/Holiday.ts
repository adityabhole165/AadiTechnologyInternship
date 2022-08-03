import http from "../../requests/SchoolService/schoolServices";
import IHolidays from "../../interfaces/Common/Holidays"

  const GetHolidayList = (data: IHolidays) => {
    return http.post<IHolidays>('School/GetHolidayList',data);
  };
  
const HolidaysApi ={
    GetHolidayList
}

export default HolidaysApi;