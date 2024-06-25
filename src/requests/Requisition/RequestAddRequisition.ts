

import { createSlice } from '@reduxjs/toolkit';
import ApiAddRequisition from 'src/api/Requisition/ApiAddRequisition';
import { IGetItemCategoryBody,IGetAddItemListBody ,ISaveRequisitionBody,GetItemImageBody} from 'src/interfaces/Requisition/IAddRequisition';
import { AppThunk } from 'src/store';

const SliceAddRequisition = createSlice({
  name: 'AddRequisition',
  initialState: {
    ISGetItemCategory: [],
    IsGetAddItemList :[],
    ISSaveRequisition:[],
    ISlistGetRequisitionName:{},
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
    RSaveRequisition(state, action) {
      state.ISSaveRequisition = action.payload;
    },

    RlistGetRequisitionName(state, action) {
      state.ISlistGetRequisitionName = action.payload;
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

      let AddItemList = response.data.map((item, i) => {
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
          ItemCategoryID:item.ItemCategoryID
    

        };
      });
  
      
      dispatch(SliceAddRequisition.actions.RGetAddItemList(AddItemList));
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




  


export default SliceAddRequisition.reducer;
