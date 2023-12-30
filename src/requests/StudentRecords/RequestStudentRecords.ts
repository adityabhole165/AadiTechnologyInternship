import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import { IGetTeacherListBody,IGetAllStudentStatusBody ,IGetTeacherListResult,IGetAllStudentStatusResult} from "src/interfaces/StudentRecords/IStudentRecords";
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
            const response = await StudentRecordsApi.ClassTeacherList(data)

            let abc = response.data.lstAssociatedTeacher.map((item, i) => {
                return {
                  Id: item.TeacherName,
                  Name: item.TeacherName,
                  Value: item.StdDivId ,
                }  
              })
           dispatch(StudentRecordsSlice.actions.TeacherList(abc));

        };
        export const GetAllStudentStatuss =
        (data: IGetAllStudentStatusBody): AppThunk =>
            async (dispatch) => {
                const response = await StudentRecordsApi.AllStudentStatus(data);
                let StudentList = response.data.map((item)=>{
                    return {Id:item.SchoolWiseStudentId,
                    Text1:item.RegNo,
                    Text2:item.RollNo,
                    Text3:item.Class,
                    Text4:item.Name,
                    Text5: item.ReadyToSubmitCount==0?"":"Unread-" + item.ReadyToSubmitCount.toString()
                }
                  })
               dispatch(StudentRecordsSlice.actions.GetStudentStatus(StudentList));
            };
    
export default StudentRecordsSlice.reducer