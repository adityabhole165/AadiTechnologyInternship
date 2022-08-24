import { createSlice } from "@reduxjs/toolkit";
import GetTAttendanceListApi from "src/api/TAttendance/TAttendance";
import StandardAttendance from "src/interfaces/Teacher/TAttendance";
import AttendanceData, { IGetStudentDetails } from "src/interfaces/Teacher/TAttendanceList";
import { AppThunk } from "src/store";



const TAttendanceSlice = createSlice({

    name: 'TAttendance',

    initialState: {
        StandardDivisionAttendance:[],
        AttendanceData:[],
        GetStudentDetailsList:[]
    },

    reducers: {
        getStandardList(state,action) {
            state.StandardDivisionAttendance = action.payload
        },
        getTAttendanceList(state,action) {
            state.AttendanceData = action.payload
        },
        GetStudentDetailsList(state,action){
            state.GetStudentDetailsList=action.payload
        }
    }
});

export const getStandardList =
(data:StandardAttendance): AppThunk =>
async(dispatch)=>{
    const response = await GetTAttendanceListApi.GetStandardList(data);
    dispatch(TAttendanceSlice.actions.getStandardList(response.data));
};

export const getAttendanceDataList = 
(data:AttendanceData): AppThunk =>
async(dispatch)=>{
    const response = await GetTAttendanceListApi.GetAttendanceData(data);
    dispatch(TAttendanceSlice.actions.getTAttendanceList(response.data));
};

export const GetStudentDetailsList =
(data:IGetStudentDetails):AppThunk =>
async (dispatch)=>{
    const response = await GetTAttendanceListApi.GetStudentDetails(data);
    dispatch(TAttendanceSlice.actions.GetStudentDetailsList(response.data));
}

export default TAttendanceSlice.reducer