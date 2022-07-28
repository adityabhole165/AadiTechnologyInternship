import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { AppThunk } from 'src/store';
import OnlineExamProgressReport from 'src/Interface/Student/OnlineExamProgressReport';
import OnlineExamProgressReportapi from 'src/Api/Student/OnlineExamProgressReport';


const OnlineExamProgressReportSlice = createSlice({
  name: 'OnlineExamProgressReport',
  initialState:{
    SchoolInformation:[],
    Students:[],
    OnlineExams:[],
    Subjects:[],
    MarkInformation:[],
    
  },
  reducers: {
    getStudentDetails(state,action){
      state.Students=action.payload.Students   
    },
    getSchoolInformation(state,action){
        state.SchoolInformation=action.payload.SchoolInformation 
    },
    getOnlineExams(state,action){
        state.OnlineExams=action.payload.OnlineExams
    },
    getSubjects(state,action){
        state.Subjects=action.payload.Subjects 
    },
    getMarkInformation(state,action){
        state.MarkInformation=action.payload.MarkInformation 
    },
  }   
});


export const getStudentDetails =
  (data:OnlineExamProgressReport): AppThunk =>
  async (dispatch) => {
    const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
    dispatch(OnlineExamProgressReportSlice.actions.getStudentDetails(response.data));
  };

  export const getSchoolInformation =
  (data:OnlineExamProgressReport): AppThunk =>
  async (dispatch) => {
    const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
    dispatch(OnlineExamProgressReportSlice.actions.getSchoolInformation(response.data));
  };
  
  export const getOnlineExams =
  (data:OnlineExamProgressReport): AppThunk =>
  async (dispatch) => {
    const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
    dispatch(OnlineExamProgressReportSlice.actions.getOnlineExams(response.data));
  };
  
  export const getSubjects =
  (data:OnlineExamProgressReport): AppThunk =>
  async (dispatch) => {
    const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
    dispatch(OnlineExamProgressReportSlice.actions.getSubjects(response.data));
  };

  export const getMarkInformation =
  (data:OnlineExamProgressReport): AppThunk =>
  async (dispatch) => {
    const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
    dispatch(OnlineExamProgressReportSlice.actions.getMarkInformation(response.data));
  };
  


export default OnlineExamProgressReportSlice.reducer
