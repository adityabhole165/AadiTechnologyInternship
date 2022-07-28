import http from "../../Client_Api/SchoolService/schoolServices";
import IHolidays from "../../Interface/Common/Holidays"

  const GetHolidayList = (data: IHolidays) => {
    return http.post<IHolidays>('School/GetHolidayList',data);
  };
  
const HolidaysApi ={
    GetHolidayList
}

export default HolidaysApi;