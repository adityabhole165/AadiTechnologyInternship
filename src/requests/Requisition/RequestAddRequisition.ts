import { createSlice } from '@reduxjs/toolkit';
import ApiAddRequisition from 'src/api/Requisition/ApiAddRequisition';
import { IGetItemCategoryBody,IGetAddItemListBody } from 'src/interfaces/Requisition/IAddRequisition';
import { AppThunk } from 'src/store';

const SliceAddRequisition = createSlice({
  name: 'AddRequisition',
  initialState: {
    ISGetItemCategory: [],
    IsGetAddItemList :[]
  },
  reducers: {
    RGetItemCategory(state, action) {
      state.ISGetItemCategory = action.payload;
    },

    RGetAddItemList(state, action) {
      state.IsGetAddItemList = action.payload;
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
      let AllStudentsList = response.data.map((item, i) => ({
        Text1: item.ItemCategoryName,
        Text2: item.ItemName,
        Text5: item.PieceCount,
      }));
      dispatch(SliceAddRequisition.actions.RGetAddItemList(AllStudentsList));
    };

  


export default SliceAddRequisition.reducer;
