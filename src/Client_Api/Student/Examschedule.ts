import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import GetSelectExamApi from "../../Api/Student/ExamsSchedule";
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import ISelectExam from 'src/Interface/Student/ExamSchedule';
import IExamList from 'src/Interface/Student/ExamSchedule';

const SelectExamslice = createSlice({

    name: 'selectexam',
    initialState: {
        SelectExamData: [],
        ExamData:       []
    },

    reducers: {
        getSelectExam(state, action) {
            state.SelectExamData = action.payload?.GetExamsForStandardResult;
        
        },

        ViewExamDataRes(state, action){
            state.ExamData = action.payload?.GetExamSchedulesResult;
  
        }
    }
});


export const GetSelectExamList =
  (data:ISelectExam): AppThunk =>
  async (dispatch) => {
    const response = await GetSelectExamApi.GetSelectExamList(data);
    dispatch(SelectExamslice.actions.getSelectExam(response?.data));
  };

  export const ViewExamDataRess =
  (data:IExamList):AppThunk => 
  async (dispatch)=> {
    const response = await GetSelectExamApi.GetExamsList(data);
    dispatch(SelectExamslice.actions.ViewExamDataRes(response?.data));
   
  };

  export default SelectExamslice.reducer 
