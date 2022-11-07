import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import IGetAllStandards  from "src/interfaces/Teacher/TExamSchedule";
import {IGetExamsList} from "src/interfaces/Teacher/TExamSchedule";
import {IExamList} from "src/interfaces/Teacher/TExamSchedule";

import GetTExamResultListApi from "src/api/Texamschedule/Texamschedule";


const SelectStandardExamslice = createSlice({
    name: 'selectexam' ,
    initialState: {
        SelectStandard: [] ,
        SelectExam : [],
        ExamData: []
    },
    reducers:{
        getSelectStandardRes(state,action){
            state.SelectStandard = action.payload;
        },
        getSelectExamRes(state,action){
            state.SelectExam = action.payload; 
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
    const itemlist = response?.data.GetAllStandardsResult.map((item)=>{
    return{
      id:item.Id,
      Name:item.Name,
      Value:item.Id
    }})
    dispatch(SelectStandardExamslice.actions.getSelectStandardRes(itemlist));
    console.log("Response standard :",response);
  };


  export const GetSelectExamRes =
  (data:IGetExamsList): AppThunk =>
  async (dispatch) => {
    
    console.log('here')
    const response = await GetTExamResultListApi.IGetExams(data);
    const itemlist = response?.data.GetExamsForStandardResult.map((item)=>{
      return{
        id:item.Id,
        Name:item.Name,
        Value:item.Id
      }})
    dispatch(SelectStandardExamslice.actions.getSelectExamRes(itemlist));
    console.log("Response Exam Type :",response);
  };


  export const ViewExamDataRess =
  (data:IExamList):AppThunk => 
  async (dispatch)=> {
    const response = await GetTExamResultListApi.GetExamsList(data);
    dispatch(SelectStandardExamslice.actions.ViewExamDataRes(response?.data));
   
  };



  export default SelectStandardExamslice.reducer