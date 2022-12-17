import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import IHolidays from 'src/interfaces/Common/Holidays';
import HolidaysApi from 'src/api/Holiday/Holiday';

const Holidaysslice = createSlice({
  name: 'holidays',
  initialState:{
    HolidaysData:[],
    Loading:true
  },
  reducers: {
    getHolidays(state,action){
      state.Loading = false;
      state.HolidaysData=action.payload.GetHolidayListResult;
    },
    getLoading (state,action) {
        state.Loading = true
        state.HolidaysData = [];
    }
  }   
});


export const getHolidays =
  (data:IHolidays): AppThunk =>
  async (dispatch) => {
    dispatch(Holidaysslice.actions.getLoading(true));
    const response = await HolidaysApi.GetHolidayList(data);
    dispatch(Holidaysslice.actions.getHolidays(response.data));
  };


export default Holidaysslice.reducer