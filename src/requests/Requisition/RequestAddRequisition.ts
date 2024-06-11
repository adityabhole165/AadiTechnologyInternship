import { createSlice } from '@reduxjs/toolkit';
import ApiAddRequisition from 'src/api/Requisition/ApiAddRequisition';
import { IGetItemCategoryBody } from 'src/interfaces/Requisition/IAddRequisition';
import { AppThunk } from 'src/store';

const SliceAddRequisition = createSlice({
  name: 'AddRequisition',
  initialState: {
    ISGetItemCategory: [],
  },
  reducers: {
    RGetItemCategory(state, action) {
      state.ISGetItemCategory = action.payload;
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
  


export default SliceAddRequisition.reducer;
