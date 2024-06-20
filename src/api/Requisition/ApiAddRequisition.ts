
  import { IGetItemCategoryResult,IGetItemCategoryBody, IGetAddItemListBody, IGetAddItemListResult, ISaveRequisitionResult, ISaveRequisitionBody,GetItemImageResult,GetItemImageBody } from 'src/interfaces/Requisition/IAddRequisition';
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


  const GetItemImage = (data: GetItemImageBody) => {
    return http.post<GetItemImageResult[]>(
      'Teacher/GetItemImage',
      data
    );
  };



  
  const ApiAddRequisition = {
    GetItemCategory,
    GetAddItemList,
    SaveRequisition,
    GetItemImage
   
  };
  
  export default ApiAddRequisition;
  