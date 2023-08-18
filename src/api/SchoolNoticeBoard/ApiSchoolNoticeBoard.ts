import http from "../../requests/SchoolService/schoolServices";
import { IGetAllActiveNoticesBody, IGetAllActiveNoticesResult, IGetNoticeBoardDetailsBody ,IGetNoticeBoardDetailsResult} from "src/interfaces/Student/ISchoolNoticeBoard";


  const GetNoticeBoardList = (data: IGetNoticeBoardDetailsBody) => {
    return http.post<IGetNoticeBoardDetailsResult>('User/GetNoticeBoardDetails',data);
  };

  const GetAllActiveNotices = (data: IGetAllActiveNoticesBody) => {
    return http.post<IGetAllActiveNoticesResult>('School/GetAllActiveNotices',data);
  };

 
const SchoolNoticeApi ={
    GetNoticeBoardList,
    GetAllActiveNotices
 
}

export default SchoolNoticeApi;
