import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import IGetAllStandards  from "src/Interface/Teacher/TExamSchedule";
import IGetExamsList from "src/Interface/Teacher/TExamSchedule";
import IExamList from "src/Interface/Teacher/TExamSchedule";

import GetTExamResultListApi from "src/Api/Teacher/texamschedule";


const SelectStandardExamslice = createSlice({
    name: 'selectexam' ,
    initialState: {
        SelectStandard: [] ,
        SelectExam : [],
        ExamData: []
    },
    reducers:{
        getSelectStandardRes(state,action){
            state.SelectStandard = action.payload?.GetAllStandardsResult;
        },
        getSelectExamRes(state,action){
            state.SelectExam = action.payload?.GetExamsForStandardResult; 
        },
        ViewExamDataRes(state, action){
          state.ExamData = action.payload?.GetExamSchedulesResult;

      }
    }
})



export const GetSelectStandardRes =
  (data:IGetAllStandards): AppThunk =>
  async (dispatch) => {
    const response = await GetTExamResultListApi.GetAllStandards(data);
    dispatch(SelectStandardExamslice.actions.getSelectStandardRes(response?.data));
    console.log("Response standard :",response);
  };


  export const GetSelectExamRes =
  (data:IGetExamsList): AppThunk =>
  async (dispatch) => {
    const response = await GetTExamResultListApi.IGetExams(data);
    dispatch(SelectStandardExamslice.actions.getSelectExamRes(response?.data));
    console.log("Response Exam Type :",response);
  };


  export const ViewExamDataRess =
  (data:IExamList):AppThunk => 
  async (dispatch)=> {
    const response = await GetTExamResultListApi.GetExamsList(data);
    dispatch(SelectStandardExamslice.actions.ViewExamDataRes(response?.data));
   
  };



  export default SelectStandardExamslice.reducer