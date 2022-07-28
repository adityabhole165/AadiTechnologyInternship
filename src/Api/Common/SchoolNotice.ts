import http from "../../Client_Api/SchoolService/schoolServices";
import ISchoolnotice from "../../Interface/Common/SchoolNotice"
import IViewschoolnotice  from "src/Interface/Student/ViewSchoolNotice";

  const GetSchoolNoticeList = (data: ISchoolnotice) => {
    return http.post<ISchoolnotice>('School/GetSchoolNotices',data);
  };

  const ViewSchoolNoticeList = (data: IViewschoolnotice) => {
    return http.post<IViewschoolnotice>('School/GetSchoolNotices',data);
  };  
const SchoolNoticeApi ={
    GetSchoolNoticeList,
    ViewSchoolNoticeList,
}

export default SchoolNoticeApi;
