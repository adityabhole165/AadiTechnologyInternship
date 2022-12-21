import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from 'src/store'
import ISubjectTeacher from 'src/interfaces/Student/SubjectTeacher'
import SubjectTeacherApi from '../../api/Student/SubjectTeacher'

const SubjectTeacherSlice = createSlice({
  name: 'SubjectTeacher',
  initialState: {
    ClassTeachers: [],
    SubjectTeachers: [],
    Loading : true
  },
  reducers: {
    getSubjectTeachersList(state, action) {
      state.ClassTeachers = action.payload.GetSubjectTeacherResult.ClassTeachers;
      state.SubjectTeachers = action.payload.GetSubjectTeacherResult.SubjectTeachers;
      state.Loading = false
    },
    getLoading (state,action) {
        state.Loading = true
        state.ClassTeachers = [];
        state.SubjectTeachers = [];
    }
  }
});

export const getSubjectList =
  (data: ISubjectTeacher): AppThunk =>
    async (dispatch) => {
    dispatch(SubjectTeacherSlice.actions.getLoading(true));
    const response = await SubjectTeacherApi.GetSubjectTeacherList(data);
      dispatch(SubjectTeacherSlice.actions.getSubjectTeachersList(response.data));
    };

export default SubjectTeacherSlice.reducer