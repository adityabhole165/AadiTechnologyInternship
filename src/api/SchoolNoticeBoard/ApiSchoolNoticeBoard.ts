import http from "../../requests/SchoolService/schoolServices";
import { IGetNoticeBoardDetailsBody ,IGetNoticeBoardDetailsResult} from "src/interfaces/Student/ISchoolNoticeBoard";


  const GetNoticeBoardList = (data: IGetNoticeBoardDetailsBody) => {
    return http.post<IGetNoticeBoardDetailsResult>('User/GetNoticeBoardDetails',data);
  };

 
const SchoolNoticeApi ={
    GetNoticeBoardList,
 
}

export default SchoolNoticeApi;
