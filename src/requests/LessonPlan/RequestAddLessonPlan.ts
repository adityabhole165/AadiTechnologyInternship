import { createSlice } from '@reduxjs/toolkit';
import AddLessonPlanApi from 'src/api/LessonPlan/ApiAddLessonPlan';
import { IAddOrEditLessonPlanDetailsBody, IClassListBody, ISaveApproverCommentBody, ISaveLessonPlanBody, ISubmitLessonPlanBody } from 'src/interfaces/LessonPlan/IAddLessonPlan';
import { AppThunk } from 'src/store';

const AddLessonPlanSlice = createSlice({
  name: 'Add Lesson Plan',
  initialState: {
    ClassName: [],
    AddOrEditLessonPlanDetails: [],
    saveLessonPlanmsg: '',
    submitLessonPlanmsg: '',
    saveApproverCommentmsg: '',
    updateLessonPlanDatemsg: '',
    Loading: true,
    ApproverDetails: []
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
    getApproverDetails(state, action) {
      state.Loading = false;
      state.ApproverDetails = action.payload;
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
    resetsubmitlessonplans(state) {
      state.Loading = false;
      state.submitLessonPlanmsg = "";
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
      dispatch(AddLessonPlanSlice.actions.getLoading(true));
      const response = await AddLessonPlanApi.ClassList(data);
      let abc = response.data.map((item, i) => {
        return {
          Id: item.Standard_Division_Id,
          Name: item.StandardDivision,
          Value: item.Standard_Division_Id
        };
      });
      dispatch(AddLessonPlanSlice.actions.getclassnamelist(abc));

    };

export const GetAddOrEditLessonPlanDetails =
  (data: IAddOrEditLessonPlanDetailsBody): AppThunk =>
    async (dispatch) => {
      dispatch(AddLessonPlanSlice.actions.getLoading(true));
      const response = await AddLessonPlanApi.AddOrEditLessonPlanDetails(data);
      let reponseData = []

      const getSubPlanDetails = (ParentParameterId) => {
        let returnVal = []
        response.data.LessonPlanParametersList.map((Item, i) => {
          if (ParentParameterId == Item.ParentParameterId) {
            returnVal.push(
              { Id: Item.Id, label: Item.Title, value: "" }
            )
          }
        })
        return returnVal
      }

      const getPlanDetails = (LessonPlanCategoryId, SubjectCategoryId) => {
        let returnVal = []
        response.data.LessonPlanParametersList.map((Item, i) => {
          if ((Item.SubjectCategoryId == "1" || SubjectCategoryId == Item.SubjectCategoryId) &&
            LessonPlanCategoryId == Item.LessonPlanCategoryId) {
            if (Item.ParentParameterId == "0") {
              returnVal.push({
                Id: Item.Id, label: Item.Title, value: "",
                LessonPlanCategoryId: Item.LessonPlanCategoryId,
                SubjectCategoryId: Item.SubjectCategoryId,
                subPlanDetails: getSubPlanDetails(Item.Id)
              })
            }
          }
        })
        return returnVal;
      }
      let arrStdSub = []
      let arrStdIdSubjectId = []
      response.data.GetTeacherSubjectList.map((Item, i) => {
        if (arrStdSub.includes(Item.Standard_Id + "#" + Item.SubjectId)) {
          arrStdIdSubjectId.push({ StdId: Item.Standard_Id, SubjectId: Item.SubjectId })
        }
        arrStdSub.push(Item.Standard_Id + "#" + Item.SubjectId)
        reponseData.push({
          StdId: Item.Standard_Id,
          DivisionId: Item.StdDivId,
          SubjectId: Item.SubjectId,
          lessonName: Item.ClassName + '(' + Item.Subject_Name + ')',
          subject: Item.Subject_Name,
          planDetails: getPlanDetails(Item.LessonPlanCategoryId, Item.SubjectCategoryId),
          CopyToArray: arrStdIdSubjectId
        })
      })

      dispatch(AddLessonPlanSlice.actions.getAddOrEditLessonPlanDetails(reponseData));
      dispatch(AddLessonPlanSlice.actions.getApproverDetails(response.data.GetLessonPlanReportingConfigList));
    };
export const SaveLessonPlan =
  (data: ISaveLessonPlanBody): AppThunk =>
    async (dispatch) => {
      dispatch(AddLessonPlanSlice.actions.getLoading(true));
      const response = await AddLessonPlanApi.SaveLessonPlanapi(data);
      dispatch(AddLessonPlanSlice.actions.saveLessonPlan(response.data));

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
    };
export const resetsubmitlessonplans =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(AddLessonPlanSlice.actions.resetsubmitlessonplans());
    };
export const getSaveApproverComment =
  (data: ISaveApproverCommentBody): AppThunk =>
    async (dispatch) => {
      dispatch(AddLessonPlanSlice.actions.getLoading(true));
      const response = await AddLessonPlanApi.SaveApproverCommentapi(data);
      dispatch(AddLessonPlanSlice.actions.getsaveApproverComment(response.data));
    };
export const getUpdateLessonPlanDate =
  (data: ISaveApproverCommentBody): AppThunk =>
    async (dispatch) => {
      dispatch(AddLessonPlanSlice.actions.getLoading(true));
      const response = await AddLessonPlanApi.UpdateLessonPlanDateapi(data);
      dispatch(AddLessonPlanSlice.actions.getupdateLessonPlanDate(response.data));
    };

export default AddLessonPlanSlice.reducer;
