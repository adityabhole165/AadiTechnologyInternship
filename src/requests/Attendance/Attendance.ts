import { createSlice } from "@reduxjs/toolkit";
import AttendanceApi from "src/api/Attendance/Attendance";
import { IAttendance, IGetAttendanceToppersBody, IGetAcademicYearsForOldAttendanceBody } from "src/interfaces/Student/Attendance";
import { AppThunk } from "src/store";


const AttendanceSlice = createSlice({
    name: 'Attendance',
    initialState: {
        DailyAttendanceList: [],
        GetStudentAttendance: {},
        GetAttendanceDetails: [],
        GetAcademicYearsForOldAttendance: [],
        Loading: true,
    },
    reducers: {
        getAttendanceList(state, action) {
            state.DailyAttendanceList = action.payload.GetStudentAttendaceForMonthResult?.DailyAttendanceList
        },
        getStudentAttendance(state, action) {
            state.GetStudentAttendance = action.payload.StudentAttendance;
            state.Loading = false;
        },
        getAttendanceDetails(state, action) {
            state.GetAttendanceDetails = action.payload.AttendanceDetails;
            state.Loading = false;
        },
        getAcademicYearsForOldAttendance(state, action) {
            state.GetAcademicYearsForOldAttendance = action.payload;
            state.Loading = false;
        },
        getLoading(state) {
            state.Loading = true;
        },
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
            const response = await AttendanceApi.AttendanceToppersApi(data)
            dispatch(AttendanceSlice.actions.getStudentAttendance(response.data));
          };

          export const getAttendanceDetails =
        (data: IGetAttendanceToppersBody): AppThunk =>
          async (dispatch) => {
            dispatch(AttendanceSlice.actions.getLoading());
            const response = await AttendanceApi.AttendanceToppersApi(data)
            dispatch(AttendanceSlice.actions.getAttendanceDetails(response.data));
          };
          
          export const getAcademicYearsForOldAttendance =
          (data: IGetAcademicYearsForOldAttendanceBody): AppThunk =>
            async (dispatch) => {
              dispatch(AttendanceSlice.actions.getLoading());
              const response = await AttendanceApi.AcademicYearsForOldAttendanceApi(data)
              const AcademicYearList =  response.data.AcademicYearDetails.map((item, index) => {
                return {
                  Name:item.AcademicYearName,
                  Value:item.AcademicYearId,
               }
              }) 
              dispatch(AttendanceSlice.actions.getAcademicYearsForOldAttendance(AcademicYearList));
            };




export default AttendanceSlice.reducer