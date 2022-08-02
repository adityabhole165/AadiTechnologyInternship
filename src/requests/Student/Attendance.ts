import { createSlice } from "@reduxjs/toolkit";
import AttendanceApi from "src/api/Student/Attendance";
import { IAttendance } from "src/interfaces/Student/Attendance";
import { AppThunk } from "src/store";


const AttendanceSlice = createSlice({
    name:'Attendance',
    initialState:{
        DailyAttendanceList:[],
    
    },
    reducers:{
        getAttendanceList(state,action){
            state.DailyAttendanceList=action.payload.GetStudentAttendaceForMonthResult?.DailyAttendanceList
        },
        
    }
});

export const getAttendanceList =
(data:IAttendance):AppThunk=>
async (dispatch)=>{
    const response =await AttendanceApi.Attendance(data);
    dispatch(AttendanceSlice.actions.getAttendanceList(response.data));
};




export default AttendanceSlice.reducer