import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import IHolidays from 'src/interfaces/Common/Holidays';
import HolidaysApi from 'src/api/Holiday/Holiday';

const Holidaysslice = createSlice({
  name: 'holidays',
  initialState:{
    HolidaysData:[]
  },
  reducers: {
    getHolidays(state,action){
      state.HolidaysData=action.payload.GetHolidayListResult;
    }
  }   
});


export const getHolidays =
  (data:IHolidays): AppThunk =>
  async (dispatch) => {
    const response = await HolidaysApi.GetHolidayList(data);
    dispatch(Holidaysslice.actions.getHolidays(response.data));
  };


export default Holidaysslice.reducer