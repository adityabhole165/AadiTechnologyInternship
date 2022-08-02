
import http from "../../requests/SchoolService/schoolServices";
import {ISchoolList} from "src/interfaces/Authentication/SchoolList"

  const SchoolList = (data: ISchoolList) => {
    return http.post<ISchoolList>('School/GetAllSchools',data);
  };
  
const SchoolListApi ={
    SchoolList
}

export default SchoolListApi;
