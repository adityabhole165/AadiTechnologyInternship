import { createSlice } from '@reduxjs/toolkit';
import ApiBirthdays from 'src/api/Birthdays/ApiBirthdays';
import { IGetUpcomingStaffBdayListBody } from 'src/interfaces/Student/IBirthdays';
import { AppThunk } from 'src/store';

const SliceBirthdays = createSlice({
  name: 'Birthdays',
  initialState: {
    BirthdaysList: [],
    Loading: true
  },
  reducers: {
    GetUpcomingStaffBdayList(state, action) {
      state.Loading = false;
      state.BirthdaysList = action.payload;
    },
    getLoading(state, action) {
      state.Loading = true;
      state.BirthdaysList = [];
    }
  }
});

export const getUpcomingStaffBdayList =
  (data: IGetUpcomingStaffBdayListBody): AppThunk =>
  async (dispatch) => {
    dispatch(SliceBirthdays.actions.getLoading(true));
    const response = await ApiBirthdays.Birthdaysapi(data);
    const BirthdaysL = response.data.BirthdayDetailsData.map((item, index) => {
      return {
        id: index,
        Header: item.UserName,
        Text1: item.Date,
        Text2: item.PhotoPath
      };
    });
    dispatch(SliceBirthdays.actions.GetUpcomingStaffBdayList(BirthdaysL));
  };

export default SliceBirthdays.reducer;
