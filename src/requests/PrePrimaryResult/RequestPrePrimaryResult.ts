import { createSlice } from '@reduxjs/toolkit';
import ApiPrePrimaryResult from 'src/api/PrePrimaryResult/APIPrePrimaryResult';
import {
  IGetAssessmentBody,
  IGetClassTeacherXseedSubjectsBody,
  IGetPrePrimaryResultBody,
  IGetPublishResltBody,
  IGetUnPublishResltBody
} from 'src/interfaces/PrePrimaryResult/IPrePrimaryResult';
import { AppThunk } from 'src/store';

const SlicePrePrimaryResult = createSlice({
  name: 'PrePrimaryResult',
  initialState: {
    PrePrimaryResult: [],
    Assessment: [],
    TeacherXseedSubjects: [],
    publish: '',
    Unpublish: '',
    PublishMsg:'',
    UnpublishMsg:''
  },
  reducers: {
    PrePrimaryResults(state, action) {
      state.PrePrimaryResult = action.payload;
    },
    Assessment(state, action) {
      state.Assessment = action.payload;
    },
    TeacherXseedSubjects(state, action) {
      state.TeacherXseedSubjects = action.payload;
    },
    publish(state, action) {
      state.publish = action.payload;
    },
    Unpublish(state, action) {
      state.Unpublish = action.payload;
    },
    RPublishresetMessageAll(state) {
      state.PublishMsg = '';
    },

    RUnPublishresetMessageAll(state) {
      state.UnpublishMsg = '';
    },

  }
});

export const PrePrimary =
  (data: IGetPrePrimaryResultBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiPrePrimaryResult.PrePrimaryResultApi(data);
    let abc = response.data.map((item, i) => {
      return {
        Id: item.SchoolWise_Standard_Division_Id,
        Name: item.TeacherName,
        Value: item.SchoolWise_Standard_Division_Id
      };
    });
    dispatch(SlicePrePrimaryResult.actions.PrePrimaryResults(abc));
  };
export const AssessmentList =
  (data: IGetAssessmentBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiPrePrimaryResult.AssessmentApi(data);
    let abc = response.data.map((item, i) => {
      return {
        Id: item.AssessmentId,
        Name: item.Name,
        Value: item.AssessmentId
      };
    });
    dispatch(SlicePrePrimaryResult.actions.Assessment(abc));
  };
export const TeacherXseedSubjects =
  (data: IGetClassTeacherXseedSubjectsBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiPrePrimaryResult.TeacherXseedSubjectsApi(data);
    let abc = response.data.listStandrdDetails.map((item, i) => {
      return {
        Id: item.SubjectId,
        Subject_Name: item.Subject_Name
      };
    });
    dispatch(SlicePrePrimaryResult.actions.TeacherXseedSubjects(abc));
  };
export const Published =
  (data: IGetPublishResltBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiPrePrimaryResult.Published(data);
    dispatch(SlicePrePrimaryResult.actions.publish(response.data));
  };


  export const UnPublished =
  (data: IGetUnPublishResltBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiPrePrimaryResult.UnPublishReslt(data);
    dispatch(SlicePrePrimaryResult.actions.Unpublish(response.data));
  };

  export const PublishresetMessage= (): AppThunk => async (dispatch) => {
    dispatch(SlicePrePrimaryResult.actions.RPublishresetMessageAll());
  };

  export const UnPublishresetMessage = (): AppThunk => async (dispatch) => {
    dispatch(SlicePrePrimaryResult.actions.RUnPublishresetMessageAll());
  };

  
export default SlicePrePrimaryResult.reducer;
