import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import LessonPlanApi from 'src/api/LessonPlan/ApiLessonPlanBaseScreen';
import { IGetLessonPlanListBody,IGetLessonPlanListResult } from "src/interfaces/LessonPlan/ILessonPlanBaseScreen";



const LessonPlanBaseScreenSlice = createSlice({
    name: 'Lesson Plan',
    initialState: { 
        
        LessonList:[],
        
    },

    reducers: {
      lessonplanlist(state, action) {
            state.LessonList = action.payload;
        },
       

        
    }
});
export const lessonplanlist =
  (data: IGetLessonPlanListBody): AppThunk =>
    async (dispatch) => {
      const response = await LessonPlanApi.LessonPlanList(data)
      let abc = response.data.map((item, i) => {
        return {
            Text1: item.StartDate,
            Text2: item.EndDate,
           // Text6: "Export"
            
        } 
      })
      dispatch(LessonPlanBaseScreenSlice.actions.lessonplanlist(abc))
    }
   

    export default LessonPlanBaseScreenSlice.reducer;