import { createSlice } from "@reduxjs/toolkit";
import GetTAttendanceListApi from "src/api/TAttendance/TAttendance";
import StandardAttendance from "src/interfaces/Teacher/TAttendance";
import AttendanceData, { IGetStudentDetails,IGetAttendanceStatusDetails, ISaveAttendance } from "src/interfaces/Teacher/TAttendanceList";
import { AppThunk } from "src/store";



const TAttendanceSlice = createSlice({

    name: 'TAttendance',

    initialState: {
        StandardDivisionAttendance:[],
        AttendanceData:[],
        GetStudentDetailsList:[],
        AttendanceStatus:[],
        SaveAttendanceStatus:[]
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
        },
        GetAttendanceStatusList(state,action){
            state.AttendanceStatus=action.payload
        },
        GetSaveAttendanceStatusList(state,action){
            state.SaveAttendanceStatus=action.payload
        }
    }
});

export const ConflictsgetStandardList =
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

export const GetAttendanceStatus =
(data:IGetAttendanceStatusDetails):AppThunk =>
async (dispatch)=>{
    const response = await GetTAttendanceListApi.GetAttendanceStatus(data);
    dispatch(TAttendanceSlice.actions.GetAttendanceStatusList(response.data));
}

export const GetSaveAttendanceStatus =
(data:ISaveAttendance):AppThunk =>
async (dispatch)=>{
    const response = await GetTAttendanceListApi.SaveStudentAttendanceDetails(data);
    dispatch(TAttendanceSlice.actions.GetSaveAttendanceStatusList(response.data));
}

export default TAttendanceSlice.reducer