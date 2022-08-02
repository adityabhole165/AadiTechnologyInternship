import http from "../../requests/SchoolService/schoolServices";
import {Iyears,IGetAllMonths} from "../../interfaces/MessageCenter/Search"

  const getyears = (data: Iyears) => {
    return http.post<Iyears>('School/GetAllAcademicYears',data);
  };

  const getmonths = (data: IGetAllMonths) => {
    return http.post<IGetAllMonths>('School/GetAllMonths',data);
  };
  
const filterApi  ={
    getyears,
    getmonths
}

export default filterApi ;