

import { createSlice } from '@reduxjs/toolkit';
import ApiAddRequisition from 'src/api/Requisition/ApiAddRequisition';
import { getDateMonthYearFormatted } from 'src/components/Common/Util';
import { IGetItemCategoryBody,IGetAddItemListBody ,ISaveRequisitionBody,GetItemImageBody,IGetNewRequisitionValidateItemQuantityBody, ICanCreateGenralRequisitionBody,ICanSendRequisitionbody,IGetRequisitionDetailsBody} from 'src/interfaces/Requisition/IAddRequisition';
import { AppThunk } from 'src/store';

const SliceAddRequisition = createSlice({
  name: 'AddRequisition',
  initialState: {
    ISGetItemCategory: [],
    IsGetAddItemList :[],
    ISCountRequisitionList :[],
    ISGetRequisitionDetails:[],
    ISGetRequisitionDetails1:[],
    ISSaveRequisition:[],
    ISlistGetRequisitionName:{},
    ISGetNewRequisitionValidateItemQuantity:{},
    ISCanCreateGenralRequisition:'',
    ISCanSendRequisition:'',
    ISGetItemImage: {
      ImageUrls: []
    },

  },
  reducers: {
    RGetItemCategory(state, action) {
      state.ISGetItemCategory = action.payload;
    },

    RGetAddItemList(state, action) {
      state.IsGetAddItemList = action.payload;
    },
    CountRequisitionList(state, action) {
      state.ISCountRequisitionList = action.payload;
    },
    
    RSaveRequisition(state, action) {
      state.ISSaveRequisition = action.payload;
    },

    RlistGetRequisitionName(state, action) {
      state.ISlistGetRequisitionName = action.payload;
    },
    RGetRequisitionDetails(state, action) {
      state.ISGetRequisitionDetails = action.payload;
    },
     RGetRequisitionDetails1(state, action) {
      state.ISGetRequisitionDetails1 = action.payload;
    },

    RGetNewRequisitionValidateItemQuantity(state, action) {
      state.ISGetNewRequisitionValidateItemQuantity = action.payload;
    },

    RCanCreateGenralRequisition(state, action) {
      state.ISCanCreateGenralRequisition = action.payload;
    },
    RCanSendRequisition(state, action) {
      state.ISCanSendRequisition = action.payload;
    },

    RGetItemImage(state, action) {
      state.ISGetItemImage.ImageUrls = action.payload;
    },
  }
});

export const CDAGetItemCategory =
  (data: IGetItemCategoryBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiAddRequisition.GetItemCategory(data);
    let ItemCategory = [{ Id: '0', Name: 'All', Value: '0'}];
      response.data.map((item, i) => {
        ItemCategory.push({
            Id: item.Id,
            Name: item.Name,
            Value: item.Id    
         
        });
      });

    dispatch(SliceAddRequisition.actions.RGetItemCategory(ItemCategory));
  };

 
  export const CDAGetAddItemList =
  (data: IGetAddItemListBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAddRequisition.GetAddItemList(data);

      let AddItemList = response.data.GetAddItemList.map((item, i) => {
        return {
          ItemID: item.ItemID,
          ItemCode:item.ItemCode,
          ItemName:item.ItemName,
          ItemPrice:item.ItemPrice,
          UOMID:item.UOMID,
          ItemQty:item.ItemQty,
          CurrentStock:item.CurrentStock,
          ItemCategoryName:item.ItemCategoryName,
          ItemReorderLevelQty:item.ItemReorderLevelQty,
          IsConsiderForDetailLevel:item.IsConsiderForDetailLevel,
          ConsiderUnitQuantity:item.ConsiderUnitQuantity,
          ConsiderUnitReorderLevel:item.ConsiderUnitReorderLevel,
          UOMUnit:item.UOMUnit,
          PieceCount:item.PieceCount,
          ActualQuantity:item.ActualQuantity,
          ImageCount:item.ImageCount,
          ItemCategoryID:item.ItemCategoryID,
          Text3 : 0,
    

        };
      });
  
      
      dispatch(SliceAddRequisition.actions.RGetAddItemList(AddItemList));
    dispatch(SliceAddRequisition.actions.CountRequisitionList(response.data.CountRowsOfItems));
    
      
    };

    export const CDASaveRequisition =
  (data: ISaveRequisitionBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAddRequisition.SaveRequisition(data);

      // let listRequisitionnItemDetails = response.data.listRequisitionnItemDetails.map((item, i) => {
      //   return {
      //     Id: item.ItemID,
      //     ItemID: item.ItemID,
      //     ItemQty:item.ItemQty,
      //     UOMUnit:item.UOMUnit,
      //     ItemOrgQty:item.ItemOrgQty,
      //     ItemCode:item.ItemCode,
      //     ItemName:item.ItemName,
      //     CurrentStock:item.CurrentStock,
      //     ReturnQty:item.ReturnQty,
      //     CancelQty:item.CancelQty,
      //     IssueQty:item.IssueQty,
      //     Text3 :item.ItemQty,
      //     Text1 :item.ItemID

      //   };
      // });

      let listGetRequisitionName = response.data.listGetRequisitionName.map((item, i) => {
        return {
        
          RequisitionID: item.RequisitionID,
          RequisitionCode:item.RequisitionCode,
          RequisitionName:item.RequisitionName,
         

        };
      });


      
      dispatch(SliceAddRequisition.actions.RlistGetRequisitionName(listGetRequisitionName));

      
    };


    export const CDAGetItemImage =
  (data: GetItemImageBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiAddRequisition.GetItemImage(data);
    let GetImageUrl = response.data.map((item, i) => {
      return {
      ImageUrl:item.ImageUrl
      };
    });

    dispatch(SliceAddRequisition.actions.RGetItemImage(GetImageUrl));
  };



  export const CDAGetNewRequisitionValidateItemQuantity =
  (data: IGetNewRequisitionValidateItemQuantityBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiAddRequisition.GetNewRequisitionValidateItemQuantity(data);     
    dispatch(SliceAddRequisition.actions.RGetNewRequisitionValidateItemQuantity(response.data));
  };


  export const CDACanCreateGenralRequisition =
  (data: ICanCreateGenralRequisitionBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiAddRequisition.CanCreateGenralRequisition(data);     
    dispatch(SliceAddRequisition.actions.RCanCreateGenralRequisition(response.data));
  };


  export const CDACanSendRequisition =
  (data: ICanSendRequisitionbody): AppThunk =>
  async (dispatch) => {
    const response = await ApiAddRequisition.CanSendRequisition(data);     
    dispatch(SliceAddRequisition.actions.RCanSendRequisition(response.data));
  };

  export const CDAGetRequisitionDetails =
  (data: IGetRequisitionDetailsBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiAddRequisition.GetRequisitionDetailsApi(data);    
    let listGetRequisitionItemDetails = response.data.listGetRequisitionItemDetails.map((item, i) => {
      return {
          ItemID:item.ItemID,
          ItemCode: item.ItemCode,
          ItemName: item.ItemName,
          CurrentStock: item.CurrentStock,
          ItemQty: item.ItemQty,
          ItemStatus: item.ItemStatus,
          IssueQty: item.IssueQty,
          ReturnQty: item.ReturnQty,
          RequisitionDetailsID: item.RequisitionDetailsID,
          RequisitionID: item.RequisitionID,
          UOMUnit:item.UOMUnit,
          RequisitionDescription: item.RequisitionDescription,
          CanEdit: item.CanEdit,
          ActionComment: item.ActionComment,
          RequisitionName: item.RequisitionName,
          RequisitionCode: item.RequisitionCode,
          ItemOrgQty: item.ItemOrgQty,
          ConsiderUnitQuantity: item.ConsiderUnitQuantity,
          UOMPieceCount: item.UOMPieceCount,
          CancelQty:  item.CancelQty,
          Text3 : 0,
         
          // ItemID: item.ItemID,
          // ItemCode:item.ItemCode,
          // ItemName:item.ItemName,
          // ItemQty:item.ItemQty,
          // CurrentStock:item.CurrentStock,
          // ConsiderUnitQuantity:item.ConsiderUnitQuantity,
          // UOMUnit:item.UOMUnit,
          // Text3 : 0,
  


      };
    });

    let listGetRequisitionTeacherDetails = response.data.listGetRequisitionTeacherDetails.map((item, i) => {
      return {
         
         
        CreaterName: item.CreaterName,
           Action: item.Action,
           User_Role_Id: item.User_Role_Id,
           User_Id: item.User_Id,
           RequisitionID: item.RequisitionID,
           Date: item.Date ? getDateMonthYearFormatted(item.Date) : "",
  


      };
    });
      
    dispatch(SliceAddRequisition.actions.RGetRequisitionDetails(listGetRequisitionItemDetails));
    dispatch(SliceAddRequisition.actions.RGetRequisitionDetails1(listGetRequisitionTeacherDetails));

  };




  


export default SliceAddRequisition.reducer;
