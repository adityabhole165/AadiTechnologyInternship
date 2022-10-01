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
        AttendanceStatus: '',
        StudentList: [],
        SaveAttendanceStatus: [],
        stdlist: [],
        StudentAttendanceData: [],
        StudentAbsent: '',
        SaveResponse: ''
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
        GetStudentList(state, action) {
            if (action.payload === null) {
                state.StudentAbsent = ''
                state.StudentList = []
            } else {
                state.StudentList = action.payload
                let arr = []
                action.payload.map((obj) => {
                    if (!obj.isActive)
                        arr.push(obj.text1)
                })
                state.StudentAbsent = arr.join(',')
            }

        },
        GetAttendanceStatusList(state, action) {
            state.AttendanceStatus = action.payload
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
        },
        getSaveResponse(state, action) {
            state.SaveResponse = action.payload
        },
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
            let studentList = null;
            let message = 'There are no students available.'
            if (response?.data != null) {
                studentList = response?.data.map((item, index) => {

                    return {
                        text1: item.RollNumber,
                        text2: item.StudentName,
                        isActive: item.IsPresent === 'true' ? true : false,
                        status: item.Status,
                        joinDate: item.JoinDate
                    }

                })

                const data2 = {
                    asAcademicYearId: data.asAcademicYearId,
                    asAttendanceDate:data.asDate,
                    asSchoolId: data.asSchoolId,
                    asStanardDivisionId: data.asStdDivId
                }
                const response2 = await GetTAttendanceListApi.GetAttendanceStatus(data2);
                response2.data?.map((item, i) => {
                    message = item.AcademicYearMsg === '' ? item.StatusMessage: item.AcademicYearMsg
                })
            }
            dispatch(TAttendanceSlice.actions.GetStudentList(studentList));
            dispatch(TAttendanceSlice.actions.GetAttendanceStatusList(message));
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
            console.log(response)
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
            let message = ''
            response.data?.map((item, i) => {       
                message = item.StatusMessage
            })
            dispatch(TAttendanceSlice.actions.GetAttendanceStatusList(message));
        }

export const GetSaveAttendanceStatus =
    (data: ISaveAttendance): AppThunk =>
        async (dispatch) => {
            let response = await GetTAttendanceListApi.SaveStudentAttendanceDetails(data);
            let responseMsg = ''

            // GetTAttendanceListApi.SaveStudentAttendanceDetails(data)
            // .then((resp) => {
            //     if (resp.status == 200) {
            // response = resp.data;
            //     }
            // })
            // .catch((err) => {
            //     responseMsg = 'error network';
            // });
            responseMsg = 'Attendance saved for the valid roll number(s) !!!'

            const GetStudentDetails: IStudentsDetails = {
                asStdDivId: data.asStandardDivisionId,
                asDate: '14-Apr-2022',
                asAcademicYearId: data.asAcademicYearId,
                asSchoolId: data.asSchoolId
            };
            dispatch(TAttendanceSlice.actions.getSaveResponse(responseMsg));
            dispatch(TAttendanceSlice.actions.GetSaveAttendanceStatusList(response.data));
        }

export default TAttendanceSlice.reducer