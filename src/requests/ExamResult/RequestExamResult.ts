import { createSlice } from '@reduxjs/toolkit';
import ApiExamResult from 'src/api/ExamResult/ApiExamResult';
import {
  IGetClassPassFailDetailsForTestBody,
  IGetClassTeachersBody,
  IGetClasswiseExamDropdownBody,
  IGetPrePrimaryProgressSheetStatusBody,
  IPublishUnpublishExamResultBody
} from 'src/interfaces/ExamResult/IExamResult';
import { AppThunk } from 'src/store';

const SliceExamResult = createSlice({
  name: 'Birthdays',
  initialState: {
    ClassTeachers: [],
    ClasswiseExam: [],
    ClassPassFailDetailsForTest: [],
    PublishUnpublishExam: '',
    ProgressSheetStatus: '',
    HeaderList: [],
    IsSubmitted: 'N',
    Loading: true
  },
  reducers: {
    GetClassTeachers(state, action) {
      state.Loading = false;
      state.ClassTeachers = action.payload;
    },
    GetIsSubmitted(state, action) {
      state.Loading = false;
      state.IsSubmitted = action.payload;
    },
    GetClasswiseExam(state, action) {
      state.Loading = false;
      state.ClasswiseExam = action.payload;
    },
    GetClassPassFailDetailsForTest(state, action) {
      state.Loading = false;
      state.ClassPassFailDetailsForTest = action.payload;
    },
    GetHeaderList(state, action) {
      state.Loading = false;
      state.HeaderList = action.payload;
    },
    GetPublishUnpublish(state, action) {
      state.Loading = false;
      state.PublishUnpublishExam = action.payload;
    },
    resetPublishUnpublishExam(state) {
      state.Loading = false;
      state.PublishUnpublishExam = "";
    },
    GetProgressSheetStatus(state, action) {
      state.Loading = false;
      state.ProgressSheetStatus = action.payload;
    },

    getLoading(state, action) {
      state.Loading = true;
    }
  }
});

export const getClassTeachers =
  (data: IGetClassTeachersBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiExamResult.ClassTeachersApi(data);
      let abc = [{ Id: '0', Name: 'Select', Value: '0' }];
      dispatch(SliceExamResult.actions.getLoading(true));

      response.data.map((item, i) => {
        abc.push({
          Id: item.Teacher_Id,
          Name: item.TeacherName,
          Value: item.SchoolWise_Standard_Division_Id
        });
      });

      dispatch(SliceExamResult.actions.GetClassTeachers(abc));
    };



export const getClasswiseExam =
  (data: IGetClasswiseExamDropdownBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceExamResult.actions.getLoading(true));
      const response = await ApiExamResult.GetClasswiseExamDropDownApi(data);
      const ClasswiseExam = response.data.map((item, index) => {
        return {
          Id: item.schoolwise_test_id,
          Name: item.schoolwise_test_name,
          Value: item.schoolwise_test_id
        };
      });

      dispatch(SliceExamResult.actions.GetClasswiseExam(ClasswiseExam));
    };
export const getPublishUnpublishExam =
  (data: IPublishUnpublishExamResultBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceExamResult.actions.getLoading(true));
      const response = await ApiExamResult.PublishUnpublishExamResultApi(data);
      dispatch(SliceExamResult.actions.GetPublishUnpublish(response.data));

    };
export const resetPublishUnpublishExams =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(SliceExamResult.actions.resetPublishUnpublishExam());// Dispatching action to reset the message
    };
export const getProgressSheetStatus =
  (data: IGetPrePrimaryProgressSheetStatusBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceExamResult.actions.getLoading(true));
      const response = await ApiExamResult.GetPrePrimaryProgressSheetStatusApi(data);
      dispatch(SliceExamResult.actions.GetProgressSheetStatus(response.data));

    };
export const getClassPassFailDetailsForTest =
  (data: IGetClassPassFailDetailsForTestBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceExamResult.actions.getLoading(true));
      const response = await ApiExamResult.GetClassPassFailDetailsForTestApi(
        data
      );
      let HeaderListTemp = response.data?.LstExamStatusForTest.map((item) => {
        return item.ExamStatus.trim();
      });

      let HeaderList = ['Subject', ...HeaderListTemp, 'Edit'];
      dispatch(SliceExamResult.actions.GetHeaderList(HeaderList));

      let IsSubmitted =
        response.data?.LstGetFileDetails.length > 0
          ? response.data?.LstGetFileDetails[0].Is_Submitted
          : 'N';
      dispatch(SliceExamResult.actions.GetIsSubmitted(IsSubmitted));

      const GetItem = (Column, Row) => {
        let returnVal = '0';
        response.data?.LstClassPassFailDetailsForTest.map((item) => {
          if (item.ExamStatusSortOrder == Column && item.Subject_Id == Row) {
            returnVal = IsSubmitted == 'Y' ? item.Count.toString() : '-';
          }
        });
        return returnVal;
      };

      let row = [],
        Column = [];
      response.data?.LstGetFileDetails.map((columnItem, i) => {
        row = [columnItem.Subject_Name];
        response.data?.LstExamStatusForTest.map((headerItem) => {
          row.push(
            GetItem(headerItem.ExamStatusSortOrder, columnItem.Subject_Id)
          );
        });
        Column.push(row);
      });

      dispatch(SliceExamResult.actions.GetClassPassFailDetailsForTest(Column));
    };

export default SliceExamResult.reducer;
