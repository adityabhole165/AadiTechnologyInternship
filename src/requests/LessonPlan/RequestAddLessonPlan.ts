import { createSlice } from '@reduxjs/toolkit';
import AddLessonPlanApi from 'src/api/LessonPlan/ApiAddLessonPlan';
import { IAddOrEditLessonPlanDetailsBody, IClassListBody, ISaveApproverCommentBody, ISaveLessonPlanBody, ISubmitLessonPlanBody } from 'src/interfaces/LessonPlan/IAddLessonPlan';
import { AppThunk } from 'src/store';

const AddLessonPlanSlice = createSlice({
  name: 'Add Lesson Plan',
  initialState: {
    ClassName: [],
    AddOrEditLessonPlanDetails: null,
    saveLessonPlanmsg: '',
    submitLessonPlanmsg: '',
    saveApproverCommentmsg: '',
    updateLessonPlanDatemsg: '',
    Loading: true
  },

  reducers: {
    getclassnamelist(state, action) {
      state.Loading = false;
      state.ClassName = action.payload;
    },
    getAddOrEditLessonPlanDetails(state, action) {
      state.Loading = false;
      state.AddOrEditLessonPlanDetails = action.payload;
    },
    saveLessonPlan(state, action) {
      state.Loading = false;
      state.saveLessonPlanmsg = action.payload;
    },
    resetsaveLessonPlan(state) {
      state.Loading = false;
      state.saveLessonPlanmsg = "";
    },
    getsubmitLessonPlan(state, action) {
      state.Loading = false;
      state.submitLessonPlanmsg = action.payload;
    },
    getsaveApproverComment(state, action) {
      state.Loading = false;
      state.saveApproverCommentmsg = action.payload;
    },
    getupdateLessonPlanDate(state, action) {
      state.Loading = false;
      state.updateLessonPlanDatemsg = action.payload;
    },
    getLoading(state, action) {
      state.Loading = true;

    }
  }
});
export const classnamelist =
  (data: IClassListBody): AppThunk =>
    async (dispatch) => {
      const response = await AddLessonPlanApi.ClassList(data);
      let abc = response.data.map((item, i) => {
        return {
          Id: item.Standard_Division_Id,
          Name: item.StandardDivision,
          Value: item.Standard_Division_Id
        };
      });
      dispatch(AddLessonPlanSlice.actions.getclassnamelist(abc));
      console.log("responseData", abc)
    };

export const GetAddOrEditLessonPlanDetails =
  (data: IAddOrEditLessonPlanDetailsBody): AppThunk =>
    async (dispatch) => {
      dispatch(AddLessonPlanSlice.actions.getLoading(true));
      const response = await AddLessonPlanApi.AddOrEditLessonPlanDetails(data);
      dispatch(AddLessonPlanSlice.actions.getAddOrEditLessonPlanDetails(response.data));
      console.log("responseData", response)
    };
export const SaveLessonPlan =
  (data: ISaveLessonPlanBody): AppThunk =>
    async (dispatch) => {
      dispatch(AddLessonPlanSlice.actions.getLoading(true));
      const response = await AddLessonPlanApi.SaveLessonPlanapi(data);
      dispatch(AddLessonPlanSlice.actions.saveLessonPlan(response.data));
      console.log("responseData", response)
    };

export const resetsaveLessonPlan =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(AddLessonPlanSlice.actions.resetsaveLessonPlan());
    };
    
export const getSubmitLessonPlan =
  (data: ISubmitLessonPlanBody): AppThunk =>
    async (dispatch) => {
      dispatch(AddLessonPlanSlice.actions.getLoading(true));
      const response = await AddLessonPlanApi.SubmitLessonPlanapi(data);
      dispatch(AddLessonPlanSlice.actions.getsubmitLessonPlan(response.data));
      console.log("SubmitresponseData", response)
    };
export const getSaveApproverComment =
  (data: ISaveApproverCommentBody): AppThunk =>
    async (dispatch) => {
      dispatch(AddLessonPlanSlice.actions.getLoading(true));
      const response = await AddLessonPlanApi.SaveApproverCommentapi(data);
      dispatch(AddLessonPlanSlice.actions.getsaveApproverComment(response.data));
      console.log("SaveApproverCommentresponseData", response)
    };
export const getUpdateLessonPlanDate =
  (data: ISaveApproverCommentBody): AppThunk =>
    async (dispatch) => {
      dispatch(AddLessonPlanSlice.actions.getLoading(true));
      const response = await AddLessonPlanApi.UpdateLessonPlanDateapi(data);
      dispatch(AddLessonPlanSlice.actions.getupdateLessonPlanDate(response.data));
      console.log("updateLessonPlanDateresponseData", response)
    };

export default AddLessonPlanSlice.reducer;
