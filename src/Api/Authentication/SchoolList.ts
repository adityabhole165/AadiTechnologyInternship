
import http from "../../Client_Api/SchoolService/schoolServices";
import {ISchoolList} from "src/Interface/Authentication/SchoolList"

  const SchoolList = (data: ISchoolList) => {
    return http.post<ISchoolList>('School/GetAllSchools',data);
  };
  
const SchoolListApi ={
    SchoolList
}

export default SchoolListApi;
