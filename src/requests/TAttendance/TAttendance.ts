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
        StudentList:[],
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
        GetStudentList(state,action){
            state.StudentList=action.payload
        },

        GetSaveAttendanceStatusList(state,action){
            state.SaveAttendanceStatus=action.payload
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

export const GetStudentList =
(data:IGetStudentDetails):AppThunk =>
async (dispatch)=>{
    const response = await GetTAttendanceListApi.GetStudentDetails(data);
    const studentList =
                response.data.map((item, index) => {
                    return {
                        text1: item.RollNumber,
                        text2: item.StudentName,
                        isActive: item.IsPresent,
                        status: item.Status
                    }

                })
    dispatch(TAttendanceSlice.actions.GetStudentList(studentList));
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