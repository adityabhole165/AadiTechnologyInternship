import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import LessonPlanApi from 'src/api/LessonPlan/ApiLessonPlanBaseScreen';
import { IGetLessonPlanListBody,IDeleteLessonPlanBody,IGetLessonPlanDetailsForReportBody } from "src/interfaces/LessonPlan/ILessonPlanBaseScreen";
import { getDateMonthYearFormatted } from 'src/components/Common/Util';



const LessonPlanBaseScreenSlice = createSlice({
    name: 'Lesson Plan',
    initialState: { 
        
        LessonList:[],
        DeletePlan:"",
        ResetDeletePlan:"",
        LessonReport:[]
    },

    reducers: {
      lessonplanlist(state, action) {
            state.LessonList = action.payload;
        },
        deletelessonplan(state, action) {
          state.DeletePlan = action.payload;
      },
      resetdeleteplan(state) {
        state.ResetDeletePlan = "";
    },
    LessonPlanDetailsReport(state,action){
      state.LessonReport=action.payload;
    }
     

        
    }
});
export const lessonplanlist =
  (data: IGetLessonPlanListBody): AppThunk =>
    async (dispatch) => {
      const response = await LessonPlanApi.LessonPlanList(data)
      let abc = response.data.map((item, i) => {
        return {
            Id:i,
            Text1:item.StartDate,
            Text2:item.EndDate,
            Text7:item.IsSubmitted
           // Text6: "Export"
            
        }   
      })
      dispatch(LessonPlanBaseScreenSlice.actions.lessonplanlist(abc))
      console.log(abc,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      
    }
    export const deletelessonplan =
    (data: IDeleteLessonPlanBody): AppThunk =>
      async (dispatch) => {
        const response = await LessonPlanApi.DeleteLessonPlan(data)
        dispatch(LessonPlanBaseScreenSlice.actions.deletelessonplan(response.data))
      }
      export const resetdeleteplan =(): AppThunk =>
      async (dispatch) => {
        dispatch(LessonPlanBaseScreenSlice.actions.resetdeleteplan())
      }

      
      export const GetLessonPlanreport =
      (data:IGetLessonPlanDetailsForReportBody):AppThunk =>
      async(dispatch)=> {
        const response = await LessonPlanApi.LessonPlanReport(data)
        dispatch(LessonPlanBaseScreenSlice.actions.LessonPlanDetailsReport(response.data))

      }
    export default LessonPlanBaseScreenSlice.reducer;