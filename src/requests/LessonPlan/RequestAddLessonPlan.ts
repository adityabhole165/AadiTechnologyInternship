import { createSlice } from '@reduxjs/toolkit';
import AddLessonPlanApi from 'src/api/LessonPlan/ApiAddLessonPlan';
import { IClassListBody } from 'src/interfaces/LessonPlan/IAddLessonPlan';
import { AppThunk } from 'src/store';

const AddLessonPlanSlice = createSlice({
  name: 'Add Lesson Plan',
  initialState: {
    ClassName: []
  },

  reducers: {
    classnamelist(state, action) {
      state.ClassName = action.payload;
    }
  }
});
export const classnamelist =
  (data: IClassListBody): AppThunk =>
  async (dispatch) => {
    const response = await AddLessonPlanApi.ClassList(data);
    let abc = response.data.map((item, i) => {
      return {
        Id: item.SchoolWise_Standard_Division_Id,
        Name: item.StandardDivision,
        Value: item.SchoolWise_Standard_Division_Id
      };
    });
    dispatch(AddLessonPlanSlice.actions.classnamelist(abc));
  };

export default AddLessonPlanSlice.reducer;
