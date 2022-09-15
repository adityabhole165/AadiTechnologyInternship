import {createSlice} from '@reduxjs/toolkit'
import WeekdaysApi from "../../api/Student/TimeTable";
import { AppThunk } from 'src/store';
import ITimetable, { IWeekdays } from 'src/interfaces/Student/TimeTable';

const Timetableslice = createSlice({
  
  name: 'timetable',

  initialState: {
    WeekdaysData: [],
    TimetableData: [],
  },

  reducers: {
    getWeekdays(state, action) {
      state.WeekdaysData = action.payload.GetWeekDaysResult;
    },

    getTimetable(state, action) {
      state.TimetableData = action.payload.GetTimeTableResult.TimeTableList;
    },
  }
});

export const getWeekdays =
  (data: IWeekdays): AppThunk  =>
    async (dispatch) => {
      const response = await WeekdaysApi.GetWeekdaysList(data);
      dispatch(Timetableslice.actions.getWeekdays(response.data));
    };

export const getTimetable =
  (data: ITimetable): AppThunk =>
    async (dispatch) => {
      const response = await WeekdaysApi.GetTimetableList(data);
      dispatch(Timetableslice.actions.getTimetable(response.data));
    };


export default Timetableslice.reducer
