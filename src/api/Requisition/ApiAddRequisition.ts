
  import { IGetItemCategoryResult,IGetItemCategoryBody, IGetAddItemListBody, IGetAddItemListResult, ISaveRequisitionResult, ISaveRequisitionBody } from 'src/interfaces/Requisition/IAddRequisition';
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

  const SaveRequisition = (data: ISaveRequisitionBody) => {
    return http.post<ISaveRequisitionResult>(
      'Teacher/SaveRequisition',
      data
    );
  };


  
  const ApiAddRequisition = {
    GetItemCategory,
    GetAddItemList,
    SaveRequisition
   
  };
  
  export default ApiAddRequisition;
  