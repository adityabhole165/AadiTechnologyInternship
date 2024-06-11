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
    let abc = response.data.map((item, i) => {
      return {
        Id: item.Id,
        Name: item.Name,
        Value: item.Id,
      };
    });
    dispatch(SliceAddRequisition.actions.RGetItemCategory(abc));
  };
  


export default SliceAddRequisition.reducer;
