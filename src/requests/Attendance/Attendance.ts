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
      let response = await AttendanceApi.AttendanceToppersApi(data)

      const studentChild = (obj) => {
        
        let studentChild = obj.MonthwiseDays.map((item) => {
        
          
          return {
            Name: (item.MonthName + "- "+ item.Days),
            Value: "",
            isAttendanceTopper: true
          }
        })
        // studentChild.push({
        //   Name: "Total:" + obj.PresentDays + "/" + obj.TotalDays
        //   , Value: "", isAttendanceTopper: true
        // })
        // studentChild.push({
        //   Name: "Percentage:" + obj.Percentage
        //   , Value: "", isAttendanceTopper: true
        // })
        return studentChild
      }
      const getDetails = (StudentAttendance) => {
        return {
          Id: 1,
          Name: StudentAttendance.StudentName,
          Rank: StudentAttendance.RankImagePath,
          Rollno: StudentAttendance.RollNo,
          PresentDays: StudentAttendance.PresentDays + '/' + StudentAttendance.TotalDays,
          Percentage: StudentAttendance.Percentage,
          isActive: false,
          Child: studentChild(StudentAttendance)

        }
      }

      dispatch(AttendanceSlice.actions.getStudentAttendance([getDetails(response.data.StudentAttendance)]));

      let  arrAttendanceDetails = [];
      response.data.AttendanceDetails.map((item)=>{
        arrAttendanceDetails.push(getDetails(item))
      })
      dispatch(AttendanceSlice.actions.getAttendanceDetails(arrAttendanceDetails));

    };

export const getAttendanceDetails =
  (data: IGetAttendanceToppersBody): AppThunk =>
    async (dispatch) => {
      dispatch(AttendanceSlice.actions.getLoading());
      const response = await AttendanceApi.AttendanceToppersApi(data)
      const AttendanceDetails = response.data.AttendanceDetails

      //   const studentChild = () => {
      //     let studentChild= AttendanceDetails.MonthwiseDays.map((item)=>{
      //      return {Name: (item.MonthName + 'Total:' + item.Days),
      //        Value:"",
      //        isAttendanceTopper:true}
      //    })
      //    studentChild.push({Name:"Total:"+AttendanceDetails.PresentDays+"/"+AttendanceDetails.TotalDays
      //    , Value:"",isAttendanceTopper:true})
      //    studentChild.push({Name:"Percentage:"+AttendanceDetails.Percentage
      //    , Value:"",isAttendanceTopper:true})
      //    return studentChild
      //  }
      const TopperAttendance = []
      //    Id:1,
      //    Name:AttendanceDetails.StudentName,
      //    Rank:AttendanceDetails.RankImagePath,
      //    Rollno: AttendanceDetails.RollNo,
      //    isActive:false,
      //    Child:studentChild()

      //  }]


      dispatch(AttendanceSlice.actions.getAttendanceDetails(TopperAttendance));
    };

export const getAcademicYearsForOldAttendance =
  (data: IGetAcademicYearsForOldAttendanceBody): AppThunk =>
    async (dispatch) => {
      dispatch(AttendanceSlice.actions.getLoading());
      const response = await AttendanceApi.AcademicYearsForOldAttendanceApi(data)
      const AcademicYearList = response.data.AcademicYearDetails.map((item, index) => {
        return {
          Name: item.AcademicYearName,
          Value: item.AcademicYearId,
        }
      })
      dispatch(AttendanceSlice.actions.getAcademicYearsForOldAttendance(AcademicYearList));
    };




export default AttendanceSlice.reducer