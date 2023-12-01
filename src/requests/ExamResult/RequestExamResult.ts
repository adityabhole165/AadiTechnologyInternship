import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import ApiGetClassTeachers from 'src/api/ExamResult/ApiExamResult';
import { IGetAllTestsForClassBody, IGetClassPassFailDetailsForTestBody, IGetClassTeachersBody } from 'src/interfaces/ExamResult/IExamResult';
import ApiExamResult from 'src/api/ExamResult/ApiExamResult';

const SliceExamResult = createSlice({
    name: 'Birthdays',
    initialState: {
        ClassTeachers: [],
        AllTestsForClass: [],
        ClassPassFailDetailsForTest: [],
      Loading: true,
    },
    reducers: {
        GetClassTeachers(state, action) {
          state.Loading = false;
          state.ClassTeachers = action.payload;

        },
        GetAllTestsForClass(state, action) {
          state.Loading = false;
          state.AllTestsForClass = action.payload;
        },
        GetClassPassFailDetailsForTest(state, action) {
          state.Loading = false;
          state.ClassPassFailDetailsForTest = action.payload;
        },
        getLoading (state,action) {
            state.Loading = true
        }
        }
      });

      export const getClassTeachers =
      (data: IGetClassTeachersBody): AppThunk =>
        async (dispatch) => {
          dispatch(SliceExamResult.actions.getLoading(true));
          const response = await ApiExamResult.ClassTeachersApi(data)
          const ClassTeachersList =
          response.data.map((item, index) => {
            return {
             Id:index,
             Name:item.TeacherName,
             Value:item.SchoolWise_Standard_Division_Id
            }
          })
          dispatch(SliceExamResult.actions.GetClassTeachers(ClassTeachersList));
        };

        
      export const getAllTestsForClass =
      (data: IGetAllTestsForClassBody): AppThunk =>
        async (dispatch) => {
          dispatch(SliceExamResult.actions.getLoading(true));
  const response = await ApiExamResult.GetAllTestsForClassApi(data)
          const AllTestsForClass =
          response.data.map((item, index) => {
            return {
             Id:index,
             Name:item.SchoolwiseTestName,
             Value:item.SchoolwiseTestId
            }
          })

          dispatch(SliceExamResult.actions.GetAllTestsForClass(AllTestsForClass));
        };
        
      export const getClassPassFailDetailsForTest =
      (data: IGetClassPassFailDetailsForTestBody): AppThunk =>
        async (dispatch) => {
          dispatch(SliceExamResult.actions.getLoading(true));
          const response = await ApiExamResult.GetClassPassFailDetailsForTestApi(data)
          
        //   console.log("getClassPassFailDetailsForTest",response)
          dispatch(SliceExamResult.actions.GetClassPassFailDetailsForTest(response.data.LstClassPassFailDetailsForTest));
        };
    
    export default SliceExamResult.reducer