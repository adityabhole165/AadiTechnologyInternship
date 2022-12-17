import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import IGetAllStandards from "src/interfaces/Teacher/TExamSchedule";
import { IGetExamsList } from "src/interfaces/Teacher/TExamSchedule";
import { IExamList } from "src/interfaces/Teacher/TExamSchedule";

import GetTExamResultListApi from "src/api/Texamschedule/Texamschedule";


const SelectStandardExamslice = createSlice({
  name: 'selectexam',
  initialState: {
    SelectStandard: [],
    SelectExam: [],
    ExamData: []
  },
  reducers: {
    getSelectStandardRes(state, action) {
      state.SelectStandard = action.payload;
    },
    getSelectExamRes(state, action) {
      state.SelectExam = action.payload;
    },
    ViewExamDataRes(state, action) {
      state.ExamData = action.payload;

    }
  }
})



export const GetSelectStandardRes =
  (data: IGetAllStandards): AppThunk =>
    async (dispatch) => {
      const response = await GetTExamResultListApi.GetAllStandards(data);
      const itemlist = response?.data.GetAllStandardsResult.map((item) => {
        return {
          id: item.Id,
          Name: item.Name,
          Value: item.Id
        }
      })
      dispatch(SelectStandardExamslice.actions.getSelectStandardRes(itemlist));
    };


export const GetSelectExamRes =
  (data: IGetExamsList): AppThunk =>
    async (dispatch) => {

      const response = await GetTExamResultListApi.IGetExams(data);
      let itemlist = []
      if(response.data!==null)
      itemlist = response.data?.GetExamsForStandardResult.map((item) => {
        return {
          id: item.Id,
          Name: item.Name,
          Value: item.Id
        }
      })
      dispatch(SelectStandardExamslice.actions.getSelectExamRes(itemlist));
    };

export const EmptyExam =
(): AppThunk =>
  async (dispatch) => {
    dispatch(SelectStandardExamslice.actions.getSelectExamRes([]));

  };
export const ViewExamDataRess =
  (data: IExamList): AppThunk =>
    async (dispatch) => {
      const response = await GetTExamResultListApi.GetExamsList(data);

      const itemlist = response?.data?.GetExamSchedulesResult.map((item) => {
        return {
          header: item.SubjectName + ' ' + (item.TestType !== '' ? '- ' + item.TestType : ''),
          text2: item.StartTime + ' - ' + item.EndTime,
          text5: item.Description,
          text3: item.StartDate.replace("-"," ").replace("-"," "),
          Instructions: item.Instructions
        }
      })
      dispatch(SelectStandardExamslice.actions.ViewExamDataRes(itemlist));

    };



export default SelectStandardExamslice.reducer