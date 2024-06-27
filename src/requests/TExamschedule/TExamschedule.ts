import { createSlice } from '@reduxjs/toolkit';
import IGetAllStandards, {
  IGetExamsList
} from 'src/interfaces/Teacher/TExamSchedule';
import { AppThunk } from 'src/store';

import GetTExamResultListApi from 'src/api/Texamschedule/Texamschedule';

const SelectStandardExamslice = createSlice({
  name: 'selectexam',
  initialState: {
    SelectStandard: [],
    ExamData: [],
    VeiwAllData: [],
    Loading: true
  },
  reducers: {
    getSelectStandardRes(state, action) {
      state.SelectStandard = action.payload;
    },
    ViewExamDataRes(state, action) {
      state.Loading = false;
      state.ExamData = action.payload;
    },
    AllExamData(state, action) {
      state.Loading = false;
      state.VeiwAllData = action.payload;
    },
    getLoading(state, action) {
      state.Loading = true;
      state.ExamData = [];
    }
  }
});
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


// export const EmptyExam = (): AppThunk => async (dispatch) => {
//   dispatch(SelectStandardExamslice.actions.getSelectExamRes([]));
// };

export const ViewExamDataRess =
  (data: IGetExamsList): AppThunk =>
    async (dispatch) => {
      dispatch(SelectStandardExamslice.actions.getLoading(true));
      const response = await GetTExamResultListApi.GetExamsList(data);

      const DataList = response?.data?.GetExamDropDownForExamScheduleDetailsList.map((item) => {
        return {
          Text1: item.SchoolWise_Test_Name,
          Text2: item.SchoolWise_Test_Id,
          Text3: item.Exam_Start_Date,
          Text4: item.Exam_End_Date,
          Text5: item.IsCollapsed,
          Text6: item.Instructions,
          StandardId: item.StandardId
        };
      });

      const itemlist = response?.data?.ExamScheduleList.map((item) => {
        return {
          text1: item.SchoolWise_Test_Id,
          header:
            item.SubjectName +
            ' ' +
            (item.TestType !== '' ? '- ' + item.TestType : ''),
          text2: item.StartTime + ' - ' + item.EndTime,
          text5: item.Description,
          text3: item.StartDayDate.replace('-', ' ').replace('-', ' '),
          Standard_Name: item.Standard_Name,
          Instructions: item.Instructions,
          startTime: item.StartTime,
          endTime: item.EndTime,
          Description: item.Description
        };
      });
      dispatch(SelectStandardExamslice.actions.ViewExamDataRes(DataList));
      dispatch(SelectStandardExamslice.actions.AllExamData(itemlist));
      console.log(response, "DataList");

    };

export default SelectStandardExamslice.reducer;


