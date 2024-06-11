
  import { IGetItemCategoryResult,IGetItemCategoryBody } from 'src/interfaces/Requisition/IAddRequisition';
import http from '../../requests/SchoolService/schoolServices';
  
  const GetItemCategory = (data: IGetItemCategoryBody) => {
    return http.post<IGetItemCategoryResult[]>(
      'Teacher/GetItemCategory',
      data
    );
  };
  
  const ApiAddRequisition = {
    GetItemCategory,
   
  };
  
  export default ApiAddRequisition;
  