import { createSlice } from '@reduxjs/toolkit';
import ITimetable, { IWeekdays } from 'src/interfaces/Student/TimeTable';
import { AppThunk } from 'src/store';
import WeekdaysApi from '../../api/Student/TimeTable';

const Timetableslice = createSlice({
  name: 'timetable',

  initialState: {
    WeekdaysData: [],
    TimetableData: []
  },

  reducers: {
    getWeekdays(state, action) {
      state.WeekdaysData = action.payload.GetWeekDaysResult;
    },

    getTimetable(state, action) {
      state.TimetableData = action.payload;
    }
  }
});

export const getWeekdays =
  (data: IWeekdays): AppThunk =>
  async (dispatch) => {
    const response = await WeekdaysApi.GetWeekdaysList(data);
    dispatch(Timetableslice.actions.getWeekdays(response.data));
  };

export const getTimetable =
  (data: ITimetable): AppThunk =>
  async (dispatch) => {
    const data2: IWeekdays = {
      asAcademicYearId: data.asAcademicYearId,
      asSchoolId: data.asSchoolId
    };
    const response1 = await WeekdaysApi.GetWeekdaysList(data2);
    const response = await WeekdaysApi.GetTimetableList(data);
    const child = (WeekDay) => {
      return response.data.GetTimeTableResult.TimeTableList.filter((obj) => {
        return obj.WeekDay === WeekDay;
      }).map((item, index) => {
        return {
          Id: index,
          Name: 'Lec. No.:' + item.LectureNumber,
          Value: item.Subject
        };
      });
    };
    const header = response1.data.GetWeekDaysResult.map((item, index) => {
      return {
        Id: index,
        Name: item.WeekDay,
        Child: child(item.WeekDay)
      };
    });

    dispatch(Timetableslice.actions.getTimetable(header));
  };

export default Timetableslice.reducer;
