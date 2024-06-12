
  import { IGetItemCategoryResult,IGetItemCategoryBody, IGetAddItemListBody, IGetAddItemListResult } from 'src/interfaces/Requisition/IAddRequisition';
import http from '../../requests/SchoolService/schoolServices';
  
  const GetItemCategory = (data: IGetItemCategoryBody) => {
    return http.post<IGetItemCategoryResult[]>(
      'Teacher/GetItemCategory',
      data
    );
  };

  const GetAddItemList = (data: IGetAddItemListBody) => {
    return http.post<IGetAddItemListResult[]>(
      'Teacher/GetAddItemList',
      data
    );
  };

  
  const ApiAddRequisition = {
    GetItemCategory,
    GetAddItemList
   
  };
  
  export default ApiAddRequisition;
  