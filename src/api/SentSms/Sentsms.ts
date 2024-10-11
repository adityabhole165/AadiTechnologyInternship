
  import { IGetSentItemsResult ,IGetSentItemsBody} from 'src/interfaces/SentSms/Sentsms';
import http from '../../requests/SchoolService/schoolServices';
  
  const GetSentItemsapi = (data: IGetSentItemsBody) => {
    return http.post<IGetSentItemsResult[]>(
      'Teacher/GetSentItems',
      data
    );
  };
 
  const ApiSentsms = {
    GetSentItemsapi,
   
  };
  
  export default ApiSentsms;
  