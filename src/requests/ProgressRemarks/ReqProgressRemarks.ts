import { createSlice } from "@reduxjs/toolkit";
import { IAllPrimaryClassTeachersBody,IGetTestwiseTermBody,IStudentswiseRemarkDetailsToExportBody, IUpdateAllStudentsRemarkDetailsBody, IStudentListDropDowntBody, IGetAllStudentswiseRemarkDetailsBody} from "src/interfaces/ProgressRemarks/IProgressRemarks"
import { AppThunk } from "src/store";
import ApiProgressRemark from 'src/api/ProgressRemarks/ApiProgressRemarks'



const ProgressRemarkSlice = createSlice({
  name: 'ProgressRemark',
  initialState: {
    ISGetTestwiseTerm:[],
    ISGetClassTeachers:[],
    ISStudentswiseRemarkDetailsToExport:{},
    ISUpdateAllStudentsRemarkDetailsBody:"",
    ISStudentListDropDown:[],
    ISGetAllStudentswiseRemarkDetails:[]
    

  },
  reducers: {
   
    RGetTestwiseTerm  (state, action) {
        state.ISGetTestwiseTerm = action.payload
      },
    RGetClassTeachers  (state, action) {
      state.ISGetClassTeachers = action.payload
    },

    RstudentswiseRemarkDetailsToExport  (state, action) {
        state.ISStudentswiseRemarkDetailsToExport = action.payload
      },

      RSUpdateAllStudentsRemarkDetailsBody  (state, action) {
        state.ISUpdateAllStudentsRemarkDetailsBody = action.payload
      },

      RStudentListDropDown  (state, action) {
        state.ISStudentListDropDown = action.payload
      },

      RSGetAllStudentswiseRemarkDetails  (state, action) {
        state.ISGetAllStudentswiseRemarkDetails = action.payload
      },

      

      

   
   
  }
});

export const CDAGetTestwiseTerm = (data: IGetTestwiseTermBody): AppThunk =>
async (dispatch) => {
    const response = await ApiProgressRemark.GetTestwiseTerm(data);
    let TestwiseTerm = response.data.map((item, i) => {
        return {
            Id: item.Term_Id,
            Name: item.Term_Name,
            Value: item.Term_Id,
        }
    })

    dispatch(ProgressRemarkSlice.actions.RGetTestwiseTerm(TestwiseTerm));
    
}

   
    export const CDAGetClassTeachers = (data: IAllPrimaryClassTeachersBody): AppThunk =>
    async (dispatch) => {
        const response = await ApiProgressRemark. ClassTeachers(data);
        let ClassTeachers = response.data.map((item, i) => {
            return {
                Id: item.Teacher_Id,
                Name: item.TeacherName,
                Value: item.Teacher_Id,
            }
        })

        dispatch(ProgressRemarkSlice.actions.RGetClassTeachers(ClassTeachers));
    }


    export const CDAStudentswiseRemarkDetailsToExport = (data: IStudentswiseRemarkDetailsToExportBody): AppThunk =>
    async (dispatch) => {
        const response = await ApiProgressRemark. StudentswiseRemarkDetailsToExport(data);
        
            const ExlFile = response.data.listStudentDetails.map((item, i)=>{
            return {
                ...item
               
        }
    });
        

        dispatch(ProgressRemarkSlice.actions.RstudentswiseRemarkDetailsToExport(ExlFile));
     
        return response.data.listRemarkDetails;
    }


    export const CDAUpdateAllStudentsRemarkDetails = (data: IUpdateAllStudentsRemarkDetailsBody): AppThunk =>
    async (dispatch) => {
        const response = await ApiProgressRemark. UpdateAllStudentsRemarkDetails(data);
        // let ClassTeachers = response.data.map((item, i) => {
        //     return {
        //         Id: item.Teacher_Id,
        //         Name: item.TeacherName,
        //         Value: item.Teacher_Id,
        //     }
        // })

        dispatch(ProgressRemarkSlice.actions.RSUpdateAllStudentsRemarkDetailsBody(response.data));
    }


    export const CDAStudentListDropDown = (data: IStudentListDropDowntBody): AppThunk =>
    async (dispatch) => {
        const response = await ApiProgressRemark. StudentListDropDown(data);
        let StudentList = response.data.map((item, i) => {
            return {
                Id: item.Student_Id,
                Name: item.Student_Name,
                Value: item.Student_Id,
            }
        })
          
        dispatch(ProgressRemarkSlice.actions.RStudentListDropDown(StudentList));
    }


    export const CDAGetAllStudentswiseRemarkDetails = (data: IGetAllStudentswiseRemarkDetailsBody): AppThunk =>
    async (dispatch) => {
        const response = await ApiProgressRemark. GetAllStudentswiseRemarkDetails(data);
        let RemarkList = response.data.map((item, i) => {
            return {
                Text1: item.RollNo,
                Text2: item.StudentName,
                Text3: item.Remark,
                Text4: item.OldRemark,
            }
        })

        dispatch(ProgressRemarkSlice.actions.RSGetAllStudentswiseRemarkDetails(RemarkList));
    }


   

     



export default ProgressRemarkSlice.reducer