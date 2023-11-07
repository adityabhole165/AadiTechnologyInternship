import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import GetExamResultApi from "../../api/Student/ProgressReport";
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import IExamResult, { IGetProgressReportFileName } from 'src/interfaces/Student/ProgressReport';
import IGetAcademicYearsOfStudent from  'src/interfaces/Student/ProgressReport';
import IGetReasonforBlockingProgressReport from 'src/interfaces/Student/ProgressReport';
import { IIsPendingFeesForStudent } from 'src/interfaces/Student/ProgressReport';
import {IProgressReportBody,IAcademicYearsForProgressReportBody,IGetTermsForProgressReportBody} from  'src/interfaces/Student/ProgressReport';
import { Dispatch } from '@reduxjs/toolkit';

const GetExamResultslice = createSlice({

    name: 'examresult',
    initialState: {
        GetExamResultData: [] ,
        GetAcademicYears: [], 
        GetTerms:[],  
        GetReasonforBlocking: [],
        PendingFees:[],
        ProgressReportFileName:"",
        ProgressReportDownload:null,
        AcademicYearsForProgressReportDownload:[],
        TermsForProgressReportDownload:[]
      
    },
    reducers: {
        getExamResult(state, action) {
            state.GetExamResultData = action.payload.GetStudentExamResultResult; 
        },
        getAcademicYears(state,action){
            state.GetAcademicYears = action.payload.GetAcademicYears; 
            state.GetTerms = action.payload.GetTerms; 
        },
        getReasonforBlockingProgressReport(state,action){
          state.GetReasonforBlocking = action.payload
        },
        getPendingFees(state, action) {
          state.PendingFees = action.payload; 
        },
        getProgressReportFileName(state, action) {
          state.ProgressReportFileName = action.payload.GetProgressReportFileNameResult; 
        },

        getProgressReport(state, action) {
          state.ProgressReportDownload = action.payload; 
        },

        AcademicYearsForProgressReport(state, action) {
          state.AcademicYearsForProgressReportDownload = action.payload; 
        },

        getTermsForProgressReport(state, action) {
          state.TermsForProgressReportDownload = action.payload.Terms; 
        }
    }

});

export const GetExamResultList =
  (data:IExamResult): AppThunk =>
  async (dispatch) => {
    const response = await GetExamResultApi.GetStudentExamResultList(data);
    dispatch(GetExamResultslice.actions.getExamResult(response.data));
  };

  export const GetAcademicYears =
  (data:IGetAcademicYearsOfStudent): AppThunk =>
  async (dispatch) => {
    const response = await GetExamResultApi.GetAcademicYears(data);
    dispatch(GetExamResultslice.actions.getAcademicYears(response.data));
  };

  export const GetReasonforBlockingProgressReport =
  (data:IGetReasonforBlockingProgressReport): AppThunk =>
  async (dispatch) => {
    const response = await GetExamResultApi.GetReasonforBlockingProgressReport(data);
    dispatch(GetExamResultslice.actions.getReasonforBlockingProgressReport(response.data));

  };

  export const Getpendingfees =
  (data:IIsPendingFeesForStudent): AppThunk =>
  async (dispatch) => {
    const response = await GetExamResultApi.GetPendingFees(data);
    dispatch(GetExamResultslice.actions.getPendingFees(response.data));
  };

  export const GetProgressReportFileName =
  (data: IGetProgressReportFileName): AppThunk =>
  async (dispatch) => {
    const response = await GetExamResultApi.GetProgressReportFileName(data);
    dispatch(GetExamResultslice.actions.getProgressReportFileName(response.data));
  };

  export const GetProgressReport =
  (data: IProgressReportBody): AppThunk =>
  async (dispatch) => {
    const response = await GetExamResultApi.GetProgressReport(data);
    dispatch(GetExamResultslice.actions.getProgressReport(response.data));
  };

  export const  AcademicProgressReportDownload =
  (data: IAcademicYearsForProgressReportBody): AppThunk =>
  async (dispatch) => {
    const response = await GetExamResultApi.AcademicYearsForProgressReport(data);
    // const response = await GetAllAcademicYearsApi. GetAllAcademicYears(data);
  let a = response.data.AcademicYears.map((item, i) => {
    return {
      Id: item.AcademicYearId,
      Name: item.AcademicYearName,
      Value: item.AcademicYearId
    }
    });
    dispatch(GetExamResultslice.actions.AcademicYearsForProgressReport(a));
  };


  export const GetTermsForProgressReport =
  (data: IGetTermsForProgressReportBody): AppThunk =>
  async (dispatch) => {
    const response = await GetExamResultApi. TermsForProgressReport(data);
    
    dispatch(GetExamResultslice.actions.getTermsForProgressReport(response.data));
  };


  
 
  export default GetExamResultslice.reducer 