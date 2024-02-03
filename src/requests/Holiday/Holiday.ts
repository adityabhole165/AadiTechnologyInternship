import { createSlice } from '@reduxjs/toolkit';
import HolidaysApi from 'src/api/Holiday/Holiday';
import { getDateFormatted, isFutureDateTime } from 'src/components/Common/Util';
import IHolidays from 'src/interfaces/Common/Holidays';
import { AppThunk } from 'src/store';

const Holidaysslice = createSlice({
  name: 'holidays',
  initialState: {
    HolidaysData: [],
    Loading: true
  },
  reducers: {
    getHolidays(state, action) {
      state.Loading = false;
      state.HolidaysData = action.payload;
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

export default Holidaysslice.reducer;
