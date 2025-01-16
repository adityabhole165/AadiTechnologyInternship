import { createSlice } from '@reduxjs/toolkit';
import AddHomeworkApi from 'src/api/AssignHomework/apiAddHomework';
import { getDateMonthYearFormatted } from 'src/components/Common/Util';
import {
  IAllPublishUnpublishAddHomeworkBody,
  IDeleteHomeworkBody,
  IDeleteHomeworkDocumentBody,
  IGetAllHomeworkDocumentsBody,
  IGetHomeworkDetailBody,
  IGetHomeworkListForTeacherBody,
  IGetSubjectListForTeacherBody,
  IGetTeacherSubjectAndClassSubjectBody,
  IPublishUnPublishHomeworkBody,
  ISaveHomeworkBody
} from 'src/interfaces/AssignHomework/IAddHomework';
import { AppThunk } from 'src/store';

const AddHomeworkSlice = createSlice({
  name: 'AddHomework',
  initialState: {
    HomeworkListForTeacher: [],
    PublishUnPublishHomework: '',
    GetHomeworkDetail: null,
    DeleteHomework: '',
    ISSaveHomework: '',
    DeleteHomeworkDocument: '',
    Subjectlist: [],
    ISSubmitMarksRest: '',
    FilePath: '',
    SubjectListTeacher: [],
    AllPublishUnpublishHomework: '',
    GetAllHomeworkDocuments: [],

  },
  reducers: {
    RHomeworklist(state, action) {
      state.HomeworkListForTeacher = action.payload;
    },
    getPublishunpublish(state, action) {
      state.PublishUnPublishHomework = action.payload;
    },
    gethomeworkdetail(state, action) {
      state.GetHomeworkDetail = action.payload;
    },
    deletehomework(state, action) {
      state.DeleteHomework = action.payload;
    },
    savehomework(state, action) {
      state.ISSaveHomework = action.payload;
    },
    DeleteHomeworkDocument(state, action) {
      state.DeleteHomeworkDocument = action.payload;
    },
    RTeacherSubjectList(state, action) {
      state.Subjectlist = action.payload;
    },
    resetMessage(state) {
      state.ISSubmitMarksRest = '';
    },

    resetgethomeworkdetail(state) {
      state.GetHomeworkDetail = null;
    },
    resetFilepath(state) {
      state.FilePath = '';
    },

    getSubjectList(state, action) {
      state.SubjectListTeacher = action.payload;
    },
    allpublishunpublishhomework(state, action) {
      state.AllPublishUnpublishHomework = action.payload;
    },
    getallhomeworkdocument(state, action) {
      state.GetAllHomeworkDocuments = action.payload;
    },
    RresetHomework(state) {
      state.ISSaveHomework = '';
    },

    RresetDeleteHomework(state) {
      state.DeleteHomework = '';
    },

    RPublishresetMessage(state) {
      state.PublishUnPublishHomework = '';
    },

    RPublishresetMessageAll(state) {
      state.AllPublishUnpublishHomework = '';
    },




  }

});

export const homeworklistforteacher =
  (data: IGetHomeworkListForTeacherBody): AppThunk =>
    async (dispatch) => {
      const response = await AddHomeworkApi.HomeworkList(data);
      let a = response.data.map((item, i) => {
        return {
          Id: item.Id,
          SubjectId: item.SubjectId,
          Text1: item.Subject,
          Text2: item.Title,
          Text3: getDateMonthYearFormatted(item.AssignedDate),
          Text4: getDateMonthYearFormatted(item.CompleteByDate),
          Text5: item.AttachmentPath,
          Text7: item.IsPublished
        };
      });

      dispatch(AddHomeworkSlice.actions.RHomeworklist(a));
    };
export const GetPublishUnpublishHomework =
  (data: IPublishUnPublishHomeworkBody): AppThunk =>
    async (dispatch) => {
      const response = await AddHomeworkApi.PublishUnpublish(data);
      dispatch(AddHomeworkSlice.actions.getPublishunpublish(response.data));
    };

export const GetHomeworkDetails =
  (data: IGetHomeworkDetailBody): AppThunk =>
    async (dispatch) => {
      const response = await AddHomeworkApi.HomeworkDetail(data);
      dispatch(AddHomeworkSlice.actions.gethomeworkdetail(response.data));
    };
export const HomeworkDelete =
  (data: IDeleteHomeworkBody): AppThunk =>
    async (dispatch) => {
      const response = await AddHomeworkApi.Deletehomework(data);
      dispatch(AddHomeworkSlice.actions.deletehomework(response.data));
    };
export const HomeworkSave =
  (data: ISaveHomeworkBody): AppThunk =>
    async (dispatch) => {
      const response = await AddHomeworkApi.SaveHomework(data);
      dispatch(AddHomeworkSlice.actions.savehomework(response.data));
    };
export const DeleteDocument =
  (data: IDeleteHomeworkDocumentBody): AppThunk =>
    async (dispatch) => {
      const response = await AddHomeworkApi.DeleteDocument(data);
      dispatch(AddHomeworkSlice.actions.DeleteHomeworkDocument(response.data));
    };
export const SubjectListforTeacherDropdown =
  (data: IGetTeacherSubjectAndClassSubjectBody): AppThunk =>
    async (dispatch) => {
      const response = await AddHomeworkApi.ApiTeacheSubjectlist(data);
      let abc = [{ Id: '0', Name: 'All', Value: '0', TeacherId: data.aTeacherId.toString() }];

      response.data.map((item, i) => {
        abc.push({
          Id: item.Subject_Id,
          Name: item.Subject_Name,
          Value: item.Subject_Id,
          TeacherId: item.Teacher_Id
        });
      });
      dispatch(AddHomeworkSlice.actions.RTeacherSubjectList(abc));
    };

export const resetMessage = (): AppThunk => async (dispatch) => {
  dispatch(AddHomeworkSlice.actions.resetMessage());
};

export const ResetFilePath = (): AppThunk => async (dispatch) => {
  dispatch(AddHomeworkSlice.actions.resetFilepath());
};
export const GetTeacherSubjectList = (data: IGetSubjectListForTeacherBody): AppThunk => async (dispatch) => {
  const response = await AddHomeworkApi.GetSubjectListTeacher(data);
  let serialNumber = 0;
  const transformedData = response.data.map(item => ({
    Id: item.Id,
    SubjectId: item.SubjectId,
    Text10: ++serialNumber,
    Text1: item.Subject,
    Text2: item.Title,
    Text3: item.AssignedDate,
    Text4: item.CompleteByDate,
    // Text5: item.AttachmentPath,
    Text6: item.CompleteByDate,
    Text7: item.IsPublished,
    Text9: item.flag,
    IsPublished: item.IsPublished,
    IsActive: false,
    Text11: item.AttachmentPath
  }));
  dispatch(AddHomeworkSlice.actions.getSubjectList(transformedData));
};

export const PublishUnpublishAllHomework =
  (data: IAllPublishUnpublishAddHomeworkBody): AppThunk =>
    async (dispatch) => {
      const response = await AddHomeworkApi.HomeworkAllPublishUnpublish(data);
      dispatch(
        AddHomeworkSlice.actions.allpublishunpublishhomework(response.data)
      );
    };

export const GetAllHomeworkDocuments =
  (data: IGetAllHomeworkDocumentsBody): AppThunk =>
    async (dispatch) => {
      const response = await AddHomeworkApi.GetAllHomeworkDocuments(data);
      dispatch(AddHomeworkSlice.actions.getallhomeworkdocument(response.data));
    };


export const resetHomework = (): AppThunk => async (dispatch) => {
  dispatch(AddHomeworkSlice.actions.RresetHomework());
};

export const resetDeleteHomework = (): AppThunk => async (dispatch) => {
  dispatch(AddHomeworkSlice.actions.RresetDeleteHomework());
};

export const PublishresetMessageNew = (): AppThunk => async (dispatch) => {
  dispatch(AddHomeworkSlice.actions.RPublishresetMessage());
};
export const PublishresetMessageNewAll = (): AppThunk => async (dispatch) => {
  dispatch(AddHomeworkSlice.actions.RPublishresetMessageAll());
};

export const CDAresetgethomeworkdetail = (): AppThunk => async (dispatch) => {
  dispatch(AddHomeworkSlice.actions.resetgethomeworkdetail());
};



export default AddHomeworkSlice.reducer;
