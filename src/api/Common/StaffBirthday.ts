
import http from "../../Client_Api/SchoolService/schoolServices";
import IstaffBirthday from "../../Interface/Common/StaffBirthday";

  const GetstaffBirthdayList = (data: IstaffBirthday) => {
    return http.post<IstaffBirthday>('Teacher/GetStaffBirthdaysList',data);
  };
  
const staffBirthdayApi ={
  GetstaffBirthdayList
    
}

export default staffBirthdayApi ;
