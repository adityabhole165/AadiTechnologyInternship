import { createSlice } from '@reduxjs/toolkit';
import AttendanceApi from 'src/api/Attendance/Attendance';
import {
  IAttendance,
  IGetAcademicYearsForOldAttendanceBody,
  IGetAttendanceToppersBody
} from 'src/interfaces/Student/Attendance';
import { AppThunk } from 'src/store';

const AttendanceSlice = createSlice({
  name: 'Attendance',
  initialState: {
    DailyAttendanceList: [],
    GetStudentAttendance: [],
    GetAttendanceDetails: [],
    GetAcademicYearsForOldAttendance: [],
    Loading: true
  },
  reducers: {
    getAttendanceList(state, action) {
      state.DailyAttendanceList =
        action.payload.GetStudentAttendaceForMonthResult?.DailyAttendanceList;
    },
    getStudentAttendance(state, action) {
      state.GetStudentAttendance = action.payload;
      state.Loading = false;
    },
    getAttendanceDetails(state, action) {
      state.GetAttendanceDetails = action.payload;
      state.Loading = false;
    },
    getAcademicYearsForOldAttendance(state, action) {
      state.GetAcademicYearsForOldAttendance = action.payload;
      state.Loading = false;
    },
    getLoading(state) {
      state.Loading = true;
    }
  }
});

export const getAttendanceList =
  (data: IAttendance): AppThunk =>
  async (dispatch) => {
    const response = await AttendanceApi.Attendance(data);
    dispatch(AttendanceSlice.actions.getAttendanceList(response.data));
  };

export const getStudentAttendance =
  (data: IGetAttendanceToppersBody): AppThunk =>
  async (dispatch) => {
    dispatch(AttendanceSlice.actions.getLoading());
    let response = await AttendanceApi.AttendanceToppersApi(data);

    const studentChild = (obj) => {
      let Text1,
        Text2,
        Text3,
        Text4 = '';
      let studentChild = [];
      obj.MonthwiseDays?.map((item, index) => {
        if (index % 2 === 0) {
          Text1 = item.MonthName;
          Text2 = item.Days;
        } else {
          Text3 = item.MonthName;
          Text4 = item.Days;
          studentChild.push({
            Text1: Text1,
            Text2: Text2,
            Text3: Text3,
            Text4: Text4
          });
        }
      });
      return studentChild;
    };
    const getDetails = (StudentAttendance, index) => {
      return {
        Id: index,
        Name: StudentAttendance.StudentName,
        Rank: StudentAttendance.RankImagePath,
        Rollno: StudentAttendance.RollNo,
        PresentDays:
          StudentAttendance.PresentDays + '/' + StudentAttendance.TotalDays,
        Percentage: StudentAttendance.Percentage,
        isActive: false,
        Child: studentChild(StudentAttendance)
      };
    };

    dispatch(
      AttendanceSlice.actions.getStudentAttendance([
        getDetails(response.data.StudentAttendance, 1)
      ])
    );

    let arrAttendanceDetails = [];
    response.data.AttendanceDetails.map((item, index) => {
      arrAttendanceDetails.push(getDetails(item, index));
    });
    dispatch(
      AttendanceSlice.actions.getAttendanceDetails(arrAttendanceDetails)
    );
  };

export const getAttendanceDetails =
  (data: IGetAttendanceToppersBody): AppThunk =>
  async (dispatch) => {
    dispatch(AttendanceSlice.actions.getLoading());
    const response = await AttendanceApi.AttendanceToppersApi(data);
    const AttendanceDetails = response.data.AttendanceDetails;

    const TopperAttendance = [];
    dispatch(AttendanceSlice.actions.getAttendanceDetails(TopperAttendance));
  };

export const getAcademicYearsForOldAttendance =
  (data: IGetAcademicYearsForOldAttendanceBody): AppThunk =>
  async (dispatch) => {
    dispatch(AttendanceSlice.actions.getLoading());
    const response = await AttendanceApi.AcademicYearsForOldAttendanceApi(data);
    const AcademicYearList = response.data.AcademicYearDetails.map(
      (item, index) => {
        return {
          Name: item.AcademicYearName,
          Value: item.AcademicYearId
        };
      }
    );
    dispatch(
      AttendanceSlice.actions.getAcademicYearsForOldAttendance(AcademicYearList)
    );
  };

export default AttendanceSlice.reducer;
