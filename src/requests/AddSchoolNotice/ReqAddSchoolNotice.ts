import { createSlice } from '@reduxjs/toolkit';
import { IGetAllNoticeListBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import { AppThunk } from 'src/store';
import AddSchoolNoticApi from 'src/api/AddSchoolNotic/ApiAddSchoolNotice';

const AddSchoolNotice = createSlice({
  name: 'School Notice',
  initialState: {
    ISGetAllNoticeList: [],
    
  },

  reducers: {
    RGetAllNoticeList(state, action) {
      state.ISGetAllNoticeList = action.payload;
    },
   
  }
});


export const CDAGetAllNoticeList =
  (data: IGetAllNoticeListBody): AppThunk =>
    async (dispatch) => {
      const response = await AddSchoolNoticApi.GetAllNoticeList(data);
      dispatch(AddSchoolNotice.actions.RGetAllNoticeList(response.data));
    };




export default AddSchoolNotice.reducer;
