import { createSlice } from '@reduxjs/toolkit'
import WeekdaysApi from "../../api/Student/TimeTable";
import { AppThunk } from 'src/store';
import ITimetable, { IWeekdays } from 'src/interfaces/Student/TimeTable';
import { ItimeTable } from 'src/interfaces/Student/Tmtimetable';
import WeekdayApi from "../../api/Teacher/TMtimetable";

const TMTimetableslice = createSlice({

  name: 'timetable',

  initialState: {
    Weekdays: [],
    TmTimetable: [],
    AdditionalLecture: []
  },

  reducers: {
    getweekday(state, action) {
      state.Weekdays = action.payload.GetWeekDaysResult;
    },

    gettimetable(state, action) {
      state.TmTimetable = action.payload;
    },

    getAdditionalLectures(state, action) {
      console.log("additional ", action.payload)
      state.AdditionalLecture = action.payload
    }
  }
});

// export const getWeekday =
//   (data: IWdays): AppThunk =>
//     async (dispatch) => {
//       const response = await WeekdayApi.GetWeekdays(data);
//       dispatch(TMTimetableslice.actions.getweekday(response.data));
//     };

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
        return response.data.GetTimeTableResult.TimeTableList
          .filter((obj) => {
            return obj.WeekDay === WeekDay;
          })
          .map((item, index) => {
            return {
              Id: index,
              Name: item.LectureNumber,
              Value: item.Subject
            };
          })
      }
      const header =
        response1.data.GetWeekDaysResult.map((item, index) => {
          return {
            Id: index,
            Name: item.WeekDay,
            Child: child(item.WeekDay)
          };
        })
      const child2 = () => {
        return response.data.GetTimeTableResult.AdditionalLecture.map((item, index) => {
          return {
            Id: index,
            Name: item.Day,
            Value: item.Name,
            text1: item.ClassName,
            text2: item.Number
          };
        })
      }
      const header2 = [{
        Id: 1,
        Name: 'Additional Lecture',
        Child: child2()
      }];
      console.log('abc - ',header2)
      dispatch(TMTimetableslice.actions.getAdditionalLectures(header2));
    

      dispatch(TMTimetableslice.actions.gettimetable(header));
    };

export const getAdditional =
  (data: ItimeTable): AppThunk =>
    async (dispatch) => {
      const response = await WeekdayApi.GetTimetable(data);
      dispatch(TMTimetableslice.actions.getAdditionalLectures(response.data));
    };

export default TMTimetableslice.reducer
