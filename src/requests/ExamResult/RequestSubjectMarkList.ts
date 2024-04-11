import { createSlice } from '@reduxjs/toolkit';
import ApiSubjectMarkList from 'src/api/ExamResult/ApiSubjectMarkList';
import {
  GetStudentsForSubjectMarkMouseOverBody,
  IGetTestMarkBody
} from 'src/interfaces/ExamResult/ISubjectMarkList';
import { AppThunk } from 'src/store';

const SubjectMarkListSlice = createSlice({
  name: 'SubjectMark',
  initialState: {
    listTestMark: [],
    listTestTypeName: [],
    StudentNameMouseOver: [],


  },
  reducers: {
    GetTestMark(state, action) {
      state.listTestMark = action.payload;
    },
    TestName(state, action) {
      state.listTestTypeName = action.payload;
    },
    StudentListMouseOver(state, action) {
      state.StudentNameMouseOver = action.payload;
    },
  }
});
export const gettestmarklist =
  (data: IGetTestMarkBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSubjectMarkList.TestMarkApi(data);
      let Roll_No = []
      let abc = response.data.listSchoolWise_Student_Test_Marks_Detail.map((item, i) => {
        if (!Roll_No.includes(item.Roll_No)) {
          return {
            Roll_No: item.Roll_No,
          }
        }

      });
      dispatch(SubjectMarkListSlice.actions.GetTestMark(abc));

    };

export const studentmouseoverlist =
  (data: GetStudentsForSubjectMarkMouseOverBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiSubjectMarkList.StudentNameMouseoverApi(data);
      dispatch(SubjectMarkListSlice.actions.StudentListMouseOver(response.data));
    };









export default SubjectMarkListSlice.reducer;
