import { createSlice } from '@reduxjs/toolkit';
import ITimetable, { IWeekdays } from 'src/interfaces/Student/TimeTable';
import { ItimeTable } from 'src/interfaces/Student/Tmtimetable';
import { IGetDataForAdditionalClassesBody, IGetLectureCountsForTeachersBody, IGetTeacherTimeTableBody } from 'src/interfaces/Teacher/ITeacherTimeTable';
import { AppThunk } from 'src/store';
import WeekdaysApi from '../../api/Student/TimeTable';
import WeekdayApi from '../../api/Teacher/TMtimetable';

const TMTimetableslice = createSlice({
  name: 'timetable',

  initialState: {
    Weekdays: [],
    TmTimetable: [],
    AdditionalLecture: [],
    ISGetTeacherTimeTableResult: [],
    ISApplicables: [],
    ISGetLectureCountsForTeachers: [],
    ISGetDataForAdditionalClasses: []

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
    },

    RApplicables(state, action) {
      state.ISApplicables = action.payload;
    },

    RGetLectureCountsForTeachers(state, action) {
      state.ISGetLectureCountsForTeachers = action.payload;
    },

    RGetDataForAdditionalClasses(state, action) {
      state.ISGetDataForAdditionalClasses = action.payload;
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

      // Table data
      let TimeTableList = response.data.listLectureName.map((item, i) => {

        function dynamiContent(x) {
          let res = x

          if (x === 'N/A') {
            res = 'N/C'
          }
          return res
        }

        return {
          Id: item.Lecture_No,
          Text1: item.Lecture_Name,
          Text2: item.Monday === 'N/A' && item.Lecture_Name === "Total Lectures" ? '0' : dynamiContent(item.Monday),
          Text3: item.Tuesday === 'N/A' && item.Lecture_Name === "Total Lectures" ? '0' : dynamiContent(item.Tuesday),
          Text4: item.Wednesday === 'N/A' && item.Lecture_Name === "Total Lectures" ? '0' : dynamiContent(item.Wednesday),
          Text5: item.Thursday === 'N/A' && item.Lecture_Name === "Total Lectures" ? '0' : dynamiContent(item.Thursday),
          Text6: item.Friday === 'N/A' && item.Lecture_Name === "Total Lectures" ? '0' : dynamiContent(item.Friday)
        }
      })

      // applicables data | Count Data
      let applicables = response.data.listMPT_Applicables.map((item, i) => {
        return {
          MPT: item.MPT_Applicable,
          Assemble: item.Assembly_Applicable,
          Stayback: item.Stayback_Applicable,
        }
      })

      console.log("kfaklfalafld..>>>>>", TimeTableList)

      console.log("Applicable..>>>>>", applicables)


      dispatch(TMTimetableslice.actions.RGetTeacherTimeTableResult(TimeTableList));
      dispatch(TMTimetableslice.actions.RApplicables(applicables));
    };

export const GetLectureCountsForTeachers =
  (data: IGetLectureCountsForTeachersBody): AppThunk =>
    async (dispatch) => {
      const response = await WeekdayApi.GetLectureCountsForTeachers(data);

      // Table data
      let SubjectLectureCount = response.data.map((item, i) => {
        return {
          Id: item.Teacher_Subject_Id,
          Text1: item.Teacher_Subject_Id,
          Text2: item.Class_Subject,
          Text3: item.Count,
          Text4: item.Standard_Division_Id,
          Text5: item.Subject_Id,
        }
      })
      console.log(">>>>>>>>>>>>TC", SubjectLectureCount)
      dispatch(TMTimetableslice.actions.RGetLectureCountsForTeachers(SubjectLectureCount));

    };


export const GetDataForAdditionalClasses =
  (data: IGetDataForAdditionalClassesBody): AppThunk =>
    async (dispatch) => {
      const response = await WeekdayApi.GetDataForAdditionalClasses(data);

      // Table data
      let AdditionalLecture = response.data.listSubjectName.map((item, i) => {
        return {
          Id: item.Standard_Division_Id,
          Text1: item.WeekDay_Name,
          Text2: item.Lecture_Number,
          Text3: item.ClassName,
          Text4: item.Subject_Name
        }
      })
      console.log(">>>>>>>>>>>>TC", AdditionalLecture)
      dispatch(TMTimetableslice.actions.RGetDataForAdditionalClasses(AdditionalLecture));

    };



export default TMTimetableslice.reducer;
