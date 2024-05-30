import { createSlice } from '@reduxjs/toolkit';
import HolidaysApi from 'src/api/Holiday/Holiday';
import { getDateFormatted, getDateMonthYearDayDash, isFutureDateTime } from 'src/components/Common/Util';
import IHolidays, { IGetHolidayBody, IHolidaysFA } from 'src/interfaces/Common/Holidays';
import { AppThunk } from 'src/store';

const Holidaysslice = createSlice({
  name: 'Holidays',
  initialState: {
    HolidaysData: [],
    HolidaysDataF: [],
    DeleteHolidayMsg: '',
    EditHolidayDetails: [],
    HolidayDetails: null,
    Loading: true
  },
  reducers: {
    getHolidays(state, action) {
      state.Loading = false;
      state.HolidaysData = action.payload;
    },


    getHolidaysF(state, action) {
      state.Loading = false;
      state.HolidaysDataF = action.payload;
    },
    getDeleteHolidayMsg(state, action) {
      state.Loading = false;
      state.DeleteHolidayMsg = action.payload;
    },
    resetDeleteHolidayDetails(state) {
      state.Loading = false;
      state.DeleteHolidayMsg = '';
    },
    getEditHolidayDetails(state, action) {
      state.Loading = false;
      state.EditHolidayDetails = action.payload
    },

    getLoading(state, action) {
      state.Loading = true;
      state.HolidaysData = [];
    }
  }
});

export const getHolidays =
  (data: IHolidays): AppThunk =>
    async (dispatch) => {
      dispatch(Holidaysslice.actions.getLoading(true));
      const response = await HolidaysApi.GetHolidayList(data);
      let Data = [];
      Data = response.data.GetHolidayListResult?.map((item, index) => {
        const today = getDateFormatted(new Date());
        return index === 0
          ? {
            id: index,
            Header: item.Name,
            Text1:
              Number(item.ToatalDays) == 1
                ? item.StartDate
                : item.StartDate + ' To ' + item.EndDate,
            Text2: 'Total Days: ' + item.ToatalDays,
            subtitle: 'Total Days: ' + item.ToatalDays,
            TextH3: item.Standards,
            backgroundColor: 'secondary'
          }
          : {
            id: index,
            Header: item.Name,
            Text1:
              Number(item.ToatalDays) > 1
                ? item.StartDate + ' To ' + item.EndDate
                : item.StartDate,
            Text2: 'Total Days: ' + item.ToatalDays,
            TextH3: item.Standards,
            backgroundColor: isFutureDateTime(item.StartDate)
              ? 'primary'
              : 'error'
          };
      });

      dispatch(Holidaysslice.actions.getHolidays(Data));
    };

export const getHolidaysF = (data: IHolidaysFA): AppThunk => async (dispatch) => {
  dispatch(Holidaysslice.actions.getLoading(true));
  const response = await HolidaysApi.GetHolidayList1(data);
  console.log(response, "response---");

  const responseData = response.data.map((Item, i) => {
    return {
      Id: Item.Holiday_Id,
      Text1: getDateMonthYearDayDash(Item.Holiday_Start_Date),
      Text2: getDateMonthYearDayDash(Item.Holiday_End_Date),
      Text3: Item.Holiday_Name,
      Text4: Item.AssociatedStandard,
      Text5: Item.TotalDays
    };
  });
  dispatch(Holidaysslice.actions.getHolidaysF(responseData));
};


export const DeleteHolidayDetails = (data: IGetHolidayBody): AppThunk => async (dispatch) => {
  dispatch(Holidaysslice.actions.getLoading(true));
  const response = await HolidaysApi.GetDeleteHoliday(data);
  dispatch(Holidaysslice.actions.getDeleteHolidayMsg(response.data));
};


export const resetDeleteHolidayDetails = (): AppThunk => async (dispatch) => {
  dispatch(Holidaysslice.actions.resetDeleteHolidayDetails());
};

export const getEditHolidayDetails =
  (data: IGetHolidayBody): AppThunk =>
    async (dispatch) => {
      dispatch(Holidaysslice.actions.getLoading(true));
      const response = await HolidaysApi.GetEditHolidayDetails(data);
      dispatch(Holidaysslice.actions.getEditHolidayDetails(response.data))
    };

export default Holidaysslice.reducer;
