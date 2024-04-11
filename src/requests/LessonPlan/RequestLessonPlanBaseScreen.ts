import { createSlice } from '@reduxjs/toolkit';
import LessonPlanApi from 'src/api/LessonPlan/ApiLessonPlanBaseScreen';
import { getDateMonthYearFormatted } from 'src/components/Common/Util';
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
    ISLessonList1: [],
    DeletePlan: '',
    LessonReport: [],
    ISAddOrEditLessonPlanDetails: {},
    ISGetAllTeachersOfLessonPlan: [],
    ISGetAllLessonPlanReportingConfigs: []
  },

  reducers: {
    Rlessonplanlist(state, action) {
      state.ISLessonList = action.payload;
    },
    Rlessonplanlist1(state, action) {
      state.ISLessonList1 = action.payload;
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


      let listResult1st = response.data.listResult1st.map((item, i) => ({
        StartDate: getDateMonthYearFormatted(item.StartDate),
        EndDate: getDateMonthYearFormatted(item.EndDate),
        Text3: item.Remarks,
        SubmitedByReportingUser: item.SubmitedByReportingUser,
        Text2: item.IsSubmitted,
        UserId: item.UserId,
        IsSuggisionAdded:item.IsSuggisionAdded,
        IsSuggisitionRead: item.IsSuggisitionRead
        
      }));

      let listResult2nd = response.data.listResult2nd.map(item => ({
        StartDate: getDateMonthYearFormatted(item.StartDate),
        EndDate: getDateMonthYearFormatted(item.EndDate),
        Text8: item.ApprovalSortOrder,
        ReportingUserName: item.ReportingUserName,
        ReportingUserId: item.ReportingUserId,
        IsSubmitted: item.IsSubmitted
      })).sort((a, b) => Number(a.Text8) - Number(b.Text8));

      dispatch(LessonPlanBaseScreenSlice.actions.Rlessonplanlist(listResult1st));
      dispatch(LessonPlanBaseScreenSlice.actions.Rlessonplanlist1(listResult2nd));
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
          StartDate: getDateMonthYearFormatted(item.StartDate),
          EndDate: getDateMonthYearFormatted(item.EndDate),
          Text8: item.ApprovalSortOrder,
          ReportingUserName: item.ReportingUserName,
          ReportingUserId: item.ReportingUserId,
          IsSubmitted: item.IsSubmitted

        };
      });
      dispatch(
        LessonPlanBaseScreenSlice.actions.RGetAllLessonPlanReportingConfigs(SubmitStatus)
      );
    };


export default LessonPlanBaseScreenSlice.reducer;
