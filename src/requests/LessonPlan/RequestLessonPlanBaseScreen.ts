import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import LessonPlanApi from 'src/api/LessonPlan/ApiLessonPlanBaseScreen';
import { IGetLessonPlanListBody,IDeleteLessonPlanBody } from "src/interfaces/LessonPlan/ILessonPlanBaseScreen";
import { getDateMonthYearFormatted } from 'src/components/Common/Util';



const LessonPlanBaseScreenSlice = createSlice({
    name: 'Lesson Plan',
    initialState: { 
        
        LessonList:[],
        DeletePlan:"",
        ResetDeletePlan:""
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
     

        
    }
});
export const lessonplanlist =
  (data: IGetLessonPlanListBody): AppThunk =>
    async (dispatch) => {
      const response = await LessonPlanApi.LessonPlanList(data)
      let abc = response.data.map((item, i) => {
        return {
            Id:i,
            Text1:  getDateMonthYearFormatted(item.StartDate),
            Text2: getDateMonthYearFormatted(item.EndDate),
           // Text6: "Export"
            
        }   
      })
      dispatch(LessonPlanBaseScreenSlice.actions.lessonplanlist(abc))
    }
    export const deletelessonplan =
    (data: IDeleteLessonPlanBody): AppThunk =>
      async (dispatch) => {
        const response = await LessonPlanApi.DeleteLessonPlan(data)
        dispatch(LessonPlanBaseScreenSlice.actions.deletelessonplan(response.data))
      }

      export const resetdeleteplan =
    (): AppThunk =>
      async (dispatch) => {
        dispatch(LessonPlanBaseScreenSlice.actions.resetdeleteplan())
      }

    export default LessonPlanBaseScreenSlice.reducer;