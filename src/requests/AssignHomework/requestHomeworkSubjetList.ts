import { createSlice } from '@reduxjs/toolkit';
import HomeworkSubjectListApi from 'src/api/AssignHomework/ApiHomeworkSubjectList';
import { getDateMonthYearFormatted } from 'src/components/Common/Util';
import {
  IDeleteHomeworkBody,
  IGetAllHomeworkDocumentsBody,
  IGetHomeworkDetailBody,
  IGetSubjectListForTeacherBody,
  IPublishUnPublishHomeworkBody
} from 'src/interfaces/AssignHomework/IHomeworkSubjectList';
import { AppThunk } from 'src/store';

const HomeworkSubjectListSlice = createSlice({
  name: 'HomeworkSubjectList',
  initialState: {
    SubjectListForTeacher: [],
    PublishUnPublishHomework: '',
    ISSubmitMarksRest: '',
    GetAllHomeworkDocuments: [],
    DeleteHomework: '',
    GetHomeworkDetail: {}
  },

  reducers: {
    getSubjectList(state, action) {
      state.SubjectListForTeacher = action.payload;
    },
    getPublishunpublish(state, action) {
      state.PublishUnPublishHomework = action.payload;
    },
    resetMessage(state) {
      state.ISSubmitMarksRest = '';
    },
    getallhomeworkdocument(state, action) {
      state.GetAllHomeworkDocuments = action.payload;
    },
    deletehomework(state, action) {
      state.DeleteHomework = action.payload;
    },
    homeworkdetails(state, action) {
      state.GetHomeworkDetail = action.payload;
    }
  }
});
export const homeworklistforteacher =
  (data: IGetSubjectListForTeacherBody): AppThunk =>
  async (dispatch) => {
    const response = await HomeworkSubjectListApi.ApiHomeworkSubjectList(data);
    let a = response.data.map((item, i) => {
      return {
        Id: item.Id,
        SubjectId: item.SubjectId,

        Text1: item.Subject,
        Text2: item.Title,
        Text3: getDateMonthYearFormatted(item.AssignedDate),
        Text4: getDateMonthYearFormatted(item.CompleteByDate),
        Text6: item.flag,
        Text5: item.AttachmentPath,
        Text7: item.IsPublished
      };
    });

    dispatch(HomeworkSubjectListSlice.actions.getSubjectList(a));
    console.log(a,"assignehomeworklist");
    
  };
export const GetPublishUnpublishHomework =
  (data: IPublishUnPublishHomeworkBody): AppThunk =>
  async (dispatch) => {
    const response = await HomeworkSubjectListApi.PublishUnpublish(data);
    dispatch(
      HomeworkSubjectListSlice.actions.getPublishunpublish(response.data)
    );
  };

export const resetMessage = (): AppThunk => async (dispatch) => {
  dispatch(HomeworkSubjectListSlice.actions.resetMessage());
};

export const GetAllHomeworkDocuments =
  (data: IGetAllHomeworkDocumentsBody): AppThunk =>
  async (dispatch) => {
    const response = await HomeworkSubjectListApi.GetAllHomeworkDocuments(data);
    dispatch(
      HomeworkSubjectListSlice.actions.getallhomeworkdocument(response.data)
    );
  };
export const HomeworkDelete =
  (data: IDeleteHomeworkBody): AppThunk =>
  async (dispatch) => {
    const response = await HomeworkSubjectListApi.Deletehomework(data);
    dispatch(HomeworkSubjectListSlice.actions.deletehomework(response.data));
  };
export const GetHomeworkDetailss =
  (data: IGetHomeworkDetailBody): AppThunk =>
  async (dispatch) => {
    const response = await HomeworkSubjectListApi.GetHomeworkDetails(data);
    dispatch(HomeworkSubjectListSlice.actions.homeworkdetails(response.data));
    console.log(response, 'response-------------------------------------');
  };

export default HomeworkSubjectListSlice.reducer;
