import { createSlice } from '@reduxjs/toolkit';
import LessonPlanApi from 'src/api/LessonPlan/ApiLessonPlanBaseScreen';
import { getDateMonthYearFormatted } from 'src/components/Common/Util';
import {
  IAddOrEditLessonPlanDetailsBody,
  IDeleteLessonPlanBody,
  IGetAllLessonPlanReportingConfigsBody,
  IGetAllTeachersOfLessonPlanBody,
  IGetLessonPlanDetailsForReportBody,
  IGetLessonPlanListBody,
  IGetLessonPlanRecordCountBody,
  IUpdateReadSuggestionBody
} from 'src/interfaces/LessonPlan/ILessonPlanBaseScreen';
import { AppThunk } from 'src/store';

const LessonPlanBaseScreenSlice = createSlice({
  name: 'Lesson Plan',
  initialState: {
    ISLessonList: [],
    ISLessonList1: [],
    LessonListCount1: [],
    DeletePlan: '',
    ISUpdateReadSuggestion: '',
    LessonReport: [],
    ISAddOrEditLessonPlanDetails: [],
    ISGetLessonPlanRecordCount: {},
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
    CountLessonList(state, action) {
      state.LessonListCount1 = action.payload;
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
    },
    RUpdateReadSuggestion(state, action) {
      state.ISUpdateReadSuggestion = action.payload;
    },
    RGetLessonPlanRecordCount(state, action) {
      state.ISGetLessonPlanRecordCount = action.payload;
    }





  }
});
export const CDAlessonplanlist =
  (data: IGetLessonPlanListBody): AppThunk =>
    async (dispatch) => {
      const response = await LessonPlanApi.LessonPlanList(data);


      // let listResult1st = response.data.listResult1st.map((item, i) => ({
      //   StartDate: getDateMonthYearFormatted(item.StartDate),
      //   EndDate: getDateMonthYearFormatted(item.EndDate),
      //   Text3: item.Remarks,
      //   Text4: item.Remarks,
      //   SubmitedByReportingUser: item.SubmitedByReportingUser,
      //   Text2: item.IsSubmitted,
      //   UserId: item.UserId,
      //   IsSuggisionAdded:item.IsSuggisionAdded,
      //   IsSuggisitionRead: item.IsSuggisitionRead

      // }));

      let listResult1st = response.data.listResult1st.map((item, i) => {
        const text3Content = item.Remarks || "";
        const regex = /<b>(.*?)<\/b><br\/>(.*?)<br\/>/g;
        let matches;
        const parsedText3 = [];

        while ((matches = regex.exec(text3Content)) !== null) {
          parsedText3.push({
            name: matches[1],
            description: matches[2],
          });
        }

        return {
          StartDate: getDateMonthYearFormatted(item.StartDate),
          EndDate: getDateMonthYearFormatted(item.EndDate),
          Text3: parsedText3,

          IsSubmitted: item.IsSubmitted,
          SubmitedByReportingUser: item.SubmitedByReportingUser,
          Text2: item.IsSubmitted,
          UserId: item.UserId,
          IsSuggisionAdded: item.IsSuggisionAdded,
          IsSuggisitionRead: item.IsSuggisitionRead
        };
      });


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

      // let SubmitStatus = response.data.GetLessonPlanReportingConfigList.map((item, i) => {
      //   return {

      //     ReportingUserId:item.ReportingUserId
      //     UserId
      //   };
      // });
      dispatch(
        LessonPlanBaseScreenSlice.actions.RAddOrEditLessonPlanDetails(response.data.GetLessonPlanReportingConfigList)
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


export const CDAUpdateReadSuggestion =
  (data: IUpdateReadSuggestionBody): AppThunk =>
    async (dispatch) => {
      const response = await LessonPlanApi.UpdateReadSuggestion(data);
      dispatch(LessonPlanBaseScreenSlice.actions.RUpdateReadSuggestion(response.data));

    };



export const CDAGetLessonPlanRecordCount =
  (data: IGetLessonPlanRecordCountBody): AppThunk =>
    async (dispatch) => {
      const response = await LessonPlanApi.GetLessonPlanRecordCount(data);
      dispatch(LessonPlanBaseScreenSlice.actions.RGetLessonPlanRecordCount(response.data));
    };


export const LessonPlanCount =
  (data: IGetLessonPlanListBody): AppThunk =>
    async (dispatch) => {
      const response = await LessonPlanApi.LessonPlanList(data);
      let abc = response.data.listResult1st.map((item, i) => {
        return {
          RecordCount: item.RecordCount
        };
      });
      dispatch(LessonPlanBaseScreenSlice.actions.CountLessonList(abc));
    };


export default LessonPlanBaseScreenSlice.reducer;
