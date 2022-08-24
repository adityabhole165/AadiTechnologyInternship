import {createSlice} from '@reduxjs/toolkit'
import WeekdayApi from "../../api/TMtimetable/TMtimetable";
import { AppThunk } from 'src/store';
import IWdays,{ItimeTable}  from "../../interfaces/Student/Tmtimetable"


const TMTimetableslice = createSlice({
  
  name: 'timetable',

  initialState: {
    Weekdays: [],
    TmTimetable: [],
    AdditionalLecture:[]
  },

  reducers: {
    getweekday(state, action) {
      state.Weekdays = action.payload.GetWeekDaysResult;
    },

    gettimetable(state, action) {
      state.TmTimetable = action.payload.GetTimeTableResult.TimeTableList;
    },
     
    getAdditionalLectures(state,action) {
      state.AdditionalLecture = action.payload.GetTimeTableResult.AdditionalLecture;
    }
  }
});

export const getWeekday =
  (data: IWdays): AppThunk  =>
    async (dispatch) => {
      const response = await WeekdayApi.GetWeekdays(data);
      dispatch(TMTimetableslice.actions.getweekday(response.data));
    };

export const getTimetable =
  (data: ItimeTable): AppThunk =>
    async (dispatch) => {
      const response = await WeekdayApi.GetTimetable(data);
      dispatch(TMTimetableslice.actions.gettimetable(response.data));
    };

    export const getAdditional =
    (data: ItimeTable): AppThunk =>
      async (dispatch) => {
        const response = await WeekdayApi.GetTimetable(data);
        dispatch(TMTimetableslice.actions.getAdditionalLectures(response.data));
      };

export default TMTimetableslice.reducer
