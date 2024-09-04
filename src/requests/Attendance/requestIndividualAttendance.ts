import { createSlice } from '@reduxjs/toolkit';
import GetStudentNameapi from 'src/api/Attendance/apiIndividualAttendance';
import {
  getAttendanceLegend,
  getDateMonthYearFormattedDash
} from 'src/components/Common/Util';
import {
  IGetCalendarForStudentBody,
  IGetStudentNameBody,
  ISaveStudentAttendanceBody
} from 'src/interfaces/IndividualAttendance/IIndividualAttendance';
import { AppThunk } from 'src/store';

const IndividualAttendanceSlice = createSlice({
  name: 'Attendance',
  initialState: {
    GetStudentName: [],
    GetCalendarForStudent: [],
    SaveStudentAttendance: ''
  },
  reducers: {
    GetStudentname(state, action) {
      state.GetStudentName = action.payload;
    },

    calendarforstudent(state, action) {
      state.GetCalendarForStudent = action.payload;
    },

    SaveAttendance(state, action) {
      state.SaveStudentAttendance = action.payload;
    },
    resetMessage(state) {
      state.SaveStudentAttendance = '';
    }
  }
});

export const getstudentname =
  (data: IGetStudentNameBody): AppThunk =>
    async (dispatch) => {
      const response = await GetStudentNameapi.StudentNameList(data);
      let a = response.data.map((item, i) => {
        return {
          Id: item.StudentName,
          Name: item.StudentName,
          Value: item.Student_Id
        };
      });

      dispatch(IndividualAttendanceSlice.actions.GetStudentname(a));
    };

export const getcalendar =
  (data: IGetCalendarForStudentBody): AppThunk =>
    async (dispatch) => {
      const response = await GetStudentNameapi.Calendarforstudent(data);
      let a = response.data.map((item, i) => {
        return {
          Id: i,
          Name: item.Day,
          Value: getDateMonthYearFormattedDash(item.Attendance_Date),
          IsActive: false,
          Text1:
            item.Status === 'X'
              ? 'N/A'
              : item.Status === 'O'
                ? 'OAY'
                : item.Status === 'D'
                  ? 'W'
                  : item.Status === 'B'
                    ? 'H'
                    : item.StatusDescription,
          Text3: item.Status,
          BackgroundColor: getAttendanceLegend(item.Status),
          ForeColur: item.StatusForeColur,
          IsClickable: (item.Status == "Y" || item.Status == "N"),
          MouseoverStatus: item.StatusDescription
        };
      });
      //console.log(a,"sdfghj")

      dispatch(IndividualAttendanceSlice.actions.calendarforstudent(a));
    };
export const SaveStudentAttendance =
  (data: ISaveStudentAttendanceBody): AppThunk =>
    async (dispatch) => {
      const response = await GetStudentNameapi.SaveAttendance(data);

      dispatch(IndividualAttendanceSlice.actions.SaveAttendance(response.data));
    };

export const resetMessage = (): AppThunk => async (dispatch) => {
  dispatch(IndividualAttendanceSlice.actions.resetMessage());
};
export default IndividualAttendanceSlice.reducer;
