import { createSlice } from '@reduxjs/toolkit';
import IGetAllStandards, {
  IExamList,
  IGetExamsList
} from 'src/interfaces/Teacher/TExamSchedule';
import { AppThunk } from 'src/store';

import GetTExamResultListApi from 'src/api/Texamschedule/Texamschedule';

const SelectStandardExamslice = createSlice({
  name: 'selectexam',
  initialState: {
    SelectStandard: [],
    SelectExam: [],
    ExamData: [],
    Loading: true
  },
  reducers: {
    getSelectStandardRes(state, action) {
      state.SelectStandard = action.payload;
    },
    getSelectExamRes(state, action) {
      state.SelectExam = action.payload;
    },
    ViewExamDataRes(state, action) {
      state.Loading = false;
      state.ExamData = action.payload;
    },
    getLoading(state, action) {
      state.Loading = true;
      state.ExamData = [];
    }
  }
});

// export const GetSelectStandardRes =
//   (data: IGetAllStandards): AppThunk =>
//     async (dispatch) => {
//       const response = await GetTExamResultListApi.GetAllStandards(data);
//       const itemlist = response?.data.GetAllStandardsResult.map((item) => {
//         return {
//           id: item.Id,
//           Name: item.Name,
//           Value: item.Id
//         };
//       });
//       dispatch(SelectStandardExamslice.actions.getSelectStandardRes(itemlist));
//     };

// export const GetSelectExamRes =
//   (data: IGetExamsList): AppThunk =>
//     async (dispatch) => {
//       const response = await GetTExamResultListApi.IGetExams(data);
//       let itemlist = [];
//       if (response.data !== null)
//         itemlist = response.data?.GetExamsForStandardResult.map((item) => {
//           return {
//             id: item.Id,
//             Name: item.Name,
//             Value: item.Id
//           };
//         });
//       dispatch(SelectStandardExamslice.actions.getSelectExamRes(itemlist));
//     };




export const GetSelectStandardRes =
  (data: IGetAllStandards): AppThunk =>
  async (dispatch) => {
    const response = await GetTExamResultListApi.GetAllStandards(data);
    const itemlist = [{ id: '0', Name: 'All', Value: '0' }];
    if (response?.data.GetAllStandardsResult) {
      const standards = response.data.GetAllStandardsResult.map((item) => ({
        id: item.Id,
        Name: item.Name,
        Value: item.Id
      }));
      itemlist.push(...standards);
    }
    dispatch(SelectStandardExamslice.actions.getSelectStandardRes(itemlist));
  };

export const GetSelectExamRes =
  (data: IGetExamsList): AppThunk =>
  async (dispatch) => {
    const response = await GetTExamResultListApi.IGetExams(data);
    let itemlist = [{ id: '0', Name: 'All', Value: '0' }];
    if (response.data !== null) {
      const exams = response.data.GetExamsForStandardResult.map((item) => ({
        id: item.Id,
        Name: item.Name,
        Value: item.Id
      }));
      itemlist.push(...exams);
    }
    dispatch(SelectStandardExamslice.actions.getSelectExamRes(itemlist));
  };



  
export const EmptyExam = (): AppThunk => async (dispatch) => {
  dispatch(SelectStandardExamslice.actions.getSelectExamRes([]));
};
export const ViewExamDataRess =
  (data: IExamList): AppThunk =>
    async (dispatch) => {
      dispatch(SelectStandardExamslice.actions.getLoading(true));
      const response = await GetTExamResultListApi.GetExamsList(data);

      const itemlist = response?.data?.GetExamSchedulesResult.map((item) => {
        return {
          header:
            item.SubjectName +
            ' ' +
            (item.TestType !== '' ? '- ' + item.TestType : ''),
          text2: item.StartTime + ' - ' + item.EndTime ,
          text5: item.Description,
          text3: item.StartDayDate.replace('-', ' ').replace('-', ' '),
          Instructions: item.Instructions,
          startTime: item.StartTime,
          endTime: item.EndTime
        };
      });
      dispatch(SelectStandardExamslice.actions.ViewExamDataRes(itemlist));
    };

export default SelectStandardExamslice.reducer;
