import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from 'src/store'
import ISubjectTeacher from 'src/Interface/Student/SubjectTeacher'
import SubjectTeacherApi from '../../api/Student/SubjectTeacher'

const SubjectTeacherSlice = createSlice({
  name: 'SubjectTeacher',
  initialState: {
    ClassTeachers: [],
    SubjectTeachers: []
  },
  reducers: {
    getSubjectTeachersList(state, action) {
      state.ClassTeachers = action.payload.GetSubjectTeacherResult.ClassTeachers;
      state.SubjectTeachers = action.payload.GetSubjectTeacherResult.SubjectTeachers;
    }
  }
});

export const getSubjectList =
  (data: ISubjectTeacher): AppThunk =>
    async (dispatch) => {
      const response = await SubjectTeacherApi.GetSubjectTeacherList(data);
      dispatch(SubjectTeacherSlice.actions.getSubjectTeachersList(response.data));
    };

export default SubjectTeacherSlice.reducer