import { createSlice } from "@reduxjs/toolkit";
import { IAllPrimaryClassTeachersBody,IGetTestwiseTermBody,IStudentswiseRemarkDetailsToExportBody, IUpdateAllStudentsRemarkDetailsBody, IStudentListToCaptureHeighthWeightBody, IGetAllStudentswiseRemarkDetailsBody} from "src/interfaces/ProgressRemarks/IProgressRemarks"
import { AppThunk } from "src/store";
import ApiProgressRemark from 'src/api/ProgressRemarks/ApiProgressRemarks'



const ProgressRemarkSlice = createSlice({
  name: 'ProgressRemark',
  initialState: {
    ISGetTestwiseTerm:[],
    ISGetClassTeachers:[],
    ISStudentswiseRemarkDetailsToExport:{},
    ISUpdateAllStudentsRemarkDetailsBody:"",
    ISStudentListToCaptureHeighthWeight:[],
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

      RStudentListToCaptureHeighthWeight  (state, action) {
        state.ISStudentListToCaptureHeighthWeight = action.payload
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
        // let ClassTeachers = response.data.map((item, i) => {
        //     return {
        //         Id: item.Teacher_Id,
        //         Name: item.TeacherName,
        //         Value: item.Teacher_Id,
        //     }
        // })

        dispatch(ProgressRemarkSlice.actions.RstudentswiseRemarkDetailsToExport(response.data));
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


    export const CDAStudentListToCaptureHeighthWeight = (data: IStudentListToCaptureHeighthWeightBody): AppThunk =>
    async (dispatch) => {
        const response = await ApiProgressRemark. StudentListToCaptureHeighthWeight(data);
        // let ClassTeachers = response.data.map((item, i) => {
        //     return {
        //         Id: item.Teacher_Id,
        //         Name: item.TeacherName,
        //         Value: item.Teacher_Id,
        //     }
        // })

        dispatch(ProgressRemarkSlice.actions.RStudentListToCaptureHeighthWeight(response.data));
    }


    export const CDAGetAllStudentswiseRemarkDetails = (data: IGetAllStudentswiseRemarkDetailsBody): AppThunk =>
    async (dispatch) => {
        const response = await ApiProgressRemark. GetAllStudentswiseRemarkDetails(data);
        // let ClassTeachers = response.data.map((item, i) => {
        //     return {
        //         Id: item.Teacher_Id,
        //         Name: item.TeacherName,
        //         Value: item.Teacher_Id,
        //     }
        // })

        dispatch(ProgressRemarkSlice.actions.RSGetAllStudentswiseRemarkDetails(response.data));
    }


   

     



export default ProgressRemarkSlice.reducer