import http from "../../Client_Api/SchoolService/schoolServices";
import {Iyears,IGetAllMonths} from "../../Interface/MessageCenter/Search"

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