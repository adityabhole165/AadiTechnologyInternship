import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import staffBirthdayApi from "../../Api/Common/StaffBirthday";
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import IstaffBirthday from 'src/Interface/Common/StaffBirthday';

const staffBirthdayslice = createSlice({
  name: 'staffBirthday',
  initialState:{
    staffBirthdayData:[]
  },
  reducers: {
    getstaffBirthday(state,action){
      state.staffBirthdayData=action.payload.GetStaffBirthdaysList;
    }
  }   
});


export const getstaffBirthday =
  (data:IstaffBirthday): AppThunk =>
  async (dispatch) => {
    const response = await staffBirthdayApi.GetstaffBirthdayList(data);
    dispatch(staffBirthdayslice.actions.getstaffBirthday(response.data));
  };


export default staffBirthdayslice.reducer
