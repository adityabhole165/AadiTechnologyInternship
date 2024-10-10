import { createSlice } from '@reduxjs/toolkit';
import FinalResultApi from 'src/api/FinalResult/ApiFinalResult';
import {
  IClassTeacherListBody,
  IConfiguredTestPublishedBody,
  IGenerateAllBody,
  IGenerateBody,
  IGetPagedStudentBody,
  IPublishBody,
  IUnpublishBody,
  IUnpublishedTestexamBody,
  IViewBody,
  IconfiguredExamBody,
  isAtleastOneResultGeneratedBody,
  isResultPublishedBody,
  isTestPublishedBody
} from 'src/interfaces/FinalResult/IFinalResult';
import { AppThunk } from 'src/store';

const FinalResultSlice = createSlice({
  name: 'FinalResult',

  initialState: {
    ClassTeachers: [],
    StudentResultList: [],
    StudentResultList1:{},
    PublishResult: '',
    UnpublishResult: '',
    GenerateAll: '',
    Generate: [],
    ViewResult: [],
    HeaderList: [],
    GetConfiguredTestPublished: [],
    iscofigred: {},
    unpublishexam: [],
    ISGetResultPublishd: false,
    GetAtleastOneResultGenerated: {},
    GetTestPublished: true,
    Loading: true
  },
  reducers: {
    classTeacherList(state, action) {
      state.Loading = false;
      state.ClassTeachers = action.payload;
    },
    PageStudentList(state, action) {
     
      state.StudentResultList = action.payload;
    },
    PageStudentList1(state, action) {
      
      state.StudentResultList1 = action.payload;
    },
    publishResult(state, action) {
      state.Loading = false;
      state.PublishResult = action.payload;
    },
    unpublishResult(state, action) {
      state.Loading = false;
      state.UnpublishResult = action.payload;
    },
    generateAll(state, action) {
      state.Loading = false;
      state.GenerateAll = action.payload;
    },
    resetGenerateAll(state) {
      state.GenerateAll = '';
    },
    generate(state, action) {
      state.Generate = action.payload;
    },
    resetUnpublishResult(state) {
      state.Loading = false;
      state.UnpublishResult = "";
    },
    resetPublishResult(state) {
      state.Loading = false;
      state.PublishResult = "";
    },
    GetConfiguredTestPublishedd(state, action) {
      state.Loading = false;
      state.GetConfiguredTestPublished = action.payload;
    },
    getResultPublished(state, action) {
      state.Loading = false;
      state.ISGetResultPublishd = action.payload
    },
    getAtleastOneResultGenerated(state, action) {
      state.Loading = false;
      state.GetAtleastOneResultGenerated = action.payload
    },
    getTestPublished(state, action) {
      state.GetTestPublished = action.payload
    },
    viewResult(state, action) {
      state.ViewResult = action.payload;
    },
    isconfiexam(state, action) {
      state.Loading = false;
      state.iscofigred = action.payload;
    },
    UnpublishexamName(state, action) {
      state.Loading = false;
      state.unpublishexam = action.payload;
    },
    getLoading(state, action) {
      state.Loading = true;
    }
  }
});
export const getConfiguredTestPublished =
  (data: IConfiguredTestPublishedBody): AppThunk =>
    async (dispatch) => {
      const response = await FinalResultApi.GetConfiguredTestPublished(data);
      dispatch(FinalResultSlice.actions.GetConfiguredTestPublishedd(response.data))
    };

export const ClassTechersList =
  (data: IClassTeacherListBody): AppThunk =>
    async (dispatch) => {
      dispatch(FinalResultSlice.actions.getLoading(true));
      const response = await FinalResultApi.ClassTeacherList(data);
      let abc = [{ Id: '0', Name: 'Select', Value: '0', StanderdId: '0' }]
      response.data.map((item, i) => {
        abc.push({
          Id: item.Teacher_Id,
          Name: item.TeacherName,
          Value: item.SchoolWise_Standard_Division_Id,
          StanderdId: item.Standard_Id
        });
      });
      dispatch(FinalResultSlice.actions.classTeacherList(abc));
    };

export const GetStudentResultList =
  (data: IGetPagedStudentBody): AppThunk =>
    async (dispatch) => {
      dispatch(FinalResultSlice.actions.getLoading(true));
      const response = await FinalResultApi.GetStudentResult(data);
      let StudentList = response.data.GetPagedStudentResult.map((item) => {
        return {
          Id: item.Student_Id,
          Text1: item.Roll_No,
          Text2: item.Name,
          Text3: item.Marks == '' ? 'N/A' : item.Marks,
          Text4: item.Percentage == '' ? 'N/A' : item.Percentage,
          Text5: item.Grade_Name == '' ? 'N/A' : item.Grade_Name,
          Text6: item.Result == '' ? 'N/A' : item.Result,
          Text7: item.Is_ResultGenrated == '' ? 'N' : item.Is_ResultGenrated,
          CanShowVisibility: item.Result === 'Pass' && item.Is_ResultGenrated === 'Y',
          TotalRows: item.TotalRows,
          Is_ResultGenrated: item.Is_ResultGenrated
          // Grade_Name: item.Grade_Name == '' ? 'N' : item.Grade_Name,
        };
      });
      dispatch(FinalResultSlice.actions.PageStudentList(StudentList));

    dispatch(FinalResultSlice.actions.PageStudentList1(response.data.NotGenratedResultCountDetails));

    };


export const GetPublishResult = (data: IPublishBody): AppThunk =>
  async (dispatch) => {
    dispatch(FinalResultSlice.actions.getLoading(true));
    const response = await FinalResultApi.GetPublishResult(data);
    dispatch(FinalResultSlice.actions.publishResult(response.data))

  };

export const GetUnpublishResult = (data: IUnpublishBody): AppThunk =>
  async (dispatch) => {
    dispatch(FinalResultSlice.actions.getLoading(true));
    const response = await FinalResultApi.GetUnpublishResult(data);
    dispatch(FinalResultSlice.actions.unpublishResult(response.data))
  };

export const GetGenerateAll = (data: IGenerateAllBody): AppThunk =>
  async (dispatch) => {
    dispatch(FinalResultSlice.actions.getLoading(true));
    const response = await FinalResultApi.GetGenarateAll(data);
    dispatch(FinalResultSlice.actions.generateAll(response.data));
  };

export const resetGenerateAll = (): AppThunk =>
  async (dispatch) => {
    dispatch(FinalResultSlice.actions.resetGenerateAll());
  };

export const resetUnpublishResult = (): AppThunk =>
  async (dispatch) => {
    dispatch(FinalResultSlice.actions.resetUnpublishResult());
  };

export const resetPublishResult = (): AppThunk =>
  async (dispatch) => {
    dispatch(FinalResultSlice.actions.resetPublishResult());
  };


export const GetGenerate = (data: IGenerateBody): AppThunk =>
  async (dispatch) => {
    dispatch(FinalResultSlice.actions.getLoading(true));
    const response = await FinalResultApi.GetGenerateResult(data);
    dispatch(FinalResultSlice.actions.generate(response.data))
  }


export const GetViewResult = (data: IViewBody): AppThunk =>
  async (dispatch) => {
    dispatch(FinalResultSlice.actions.getLoading(true));
    const response = await FinalResultApi.GetViewResult(data);
    dispatch(FinalResultSlice.actions.viewResult(response.data));
  };

export const GetResultPublishd = (data: isResultPublishedBody): AppThunk =>
  async (dispatch) => {
    dispatch(FinalResultSlice.actions.getLoading(true));
    const response = await FinalResultApi.GetResultPublished(data);

    dispatch(FinalResultSlice.actions.getResultPublished(response.data));
  };

export const GetAtleastOneResultGeneratedss = (data: isAtleastOneResultGeneratedBody): AppThunk =>
  async (dispatch) => {
    dispatch(FinalResultSlice.actions.getLoading(true));
    const response = await FinalResultApi.GetAtleastOneResultGenerated(data);
    dispatch(FinalResultSlice.actions.getAtleastOneResultGenerated(response.data));
  };

export const GetTestPublishedd = (data: isTestPublishedBody): AppThunk =>
  async (dispatch) => {
    dispatch(FinalResultSlice.actions.getLoading(true));
    const response = await FinalResultApi.GetTestPublished(data);
    dispatch(FinalResultSlice.actions.getTestPublished(response.data));
  }

export const getiscofigred =
  (data: IconfiguredExamBody): AppThunk =>
    async (dispatch) => {
      dispatch(FinalResultSlice.actions.getLoading(true));
      let res = await FinalResultApi.Getisconfigred(data);
      dispatch(FinalResultSlice.actions.isconfiexam(res.data));

    };
export const getunpublishedexam =
  (data: IUnpublishedTestexamBody): AppThunk =>
    async (dispatch) => {
      dispatch(FinalResultSlice.actions.getLoading(true));
      const response = await FinalResultApi.Getunplishedexam(data);
      let StudentListAll = response.data.map((item, i) => {
        return {
          Id: item.SchoolWise_Test_Name,
          Name: item.SchoolWise_Test_Name,
          Value: item.SchoolWise_Test_Name

        };
      })
      dispatch(FinalResultSlice.actions.UnpublishexamName(response.data));

    };


export default FinalResultSlice.reducer;