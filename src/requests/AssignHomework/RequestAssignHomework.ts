import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import TeacherDropdownApi from 'src/api/AssignHomework/ApiAssignHomework';
import { ITeacherDropdownBody ,IClassDropDownBody,IGetTeacherSubjectDetailsBody} from 'src/interfaces/AssignHomework/IAssignHomework';


const AssignHomeworkSlice = createSlice({
    name: 'Assign Homework',
    initialState: { 
        TeacherList:[],
        ClassList:[],
        SubjectList:[],
        //MyClassSubjectList:[]
        
    },
    reducers: {
      TeacherNameList(state, action) {
            state.TeacherList = action.payload;
        },
        ClassName(state, action) {
          state.ClassList = action.payload;
      },
      SubjectDetails(state, action) {
        state.SubjectList = action.payload;
        //state.MyClassSubjectList = action.payload
    },

    }
});
export const TeacherNameList =
  (data: ITeacherDropdownBody): AppThunk =>
    async (dispatch) => {
      const response = await TeacherDropdownApi.TeacherDropdown(data)
      let abc = response.data.map((item, i) => {
        return {
          Id: item.Teacher_Id,
          Name: item.TeacherName,
          Value: item.Teacher_Id,
        } 
      })
      dispatch(AssignHomeworkSlice.actions.TeacherNameList(abc))
    }
    export const ClassName =
  (data: IClassDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await TeacherDropdownApi.ClassDropdown(data)
      let abc = response.data.map((item, i) => {
        return {
          Id: item.Standard_Division_Id,
          Name: item.StandardDivision,
          Value: item.Standard_Division_Id,
        } 
      })
      dispatch(AssignHomeworkSlice.actions.ClassName(abc))
    }
    export const SubjectDetails = 
    (data:IGetTeacherSubjectDetailsBody ) : AppThunk =>
    async (dispatch) => {
        const response = await TeacherDropdownApi.GetTeacherSubjectDetails(data)
        let responseData = response.data.map((item) => {
     
            return{
            
                Text1:item.Subject_Name,
                Text2: item.StandardDivision,
                Text3: item.MySubject
              
            }
        })
        dispatch(AssignHomeworkSlice.actions.SubjectDetails(responseData));
    };
    
      
    export default AssignHomeworkSlice.reducer;