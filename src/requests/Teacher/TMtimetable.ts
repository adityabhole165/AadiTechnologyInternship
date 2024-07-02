import { createSlice } from '@reduxjs/toolkit';
import ITimetable, { IWeekdays } from 'src/interfaces/Student/TimeTable';
import { ItimeTable } from 'src/interfaces/Student/Tmtimetable';
import { IGetTeacherTimeTableBody } from 'src/interfaces/Teacher/ITeacherTimeTable';
import { AppThunk } from 'src/store';
import WeekdaysApi from '../../api/Student/TimeTable';
import WeekdayApi from '../../api/Teacher/TMtimetable';

const TMTimetableslice = createSlice({
  name: 'timetable',

  initialState: {
    Weekdays: [],
    TmTimetable: [],
    AdditionalLecture: [],
    ISGetTeacherTimeTableResult: []
  },

  reducers: {
    getweekday(state, action) {
      state.Weekdays = action.payload.GetWeekDaysResult;
    },

    gettimetable(state, action) {
      state.TmTimetable = action.payload;
    },

    getAdditionalLectures(state, action) {
      state.AdditionalLecture = action.payload;
    },

    RGetTeacherTimeTableResult(state, action) {
      state.ISGetTeacherTimeTableResult = action.payload;
    }
  }
});

export const getTimetable =
  (data: ITimetable): AppThunk =>
    async (dispatch) => {
      const data2: IWeekdays = {
        asAcademicYearId: data.asAcademicYearId,
        asSchoolId: data.asSchoolId
      };
      const response1 = await WeekdaysApi.GetWeekdaysList(data2);
      const response = await WeekdaysApi.GetTimetableList(data);
      let child = (WeekDay) => {
        return response.data.GetTimeTableResult.TimeTableList.filter((obj) => {
          return obj.WeekDay === WeekDay;
        }).map((item, index) => {
          return {
            Id: index,
            Name: 'Lec. No.:' + item.LectureNumber,
            Value: item.Subject,
            text1: '',
            text2: ''
          };
        });
      };
      let header = response1.data.GetWeekDaysResult.map((item, index) => {
        return {
          Id: index,
          Name: item.WeekDay,
          Child: child(item.WeekDay)
        };
      });
      let child2 = () => {
        return response.data.GetTimeTableResult.AdditionalLecture?.map(
          (item, index) => {
            return {
              Id: index,
              Name: '',
              Value: item.ClassName,
              text1: 'Lec. No.:' + item.Number,
              text2: item.Name,
              text3: item.Day
            };
          }
        );
      };
      let header2 = {
        Id: 1,
        Name: 'Additional Lectures',
        Child: child2()
      };
      dispatch(TMTimetableslice.actions.getAdditionalLectures(header2));

      header.push(header2);
      dispatch(TMTimetableslice.actions.gettimetable(header));
    };

export const getAdditional =
  (data: ItimeTable): AppThunk =>
    async (dispatch) => {
      const response = await WeekdayApi.GetTimetable(data);
      dispatch(TMTimetableslice.actions.getAdditionalLectures(response.data));
    };

export const GetTeacherTimeTableResult =
  (data: IGetTeacherTimeTableBody): AppThunk =>
    async (dispatch) => {
      const response = await WeekdayApi.GetTimeTableDisplayForTeacher(data);
      console.log("kfaklfalafld", response)
      let TimeTableList = response.data.listLectureName.map((item, i) => {
        return {
          Id: item.Lecture_No,
          Text1: item.Lecture_Name,
          Text2: item.Monday,
          Text3: item.Tuesday,
          Text4: item.Wednesday,
          Text5: item.Thursday,
          Text6: item.Friday
        }
      })
      console.log("kfaklfalafld..>>>>>", TimeTableList)


      dispatch(TMTimetableslice.actions.RGetTeacherTimeTableResult(TimeTableList));
    };

export default TMTimetableslice.reducer;
