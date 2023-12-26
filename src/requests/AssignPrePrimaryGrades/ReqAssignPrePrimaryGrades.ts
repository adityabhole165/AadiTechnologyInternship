import { createSlice } from "@reduxjs/toolkit";
import { IGetTestwiseTermBody, IGetClassTeachersBody, IGetTeacherXseedSubjectsBody} from "src/interfaces/AssignPrePrimaryGrade/IAssignPrePrimaryGrades"
import { AppThunk } from "src/store";
import ApiAssignPrePrimaryGrades from 'src/api/AssignPrePrimaryGrades/ApiAssignPrePrimaryGrades'



const AssignPrePrimaryGradesSlice = createSlice({
  name: 'AssignPrePrimary',
  initialState: {
    ISGetTestwiseTerm:[],
    ISGetClassTeachers:[],
    ISGetTeacherXseedSubjectsBody:[]

  },
  reducers: {
    RGetTestwiseTerm  (state, action) {
      state.ISGetTestwiseTerm = action.payload
    },

    RGetClassTeachers  (state, action) {
      state.ISGetClassTeachers = action.payload
    },

    RGetTeacherXseedSubjects  (state, action) {
      state.ISGetTeacherXseedSubjectsBody = action.payload
    },
   
  }
});

    export const CDAGetTestwiseTerm = (data: IGetTestwiseTermBody): AppThunk =>
    async (dispatch) => {
        const response = await ApiAssignPrePrimaryGrades.GetTestwiseTermA(data);
        let TestwiseTerm = response.data.map((item, i) => {
            return {
                Id: item.Term_Id,
                Name: item.Term_Name,
                Value: item.Term_Id,
            }
        })

        dispatch(AssignPrePrimaryGradesSlice.actions.RGetTestwiseTerm(TestwiseTerm));
    }


    export const CDAGetClassTeachers = (data: IGetClassTeachersBody): AppThunk =>
    async (dispatch) => {
        const response = await ApiAssignPrePrimaryGrades.GetClassTeachers(data);
        let ClassTeachers = response.data.map((item, i) => {
            return {
                Id: item.Teacher_Id,
                Name: item.TeacherName,
                Value: item.Teacher_Id,
            }
        })

        dispatch(AssignPrePrimaryGradesSlice.actions.RGetClassTeachers(ClassTeachers));
    }


    export const CDAGetTeacherXseedSubjects= (data: IGetTeacherXseedSubjectsBody): AppThunk =>
    async (dispatch) => {
        const response = await ApiAssignPrePrimaryGrades.GetTeacherXseedSubjects(data);
        let TeacherXseedSubjects = response.data.map((item, i) => {
            return {
                Text1: item.Subject_Name,
                Text2: item.SubmitStatus,
                Text3: item.IsXseedSubject,
            }
        })

        dispatch(AssignPrePrimaryGradesSlice.actions.RGetTeacherXseedSubjects(TeacherXseedSubjects));
    }



export default AssignPrePrimaryGradesSlice.reducer