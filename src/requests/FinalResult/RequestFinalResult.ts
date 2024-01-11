import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import { IClassTeacherListBody, IGetPagedStudentBody } from "src/interfaces/FinalResult/IFinalResult";
import FinalResultApi from "src/api/FinalResult/ApiFinalResult";
import { logoURL } from "src/components/Common/Util";

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
        export const ClassTechersList =
        (data: IClassTeacherListBody): AppThunk =>
          async (dispatch) => {
            const response = await  FinalResultApi.ClassTeacherList(data)
            let abc = response.data.map((item, i) => {
              return {
                Id: item.SchoolWise_Standard_Division_Id,
                Name: item.TeacherName,
                Value: item.SchoolWise_Standard_Division_Id,
              }                
            })
            dispatch(FinalResultSlice.actions.classTeacherList(abc))
          }
          
export const GetStudentResultList =
    (data: IGetPagedStudentBody): AppThunk =>
        async (dispatch) => {
            const response = await FinalResultApi.GetStudentResult(data);
            let StudentList = response.data?.map((item)=>{
              return {
                Id:item.SchoolWise_Standard_Division_Id,
              Text1:item.Roll_No,
              Text2:item.Name,
              Text3:item.Marks,
              Text4:item.Percentage,
              Text5:item.Grade_Name,              
              Text6:item.Result,

            }
            })
           dispatch(FinalResultSlice.actions.PageStudentList(StudentList));
           console.log(StudentList,"StudentList");
           
        };

export default FinalResultSlice.reducer