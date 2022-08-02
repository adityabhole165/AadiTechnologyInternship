
import http from "../../requests/SchoolService/schoolServices";
import IstaffBirthday from "../../interfaces/Common/StaffBirthday";

  const GetstaffBirthdayList = (data: IstaffBirthday) => {
    return http.post<IstaffBirthday>('Teacher/GetStaffBirthdaysList',data);
  };
  
const staffBirthdayApi ={
  GetstaffBirthdayList
    
}

export default staffBirthdayApi ;
