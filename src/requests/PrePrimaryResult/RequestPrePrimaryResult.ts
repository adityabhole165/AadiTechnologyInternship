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
    ISlistpublishstatusDetails:[],
    publish: "",
    Unpublish: "",
    
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
    RlistpublishstatusDetails(state, action) {
      state.ISlistpublishstatusDetails = action.payload;
    },


    
    Rpublish(state, action) {
      state.publish = action.payload;
    },
    RUnpublish(state, action) {
      state.Unpublish = action.payload;
    },
    RPublishresetMessageAll(state) {
      state.publish = "";
    },

    RUnPublishresetMessageAll(state) {
      state.Unpublish = "";
    },

  }
});

export const PrePrimary =
  (data: IGetPrePrimaryResultBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiPrePrimaryResult.PrePrimaryResultApi(data);
    let abc = [{ Id: '0', Name: 'Select', Value: '0',Is_PrePrimary : 'Y'}];
    response.data.map((item, i) => {
      abc.push({
        Id: item.SchoolWise_Standard_Division_Id,
        Name: item.TeacherName,
        Value: item.SchoolWise_Standard_Division_Id,
        Is_PrePrimary:item.Is_PrePrimary
       
      });
    });
    dispatch(SlicePrePrimaryResult.actions.PrePrimaryResults(abc));
  };
export const AssessmentList =
  (data: IGetAssessmentBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiPrePrimaryResult.AssessmentApi(data);
      let abc = [{ Id: '0', Name: 'Select', Value: '0', }];
      response.data.map((item, i) => {
        abc.push({
          Id: item.AssessmentId,
          Name: item.Name,
          Value: item.AssessmentId
         
        });
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
        Subject_Name: item.Subject_Name,
        EditStatus : item.EditStatus
      };
    });

    let publishstatus = response.data.listpublishstatusDetails.map((item, i) => {
      return {
        IsPublished: item.IsPublished,
        PublishStatus: item.PublishStatus,
        StandardDivisionId: item.StandardDivisionId
      };
    });

    dispatch(SlicePrePrimaryResult.actions.TeacherXseedSubjects(abc));
    dispatch(SlicePrePrimaryResult.actions.RlistpublishstatusDetails(publishstatus));

  };
export const CDAPublished =
  (data: IGetPublishResltBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiPrePrimaryResult.Published(data);
    dispatch(SlicePrePrimaryResult.actions.Rpublish(response.data));
  };


  export const CDAUnPublished =
  (data: IGetUnPublishResltBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiPrePrimaryResult.UnPublishReslt(data);
    dispatch(SlicePrePrimaryResult.actions.RUnpublish(response.data));
  };

  export const PublishresetMessage= (): AppThunk => async (dispatch) => {
    dispatch(SlicePrePrimaryResult.actions.RPublishresetMessageAll());
  };

  export const UnPublishresetMessage = (): AppThunk => async (dispatch) => {
    dispatch(SlicePrePrimaryResult.actions.RUnPublishresetMessageAll());
  };

  
export default SlicePrePrimaryResult.reducer;
