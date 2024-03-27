import { createSlice } from '@reduxjs/toolkit';
import LessonPlanApi from 'src/api/LessonPlan/ApiLessonPlanBaseScreen';
import {
  IAddOrEditLessonPlanDetailsBody,
  IDeleteLessonPlanBody,
  IGetAllLessonPlanReportingConfigsBody,
  IGetAllTeachersOfLessonPlanBody,
  IGetLessonPlanDetailsForReportBody,
  IGetLessonPlanListBody
} from 'src/interfaces/LessonPlan/ILessonPlanBaseScreen';
import { AppThunk } from 'src/store';

const LessonPlanBaseScreenSlice = createSlice({
  name: 'Lesson Plan',
  initialState: {
    ISLessonList: [],
    DeletePlan: '',
    LessonReport: [],
    ISAddOrEditLessonPlanDetails: {},
    ISGetAllTeachersOfLessonPlan: [],
    ISGetAllLessonPlanReportingConfigs:[]
  },

  reducers: {
    Rlessonplanlist(state, action) {
      state.ISLessonList = action.payload;
    },
    deletelessonplan(state, action) {
      state.DeletePlan = action.payload;
    },
    resetdeleteplan(state) {
      state.DeletePlan = '';
    },
    LessonPlanDetailsReport(state, action) {
      state.LessonReport = action.payload;
    },

    RAddOrEditLessonPlanDetails(state, action) {
      state.ISAddOrEditLessonPlanDetails = action.payload;
    },
    RGetAllTeachersOfLessonPlan(state, action) {
      state.ISGetAllTeachersOfLessonPlan = action.payload;
    },
    RGetAllLessonPlanReportingConfigs(state, action) {
      state.ISGetAllLessonPlanReportingConfigs = action.payload;
    }


    
  }
});
export const CDAlessonplanlist =
  (data: IGetLessonPlanListBody): AppThunk =>
    async (dispatch) => {
      const response = await LessonPlanApi.LessonPlanList(data);

      const combinedList = response.data.listResult1st.map((item, i) => ({
        StartDate: item.StartDate,
        EndDate: item.EndDate,
        Text8: response.data.listResult2nd[i]?.ApprovalSortOrder,
        ReportingUserName: response.data.listResult2nd[i]?.ReportingUserName,
        Text3: item.Remarks,
        SubmitedByReportingUser:item.SubmitedByReportingUser

      }));

      dispatch(LessonPlanBaseScreenSlice.actions.Rlessonplanlist(combinedList));
    };

export const deletelessonplan =
  (data: IDeleteLessonPlanBody): AppThunk =>
    async (dispatch) => {
      const response = await LessonPlanApi.DeleteLessonPlan(data);
      dispatch(LessonPlanBaseScreenSlice.actions.deletelessonplan(response.data));
    };
export const resetdeleteplan = (): AppThunk => async (dispatch) => {
  dispatch(LessonPlanBaseScreenSlice.actions.resetdeleteplan());
};

export const GetLessonPlanreport =
  (data: IGetLessonPlanDetailsForReportBody): AppThunk =>
    async (dispatch) => {
      const response = await LessonPlanApi.LessonPlanReport(data);
      dispatch(
        LessonPlanBaseScreenSlice.actions.LessonPlanDetailsReport(response.data)
      );
    };

export const CDAAddOrEditLessonPlanDetails =
  (data: IAddOrEditLessonPlanDetailsBody): AppThunk =>
    async (dispatch) => {
      const response = await LessonPlanApi.AddOrEditLessonPlanDetails(data);
      dispatch(
        LessonPlanBaseScreenSlice.actions.RAddOrEditLessonPlanDetails(response.data)
      );
    };


export const CDAGetAllTeachersOfLessonPlan =
  (data: IGetAllTeachersOfLessonPlanBody): AppThunk =>
    async (dispatch) => {
      const response = await LessonPlanApi.GetAllTeachersOfLessonPlan(data);
      console.log(response, "response");
      let abc = response.data.map((item, i) => {
        return {
          Id: item.UserId,
          Name: item.UserName,
          Value: item.UserId
        };
      });
      dispatch(
        LessonPlanBaseScreenSlice.actions.RGetAllTeachersOfLessonPlan(abc)
      );
    };


    export const CDAGetAllLessonPlanReportingConfigs =
  (data: IGetAllLessonPlanReportingConfigsBody): AppThunk =>
    async (dispatch) => {
      const response = await LessonPlanApi.GetAllLessonPlanReportingConfigs(data);

      let SubmitStatus = response.data.map((item, i) => {
        return {
          StartDate: item.StartDate,
          EndDate: item.EndDate,
          Text8: item.ApprovalSortOrder,
          ReportingUserName:item.ReportingUserName,
          ReportingUserId:item.ReportingUserId,

        };
      });
      dispatch(
        LessonPlanBaseScreenSlice.actions.RGetAllLessonPlanReportingConfigs(SubmitStatus)
      );
    };


export default LessonPlanBaseScreenSlice.reducer;
