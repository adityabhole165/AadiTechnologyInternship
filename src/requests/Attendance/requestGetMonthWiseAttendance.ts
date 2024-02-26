import { createSlice } from '@reduxjs/toolkit';
import GetMonthwiseAttendanceapi from 'src/api/Attendance/apiGetMonthwiseAttendance';
import { IGetMonthwiseAttendanceBody } from 'src/interfaces/MonthwiseAttendance/IMonthwiseAttendance';
import { AppThunk } from 'src/store';

const MonthwiseAttendanceSlice = createSlice({
  name: 'Attendance',
  initialState: {
    GetMonthwiseAttendance: []
  },
  reducers: {
    getmonthwiseattendance(state, action) {
      state.GetMonthwiseAttendance = action.payload;
    }
  }
});

export const getattendance =
  (data: IGetMonthwiseAttendanceBody): AppThunk =>
  async (dispatch) => {
    const response = await GetMonthwiseAttendanceapi.MonthwiseAttendance(data);
    let a = response.data.map((item, i) => {
      return {
        Text1: item.Roll_No,
        Text2: item.StudentName,
        Text3: item.MonthwiseDays,
        // Text4: item.Apr,
        // Text5: item.May,
        // Text6: item.Jun,
        // Text7: item.Jul,
        // Text8: item.Aug,
        // Text9: item.Sep,
        // Text10: item.Oct,
        // Text11: item.Nov,
        // Text12: item.Dec,
        // Text13: item.Jan,
        // Text14: item.Feb,
        Text15: item.PresentDays,
        Text16: item.TotalDays,
        Text17: item.Percentage
      };
    });
    dispatch(MonthwiseAttendanceSlice.actions.getmonthwiseattendance(a));
  };

export default MonthwiseAttendanceSlice.reducer;
