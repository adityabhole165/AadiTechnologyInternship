import { createSlice } from '@reduxjs/toolkit';
import ApiProgressRemark from 'src/api/ProgressRemarks/ApiProgressRemarks';
import {
  IAllPrimaryClassTeachersBody,
  IGetAllGradesForStandardBody,
  IGetAllStudentswiseRemarkDetailsBody,
  IGetRemarkTemplateDetailsBody,
  IGetRemarksCategoryBody,
  IGetTestwiseTermBody,
  IStudentListDropDowntBody,
  IStudentswiseRemarkDetailsToExportBody,
  IUpdateAllStudentsRemarkDetailsBody
} from 'src/interfaces/ProgressRemarks/IProgressRemarks';
import { AppThunk } from 'src/store';

const ProgressRemarkSlice = createSlice({
  name: 'ProgressRemark',
  initialState: {
    ISGetTestwiseTerm: [],
    ISGetClassTeachers: [],
    ISStudentswiseRemarkDetailsToExport: {},
    ISStudentswiseRemarkDetailsToExport1: {},
    ISStudentswiseRemarkDetailsToExport2: {},
    ISUpdateAllStudentsRemarkDetailsBody: '',
    ISStudentListDropDown: [],
    ISGetAllStudentswiseRemarkDetails: [],
    ISresetSaveMassage: '',
    ISGradesForStandard: [],
    ISGetRemarksCategoryList: [],
    ISGetRemarkTemplateDetail: []

  },
  reducers: {
    RGetTestwiseTerm(state, action) {
      state.ISGetTestwiseTerm = action.payload;
    },
    RGetClassTeachers(state, action) {
      state.ISGetClassTeachers = action.payload;
    },

    RstudentswiseRemarkDetailsToExport(state, action) {
      state.ISStudentswiseRemarkDetailsToExport = action.payload;
    },

    RstudentswiseRemarkDetailsToExport1(state, action) {
      state.ISStudentswiseRemarkDetailsToExport1 = action.payload;
    },

    RstudentswiseRemarkDetailsToExport2(state, action) {
      state.ISStudentswiseRemarkDetailsToExport2 = action.payload;
    },

    RSUpdateAllStudentsRemarkDetailsBody(state, action) {
      state.ISUpdateAllStudentsRemarkDetailsBody = action.payload;
    },

    RStudentListDropDown(state, action) {
      state.ISStudentListDropDown = action.payload;
    },

    RSGetAllStudentswiseRemarkDetails(state, action) {
      state.ISGetAllStudentswiseRemarkDetails = action.payload;
    },
    RSGradesForStandard(state, action) {
      state.ISGradesForStandard = action.payload;
    },
    RSGetRemarksCategory(state, action) {
      state.ISGetRemarksCategoryList = action.payload;
    },
    RSGetRemarksTemplateDetail(state, action) {
      state.ISGetRemarkTemplateDetail = action.payload;
    },

    RresetSaveMassage(state) {
      state.ISresetSaveMassage = '';
    }
  }

});

export const CDAGetTestwiseTerm =
  (data: IGetTestwiseTermBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.GetTestwiseTerm(data);
      let TestwiseTerm = response.data.map((item, i) => {
        return {
          Id: item.Term_Id,
          Name: item.Term_Name,
          Value: item.Term_Id
        };
      });

      dispatch(ProgressRemarkSlice.actions.RGetTestwiseTerm(TestwiseTerm));
    };

export const CDAGetClassTeachers =
  (data: IAllPrimaryClassTeachersBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.ClassTeachers(data);
      let ClassTeachers = response.data.map((item, i) => {
        return {
          Id: item.Teacher_Id,
          Name: item.TeacherName,
          Value: item.Teacher_Id
        };
      });

      dispatch(ProgressRemarkSlice.actions.RGetClassTeachers(ClassTeachers));
    };

export const CDAStudentswiseRemarkDetailsToExport =
  (data: IStudentswiseRemarkDetailsToExportBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.StudentswiseRemarkDetailsToExport(
        data
      );

      const ExlFile = response.data.listStudentDetails.map((item, i) => {
        return {
          ...item
        };
      });

      const ExlFile1 = response.data.listRemarkDetails.map((item, i) => {
        return {
          ...item
        };
      });

      const ExlFile2 = response.data.listTermDetails.map((item, i) => {
        return {
          ...item
        };
      });

      dispatch(
        ProgressRemarkSlice.actions.RstudentswiseRemarkDetailsToExport(ExlFile)
      );
      dispatch(
        ProgressRemarkSlice.actions.RstudentswiseRemarkDetailsToExport1(ExlFile1)
      );
      dispatch(
        ProgressRemarkSlice.actions.RstudentswiseRemarkDetailsToExport2(ExlFile2)
      );

      return response.data.listStudentDetails;
      return response.data.listRemarkDetails;
      return response.data.listTermDetails;
    };

export const CDAUpdateAllStudentsRemarkDetails =
  (data: IUpdateAllStudentsRemarkDetailsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.UpdateAllStudentsRemarkDetails(
        data
      );
      // let ClassTeachers = response.data.map((item, i) => {
      //     return {
      //         Id: item.Teacher_Id,
      //         Name: item.TeacherName,
      //         Value: item.Teacher_Id,
      //     }
      // })

      dispatch(
        ProgressRemarkSlice.actions.RSUpdateAllStudentsRemarkDetailsBody(
          response.data
        )
      );
    };
export const CDAGradeDropDown =
  (data: IGetAllGradesForStandardBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.GetAllGradeForStandard(data);
      let GradeList = [{ Id: '0', Name: 'All', Value: '0' }];
      response.data.map((item, i) => {
        GradeList.push({
          Id: item.Marks_Grades_Configuration_Detail_ID,
          Name: item.Grade_Name,
          Value: item.Marks_Grades_Configuration_Detail_ID
        });
      });

      dispatch(ProgressRemarkSlice.actions.RSGradesForStandard(GradeList));
    };
export const CDAGetRemarksCategory =
  (data: IGetRemarksCategoryBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.GetRemarksCategory(data);
      let RemarksCategoryList = [{ Id: '0', Name: 'All', Value: '0' }];
      response.data.map((item, i) => {
        RemarksCategoryList.push({
          Id: item.SortOrder,
          Name: item.Name,
          Value: item.SortOrder
        });
      });

      dispatch(ProgressRemarkSlice.actions.RSGetRemarksCategory(RemarksCategoryList));

    };
export const CDAStudentListDropDown =
  (data: IStudentListDropDowntBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.StudentListDropDown(data);
      let StudentList = response.data.map((item, i) => {
        return {
          Id: item.Student_Id,
          Name: item.Student_Name,
          Value: item.Student_Id
        };
      });

      dispatch(ProgressRemarkSlice.actions.RStudentListDropDown(StudentList));
    };

export const CDAGetAllStudentswiseRemarkDetails =
  (data: IGetAllStudentswiseRemarkDetailsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.GetAllStudentswiseRemarkDetails(
        data
      );
      let RemarkList = response.data.map((item, i) => {
        return {
          Id: i,
          Text1: item.RollNo,
          Text2: item.StudentName,
          Text3: item.Remark,
          Text4: item.OldRemark,
          Text5: item.RemarkName,
          Text6: item.RemarkConfigId,
          Text7: '0',
          Text8: item.SalutationId,
          Text9: item.IsPassedAndPromoted,
          Text10: item.IsLeftStudent,
          Text11: item.YearwiseStudentId,
          Text12: item.StudentwiseRemarkId,
          Text13: item.Remark
        };
      });

      dispatch(
        ProgressRemarkSlice.actions.RSGetAllStudentswiseRemarkDetails(RemarkList)
      );
    };
export const CDAGetRemarkTemplateDetails =
  (data: IGetRemarkTemplateDetailsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressRemark.GetRemarksTemplateDetail(
        data
      );
      let RemarkTemplateDetailList = response.data.map((item, i) => {
        return {
          Id: item.TemplateId,
          Text1: item.Template,
          CategoryId: item.CategoryId,
          IsActive : false

        };
      });

      dispatch(
        ProgressRemarkSlice.actions.RSGetRemarksTemplateDetail(RemarkTemplateDetailList)
      );

    };

export const CDAresetSaveMassage = (): AppThunk => async (dispatch) => {
  dispatch(ProgressRemarkSlice.actions.RresetSaveMassage());
};

export default ProgressRemarkSlice.reducer;
