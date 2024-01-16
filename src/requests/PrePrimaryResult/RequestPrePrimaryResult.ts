import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import ApiPrePrimaryResult from 'src/api/PrePrimaryResult/APIPrePrimaryResult';
import { IGetPrePrimaryResultBody,IGetAssessmentBody,IGetTeacherXseedSubjectsBody } from "src/interfaces/PrePrimaryResult/IPrePrimaryResult";

const SlicePrePrimaryResult = createSlice({
    name: 'PrePrimaryResult',
    initialState: {
        PrePrimaryResult:[],
        Assessment:[],
        TeacherXseedSubjects:[],

    },
    reducers : {
        PrePrimaryResults(state , action)
            {
                state.PrePrimaryResult=action.payload;
            },
            Assessment(state , action)
            {
                state.Assessment=action.payload;
            },
            TeacherXseedSubjects(state , action)
            {
                state.TeacherXseedSubjects=action.payload;
            },
        }
});

export const PrePrimary =
  (data: IGetPrePrimaryResultBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiPrePrimaryResult.PrePrimaryResultApi(data);
      let abc = response.data.map((item, i) => {
        return {
          Id: item.Teacher_Id,
          Name: item.TeacherName,
          Value: item.Teacher_Id
        }                
      })
      dispatch(SlicePrePrimaryResult.actions.PrePrimaryResults(abc));
    };
    export const AssessmentList =
  (data: IGetAssessmentBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiPrePrimaryResult.AssessmentApi(data);
      let abc = response.data.map((item, i) => {
        return {
          Id: item. AssessmentId,
          Name: item.Name,
          Value: item.AssessmentId
        }                
      })
      dispatch(SlicePrePrimaryResult.actions.Assessment(abc));
    };
    export const TeacherXseedSubjects =
  (data: IGetTeacherXseedSubjectsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiPrePrimaryResult.TeacherXseedSubjectsApi(data);
      let abc = response.data.map((item, i) => {
        return {
          Id: item.SubjectId,
          Text1: item.Subject_Name,
       }                
      })
      dispatch(SlicePrePrimaryResult.actions.TeacherXseedSubjects(abc));
    };
    export default SlicePrePrimaryResult.reducer;