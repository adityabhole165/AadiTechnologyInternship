import http from "../../requests/SchoolService/schoolServices";
import {Iyears,IGetAllMonths,AllAcademicYearsResult,GetAllMonthsResult} from "../../interfaces/MessageCenter/Search"

  const getyears = (data: Iyears) => {
    return http.post<AllAcademicYearsResult>('School/GetAllAcademicYears',data);
  };

  const getmonths = (data: IGetAllMonths) => {
    return http.post<GetAllMonthsResult>('School/GetAllMonths',data);
  };
  
const filterApi  ={
    getyears,
    getmonths
}

export default filterApi ;