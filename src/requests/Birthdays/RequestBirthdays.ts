import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import ApiBirthdays from 'src/api/Birthdays/ApiBirthdays';
import { IGetUpcomingStaffBdayListBody } from 'src/interfaces/Student/IBirthdays';

const SliceBirthdays = createSlice({
    name: 'Birthdays',
    initialState: {
      BirthdaysList: [],
      Loading: true,
    },
    reducers: {
        GetUpcomingStaffBdayList(state, action) {
          state.Loading = false;
          state.BirthdaysList = action.payload.BirthdayDetailsData;
        },
        getLoading (state,action) {
            state.Loading = true
            state.BirthdaysList = [];
        }
        }
      });

      export const getUpcomingStaffBdayList =
      (data: IGetUpcomingStaffBdayListBody): AppThunk =>
        async (dispatch) => {
          dispatch(SliceBirthdays.actions.getLoading(true));
          const response = await ApiBirthdays.Birthdaysapi(data)
          dispatch(SliceBirthdays.actions.GetUpcomingStaffBdayList(response.data));
        };
    
    export default SliceBirthdays.reducer