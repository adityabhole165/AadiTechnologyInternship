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
      state.HolidaysData=action.payload;
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
    let Data = [];
    Data = response.data.GetHolidayListResult?.map((item, index) => {
      return index === 0
        ? {
          id: index,
          header: item.Name,
          text1: Number(item.ToatalDays) == 1 ? item.StartDate : item.StartDate + ' To ' + item.EndDate,
          text2: 'Total Days: ' + item.ToatalDays,
          subtitle: 'Total Days: ' + item.ToatalDays,
          TextH3: item.Standards,
          backgroundColor: 'secondary'
        }
        : {
          id: index,
          header: item.Name,
          text1: Number(item.ToatalDays) > 1 ? item.StartDate + ' To ' + item.EndDate : item.StartDate,
          text2: 'Total Days: ' + item.ToatalDays,
          TextH3: item.Standards,
          backgroundColor: 'primary'
        };
    });
  
    dispatch(Holidaysslice.actions.getHolidays(Data));
  };


export default Holidaysslice.reducer