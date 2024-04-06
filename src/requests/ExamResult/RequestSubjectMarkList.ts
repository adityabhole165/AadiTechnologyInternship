import { createSlice } from '@reduxjs/toolkit';
import ApiSubjectMarkList from 'src/api/ExamResult/ApiSubjectMarkList';
import {
    IGetTestMarkBody
} from 'src/interfaces/ExamResult/ISubjectMarkList';
import { AppThunk } from 'src/store';

const SubjectMarkListSlice = createSlice({
  name: 'SubjectMark',
  initialState: {
    listTestName: [],

   
  },
  reducers: {
    GetTestMark(state, action) {
        state.listTestName = action.payload;
      },
  }
});
export const getmarklist =
  (data: IGetTestMarkBody): AppThunk =>
  async (dispatch) => {
    const response = await ApiSubjectMarkList.TestMarkApi(data);
    let Roll_No=[]
    let abc = response.data.listSchoolWise_Student_Test_Marks_Detail.map((item, i) => {
      if(!Roll_No.includes(item.Roll_No)){
return{
  Roll_No: item.Roll_No,
}
      }
      
    });
    dispatch(SubjectMarkListSlice.actions.GetTestMark(abc));

  };








export default SubjectMarkListSlice.reducer;
