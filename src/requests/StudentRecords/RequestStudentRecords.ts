import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import { IGetTeacherListBody,IGetAllStudentStatusBody } from "src/interfaces/StudentRecords/IStudentRecords";
import StudentRecordsApi from "src/api/StudentRecords/ApiStudentRecords";
import { log } from "console";

const StudentRecordsSlice=createSlice({
    name:"StudentRecords",
    initialState: {
        ClassTeachers:[],
        StudentStatus:[],
        
    },
    reducers: {
        TeacherList(state, action) {
            state.ClassTeachers = action.payload;
        },
        GetStudentStatus(state,action){
            state.StudentStatus=action.payload
        }
    }

})
export const GetTeachersList =
    (data: IGetTeacherListBody): AppThunk =>
        async (dispatch) => {
            const response = await StudentRecordsApi.ClassTeacherList(data);
            let abc = response.data.map((item, i) => {
                return {
                  Id: item.StdDivId,
                  Name: item.TeacherName,
                  Value: item.StdDivId,
                }  
              })
              console.log(abc,"abc");
              
           dispatch(StudentRecordsSlice.actions.TeacherList(abc));
        };
        export const GetAllStudentStatuss =
        (data: IGetAllStudentStatusBody): AppThunk =>
            async (dispatch) => {
                const response = await StudentRecordsApi.AllStudentStatus(data);
               dispatch(StudentRecordsSlice.actions.GetStudentStatus(response.data));
            };
    
export default StudentRecordsSlice.reducer