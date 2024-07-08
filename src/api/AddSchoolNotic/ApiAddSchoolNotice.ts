
  import { IGetAllNoticeListBody, IGetAllNoticeListResult } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import http from '../../requests/SchoolService/schoolServices';
  
  
  const GetAllNoticeList     = (data: IGetAllNoticeListBody) => {
    return http.post<IGetAllNoticeListResult[]>(
      'Teacher/GetAllNoticeList',
      data
    );
  };

 

  
  const AddSchoolNoticApi = {
    GetAllNoticeList
   
  };
  
  export default AddSchoolNoticApi;
  