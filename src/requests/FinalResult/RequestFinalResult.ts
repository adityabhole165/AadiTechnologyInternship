import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import { IClassTeacherListBody, IGetPagedStudentBody } from "src/interfaces/FinalResult/IFinalResult";
import FinalResultApi from "src/api/FinalResult/ApiFinalResult";

const FinalResultSlice = createSlice({
    name: 'FinalResult',

    initialState: {
        ClassTeachers:[],
        StudentResultList: [],
        HeaderList:[],
    },
    reducers: {
        classTeacherList(state, action) {
            state.ClassTeachers = action.payload;
        },
        PageStudentList(state, action) {
            state.StudentResultList = action.payload;
        }
    }

})
// export const ClassTechersList =
//     (data: IClassTeacherListBody): AppThunk =>
//         async (dispatch) => {
//             const response = await FinalResultApi.ClassTeacherList(data);

//             let abc =response.data.map((item,i)=>{

//                 return{
//                     Id:item.Teacher_Id,
//                     Name:item.TeacherName,
//                     Value:item.Teacher_Id
//                 }
//             })
//             dispatch(FinalResultSlice.actions.classTeacherList(abc));
//         };

        export const ClassTechersList =
        (data: IClassTeacherListBody): AppThunk =>
          async (dispatch) => {
            const response = await  FinalResultApi.ClassTeacherList(data)
            let abc = response.data.map((item, i) => {
              return {
                Id: item.Teacher_Id,
                Name: item.TeacherName,
                Value: item.Teacher_Id,
              }  
              
              
            })
            dispatch(FinalResultSlice.actions.classTeacherList(abc))
          }
          
export const GetStudentResultList =
    (data: IGetPagedStudentBody): AppThunk =>
        async (dispatch) => {
            const response = await FinalResultApi.GetStudentResult(data);
           dispatch(FinalResultSlice.actions.PageStudentList(response.data));
        };

export default FinalResultSlice.reducer