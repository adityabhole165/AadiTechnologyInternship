import { createSlice } from '@reduxjs/toolkit';
import ApiExamResult from 'src/api/ExamResult/ApiExamResult';
import {
  IGetAllTestsForClassBody,
  IGetClassPassFailDetailsForTestBody,
  IGetClassTeachersBody
} from 'src/interfaces/ExamResult/IExamResult';
import { AppThunk } from 'src/store';

const SliceExamResult = createSlice({
  name: 'Birthdays',
  initialState: {
    ClassTeachers: [],
    AllTestsForClass: [],
    ClassPassFailDetailsForTest: [],
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
    GetAllTestsForClass(state, action) {
      state.Loading = false;
      state.AllTestsForClass = action.payload;
    },
    GetClassPassFailDetailsForTest(state, action) {
      state.Loading = false;
      state.ClassPassFailDetailsForTest = action.payload;
    },
    GetHeaderList(state, action) {
      state.Loading = false;
      state.HeaderList = action.payload;
    },
    getLoading(state, action) {
      state.Loading = true;
    }
  }
});

export const getClassTeachers =
  (data: IGetClassTeachersBody): AppThunk =>
  async (dispatch) => {
    dispatch(SliceExamResult.actions.getLoading(true));
    const response = await ApiExamResult.ClassTeachersApi(data);
    const ClassTeachersList = response.data.map((item, index) => {
      return {
        Id: item.Teacher_Id,
        Name: item.TeacherName,
        Value: item.SchoolWise_Standard_Division_Id
      };
    });
    dispatch(SliceExamResult.actions.GetClassTeachers(ClassTeachersList));
  };

export const getAllTestsForClass =
  (data: IGetAllTestsForClassBody): AppThunk =>
  async (dispatch) => {
    dispatch(SliceExamResult.actions.getLoading(true));
    const response = await ApiExamResult.GetAllTestsForClassApi(data);
    const AllTestsForClass = response.data.map((item, index) => {
      return {
        Id: item.SchoolwiseTestId,
        Name: item.SchoolwiseTestName,
        Value: item.SchoolwiseTestId
      };
    });

    dispatch(SliceExamResult.actions.GetAllTestsForClass(AllTestsForClass));
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
