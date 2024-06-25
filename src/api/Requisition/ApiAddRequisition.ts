
  import { IGetItemCategoryResult,IGetItemCategoryBody, IGetAddItemListBody, IGetAddItemListResult, ISaveRequisitionResult, ISaveRequisitionBody,GetItemImageResult,GetItemImageBody, IGetNewRequisitionValidateItemQuantityResult, IGetNewRequisitionValidateItemQuantityBody , ICanCreateGenralRequisitionBody,ICanSendRequisitionbody} from 'src/interfaces/Requisition/IAddRequisition';
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


  const GetNewRequisitionValidateItemQuantity = (data: IGetNewRequisitionValidateItemQuantityBody) => {
    return http.post<IGetNewRequisitionValidateItemQuantityResult>(
      'Teacher/GetNewRequisitionValidateItemQuantity',
      data
    );
  };


  const CanCreateGenralRequisition = (data: ICanCreateGenralRequisitionBody) => {
    return http.post<''>(
      'Teacher/CanCreateGenralRequisition',
      data
    );
  };

  const CanSendRequisition = (data: ICanSendRequisitionbody) => {
    return http.post<''>(
      'Teacher/CanSendRequisition',
      data
    );
  };




  
  const ApiAddRequisition = {
    GetItemCategory,
    GetAddItemList,
    SaveRequisition,
    GetItemImage,
    GetNewRequisitionValidateItemQuantity,
    CanCreateGenralRequisition,
    CanSendRequisition
   
  };
  
  export default ApiAddRequisition;
  