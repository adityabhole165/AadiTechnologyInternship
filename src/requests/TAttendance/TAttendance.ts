import { createSlice } from "@reduxjs/toolkit";
import GetTAttendanceListApi from "src/api/TAttendance/TAttendance";
import StandardAttendance, { IStudentsDetails } from "src/interfaces/Teacher/TAttendance";
import AttendanceData, { IGetStudentDetails, IGetAttendanceStatus, ISaveAttendance } from "src/interfaces/Teacher/TAttendanceList";
import { AppThunk } from "src/store";



const TAttendanceSlice = createSlice({

    name: 'TAttendance',

    initialState: {
        StandardDivisionAttendance: [],
        AttendanceData: [],
        GetStudentDetailsList: [],
        AttendanceStatus: [],
        StudentList: [],
        SaveAttendanceStatus: [],
        stdlist: [],
        StudentAttendanceData: [],
        StudentAbsent: ''
    },

    reducers: {
        getStandardList(state, action) {
            state.StandardDivisionAttendance = action.payload
        },
        getStandard(state, action) {
            state.stdlist = action.payload
        },
        getTAttendanceList(state, action) {
            state.AttendanceData = action.payload
        },
        getAttendanceStudentList(state, action) {
            state.StudentAttendanceData = action.payload
        },
        GetStudentDetailsList(state, action) {
            state.GetStudentDetailsList = action.payload
        },
        GetAttendanceStatusList(state, action) {
            state.AttendanceStatus = action.payload
        },
        GetStudentList(state, action) {
            state.StudentList = action.payload
            
            let arr = []
            action.payload.map((obj) => {
                if (!obj.isActive)
                    arr.push(obj.text1)
            })
            state.StudentAbsent = arr.join(',')
        },

        GetSaveAttendanceStatusList(state, action) {
            const arr = action.payload[0].RollNo.split(', ')

            state.StudentList = state.StudentList.map((obj) => {
                return arr.includes(obj.text1.toString()) ?
                    { ...obj, isActive: false } :
                    { ...obj, isActive: true }
                }
            )
            state.StudentAbsent = arr.join(',')
            state.SaveAttendanceStatus = action.payload
        }
    }
});



export const getAttendanceDataList =
    (data: AttendanceData): AppThunk =>
        async (dispatch) => {
            const response = await GetTAttendanceListApi.GetAttendanceData(data);
            dispatch(TAttendanceSlice.actions.getTAttendanceList(response.data));
        };



export const getAttendanceStudentList =
    (data: AttendanceData): AppThunk =>
        async (dispatch) => {
            const response = await GetTAttendanceListApi.GetAttendanceData(data);
            const studentAttendanceList =
                response.data.map((item, index) => {
                    return {
                        text1: item.RollNumber,
                        text2: item.StudentName,
                        isActive: item.IsPresent,
                        status: item.Status
                    }

                })
            dispatch(TAttendanceSlice.actions.getAttendanceStudentList(studentAttendanceList));
        };

export const GetStudentDetailsList =
    (data: IGetStudentDetails): AppThunk =>
        async (dispatch) => {
            const response = await GetTAttendanceListApi.GetStudentDetails(data);
            dispatch(TAttendanceSlice.actions.GetStudentDetailsList(response.data));
        }

export const GetStudentList =
    (data: IGetStudentDetails): AppThunk =>
        async (dispatch) => {
            const response = await GetTAttendanceListApi.GetStudentDetails(data);
            if(response?.data != null){
                const studentList = response?.data.map((item, index) => {
                    
                    return {
                        text1: item.RollNumber,
                        text2: item.StudentName,
                        isActive: item.IsPresent === 'true' ? true : false,
                        status: item.Status,
                        joinDate:item.JoinDate
                    }

                })
            dispatch(TAttendanceSlice.actions.GetStudentList(studentList));
        }
        }
export const getStandard =
    (data: StandardAttendance): AppThunk =>
        async (dispatch) => {
            const response = await GetTAttendanceListApi.GetStandardList(data);
            const standardList =
                response.data.map((item) => {
                    return {
                        Value: item.Id,
                        Name: item.Class,
                    }

                })
            dispatch(TAttendanceSlice.actions.getStandard(standardList));
        };

export const getStandardList =
    (data: StandardAttendance): AppThunk =>
        async (dispatch) => {
            const response = await GetTAttendanceListApi.GetStandardList(data);
            const standardList =
                response.data.map((item) => {
                    return {
                        Value: item.Id,
                        Name: item.Class,
                    }

                })
            dispatch(TAttendanceSlice.actions.getStandard(standardList));
        };

export const GetAttendanceStatus =
    (data: IGetAttendanceStatus): AppThunk =>
        async (dispatch) => {
            const response = await GetTAttendanceListApi.GetAttendanceStatus(data);
            dispatch(TAttendanceSlice.actions.GetAttendanceStatusList(response.data));
        }

export const GetSaveAttendanceStatus =
    (data: ISaveAttendance): AppThunk =>
        async (dispatch) => {
            const response = await GetTAttendanceListApi.SaveStudentAttendanceDetails(data);


            const GetStudentDetails: IStudentsDetails = {
                asStdDivId: data.asStandardDivisionId,
                asDate: data.asDate,
                asAcademicYearId: data.asAcademicYearId,
                asSchoolId: data.asSchoolId
            };
            dispatch(TAttendanceSlice.actions.GetSaveAttendanceStatusList(response.data));
        }

export default TAttendanceSlice.reducer