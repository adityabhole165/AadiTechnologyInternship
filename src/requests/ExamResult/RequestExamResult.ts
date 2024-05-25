import { createSlice } from '@reduxjs/toolkit';
import ApiExamResult from 'src/api/ExamResult/ApiExamResult';
import {
  IGetAllStudentsByGivenStdDivsBody,
  IGetClassPassFailDetailsForTestBody,
  IGetClassTeachersBody,
  IGetClasswiseExamDropdownBody,
  IGetPrePrimaryProgressSheetStatusBody,
  IGetSMSTemplateBody,
  IPublishUnpublishExamResultBody,
  IsMonthConfigurationForExamResultBody,
  IsPrePrimaryExamConfigurationBody
} from 'src/interfaces/ExamResult/IExamResult';
import { AppThunk } from 'src/store';

const SliceExamResult = createSlice({
  name: 'Birthdays',
  initialState: {
    ClassTeachers: [],
    ClasswiseExam: [],
    ClassPassDetailsForButton: null,
    ClassPassFailDetailsForTest: [],
    ClassPassFailDetailsForTestData: [],
    PublishUnpublishExam: '',
    ProgressSheetStatus: '',
    HeaderList: [],
    IsSubmitted: 'N',
    IsPrePrimaryExamConfiguration: false,
    IsMonthConfigurationForExamResult: false,
    GetAllStudentsByGivenStdDivs: [],
    GetSMSTemplate: null,
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
    GetClassPassFailDetailsForButton(state, action) {
      state.Loading = false;
      state.ClassPassDetailsForButton = action.payload;
    },
    GetClassPassFailDetailsForTestData(state, action) {
      state.Loading = false;
      state.ClassPassFailDetailsForTestData = action.payload;
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
    GetPrePrimaryExamConfiguration(state, action) {
      state.Loading = false;
      state.IsPrePrimaryExamConfiguration = action.payload;
    },
    GetMonthConfigurationForExamResult(state, action) {
      state.Loading = false;
      state.IsMonthConfigurationForExamResult = action.payload;
    },
    GetAllStudentsByGivenStdDivsResult(state, action) {
      state.Loading = false;
      state.GetAllStudentsByGivenStdDivs = action.payload;
    },
    GetSMSTemplates(state, action) {
      state.Loading = false;
      state.GetSMSTemplate = action.payload;
    },


    getLoading(state, action) {
      state.Loading = true;
    }
  }
});
export const getClassPassFailDetailsForButton =
  (data: IGetClassPassFailDetailsForTestBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceExamResult.actions.getLoading(true));
      const response = await ApiExamResult.GetClassPassFailDetailsForTestApi(data);
      dispatch(SliceExamResult.actions.GetClassPassFailDetailsForButton(response.data));
    };
export const getSMSTemplate =
  (data: IGetSMSTemplateBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceExamResult.actions.getLoading(true));
      const response = await ApiExamResult.GetSMSTemplateApi(data);
      dispatch(SliceExamResult.actions.GetSMSTemplates(response.data));
    };

export const getAllStudentsByGivenStdDivsResult =
  (data: IGetAllStudentsByGivenStdDivsBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceExamResult.actions.getLoading(true));
      const response = await ApiExamResult.GetAllStudentsByGivenStdDivsApi(data);
      dispatch(SliceExamResult.actions.GetAllStudentsByGivenStdDivsResult(response.data));
      console.log(response.data, "abc")
    };

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
          Value: item.Teacher_Id
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
export const getPrePrimaryExamConfiguration =
  (data: IsPrePrimaryExamConfigurationBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceExamResult.actions.getLoading(true));
      const response = await ApiExamResult.PrePrimaryExamConfigurationApi(data);
      dispatch(SliceExamResult.actions.GetPrePrimaryExamConfiguration(response.data));

    };
export const getMonthConfigurationForExamResult =
  (data: IsMonthConfigurationForExamResultBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceExamResult.actions.getLoading(true));
      const response = await ApiExamResult.MonthConfigurationForExamResultApi(data);
      dispatch(SliceExamResult.actions.GetMonthConfigurationForExamResult(response.data));

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

      const GetIsSubmitted = (SubjectId) => {
        let returnVal = "N"
        if (response.data?.LstGetFileDetails.length > 0) {
          response.data?.LstGetFileDetails.map((Item) => {
            if (Item.Subject_Id == SubjectId)
              returnVal = Item.Is_Submitted
          })
        }
        return returnVal
      }
      const GetItem = (Column, Row) => {
        let returnVal = '0';
        response.data?.LstClassPassFailDetailsForTest.map((item) => {
          if (item.ExamStatusSortOrder == Column && item.Subject_Id == Row) {
            returnVal = GetIsSubmitted(item.Subject_Id) == 'Y' ? item.Count.toString() : ' - ';
          }
          // else returnVal = '-'
        });
        return returnVal;
      };
      const GetItemData = (Column, Row) => {
        let returnVal = null;
        response.data?.LstClassPassFailDetailsForTest.map((item) => {
          if (item.ExamStatusSortOrder == Column && item.Subject_Id == Row) {
            returnVal = { SubjectId: item.Subject_Id.toString() }
          }
        });
        return returnVal;
      };

      let row = [], rowData = [],
        Column = [],
        ColumnData = [];
      response.data?.LstGetFileDetails.map((columnItem, i) => {
        row = [columnItem.Subject_Name];
        response.data?.LstExamStatusForTest.map((headerItem) => {
          row.push(
            GetItem(headerItem.ExamStatusSortOrder, columnItem.Subject_Id)
          );
        });

        ColumnData.push({
          SubjectId: columnItem.Subject_Id.toString(),
          SubjectName: columnItem.Subject_Name.toString(),
          IsGrey: GetIsSubmitted(columnItem.Subject_Id) == "N"
        }
        );
        Column.push(row);
      });

      dispatch(SliceExamResult.actions.GetClassPassFailDetailsForTest(Column));
      dispatch(SliceExamResult.actions.GetClassPassFailDetailsForTestData(ColumnData));
      // dispatch(SliceExamResult.actions.GetClassPassFailDetailsForButton(ColumnData))
    };

export default SliceExamResult.reducer;
