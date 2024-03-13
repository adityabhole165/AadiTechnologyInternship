import { createSlice } from '@reduxjs/toolkit';
import LessonPlanApi from 'src/api/LessonPlan/ApiLessonPlanBaseScreen';
import {
  IAddOrEditLessonPlanDetailsBody,
  IDeleteLessonPlanBody,
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
    ResetDeletePlan: '',
    LessonReport: [],
    ISAddOrEditLessonPlanDetails: {},
    ISGetAllTeachersOfLessonPlan: []
  },

  reducers: {
    Rlessonplanlist(state, action) {
      state.ISLessonList = action.payload;
    },
    deletelessonplan(state, action) {
      state.DeletePlan = action.payload;
    },
    resetdeleteplan(state) {
      state.ResetDeletePlan = '';
    },
    LessonPlanDetailsReport(state, action) {
      state.LessonReport = action.payload;
    },

    RAddOrEditLessonPlanDetails(state, action) {
      state.ISAddOrEditLessonPlanDetails = action.payload;
    },
    RGetAllTeachersOfLessonPlan(state, action) {
      state.ISGetAllTeachersOfLessonPlan = action.payload;
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
        Text6: response.data.listResult2nd[i]?.ApprovalSortOrder,
        ReportingUserName: response.data.listResult2nd[i]?.ReportingUserName
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


export default LessonPlanBaseScreenSlice.reducer;
