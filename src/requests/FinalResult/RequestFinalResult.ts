import { createSlice } from '@reduxjs/toolkit';
import FinalResultApi from 'src/api/FinalResult/ApiFinalResult';
import {
  IClassTeacherListBody,
  IGenerateAllBody,
  IGenerateBody,
  IGetPagedStudentBody,
  IPublishBody,
  IUnpublishBody,
  IViewBody
} from 'src/interfaces/FinalResult/IFinalResult';
import { AppThunk } from 'src/store';

const FinalResultSlice = createSlice({
  name: 'FinalResult',

  initialState: {
    ClassTeachers: [],
    StudentResultList: [],
    PublishResult: '',
    UnpublishResult: '',
    GenerateAll: '',
    Generate: [],
    ViewResult: [],
    HeaderList: [],
    Loading: true
  },
  reducers: {
    classTeacherList(state, action) {
      state.ClassTeachers = action.payload;
    },
    PageStudentList(state, action) {
      state.StudentResultList = action.payload;
    },
    publishResult(state, action) {
      state.PublishResult = action.payload;
    },
    unpublishResult(state, action) {
      state.UnpublishResult = action.payload;
    },
    generateAll(state, action) {
      state.GenerateAll = action.payload;
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
    viewResult(state, action) {
      state.ViewResult = action.payload;
    }
  }
});
export const ClassTechersList =
  (data: IClassTeacherListBody): AppThunk =>
    async (dispatch) => {
      const response = await FinalResultApi.ClassTeacherList(data);

      let abc = response.data.map((item, i) => {
        return {
          Id: item.Teacher_Id,
          Name: item.TeacherName,
          Value: item.StdDivId
        };
      });
      dispatch(FinalResultSlice.actions.classTeacherList(abc));
    };

export const GetStudentResultList =
  (data: IGetPagedStudentBody): AppThunk =>
    async (dispatch) => {
      const response = await FinalResultApi.GetStudentResult(data);
      let StudentList = response.data?.map((item) => {
        return {
          Id: item.SchoolWise_Standard_Division_Id,
          Text1: item.Roll_No,
          Text2: item.Name,
          Text3: item.Marks == '' ? 'N/A' : item.Marks,
          Text4: item.Percentage == '' ? 'N/A' : item.Percentage,
          Text5: item.Grade_Name == '' ? 'N/A' : item.Grade_Name,
          Text6: item.Result == '' ? 'N/A' : item.Result
        };
      });
      dispatch(FinalResultSlice.actions.PageStudentList(StudentList));
      console.log(StudentList, 'StudentList');
    };

export const GetPublishResult = (data: IPublishBody): AppThunk =>
  async (dispatch) => {
    const response = await FinalResultApi.GetPublishResult(data);
    dispatch(FinalResultSlice.actions.publishResult(response.data))

  };

export const GetUnpublishResult = (data: IUnpublishBody): AppThunk =>
  async (dispatch) => {
    const response = await FinalResultApi.GetUnpublishResult(data);
    dispatch(FinalResultSlice.actions.unpublishResult(response.data))
  };

export const GetGenerateAll = (data: IGenerateAllBody): AppThunk =>
  async (dispatch) => {
    const response = await FinalResultApi.GetGenarateAll(data);
    dispatch(FinalResultSlice.actions.generateAll(response.data));
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
    const response = await FinalResultApi.GetGenerateResult(data);
    dispatch(FinalResultSlice.actions.generate(response.data))
  }


export const GetViewResult = (data: IViewBody): AppThunk =>
  async (dispatch) => {
    const response = await FinalResultApi.GetViewResult(data);
    dispatch(FinalResultSlice.actions.viewResult(response.data));
  }

export default FinalResultSlice.reducer;