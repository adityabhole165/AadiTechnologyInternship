import { createSlice } from "@reduxjs/toolkit";
import ApiProgressReport from "src/api/ProgressReport/ApiProgressReport";
import { IGetClassTeachersBody, IGetPassedAcademicYearsBody, IGetStudentNameDropdownBody, IStudentProgressReportBody , IGetAllMarksGradeConfigurationBody} from "src/interfaces/ProgressReport/IprogressReport";

import { AppThunk } from "src/store";

const ProgressReportSlice = createSlice({
  name: 'ProgressReport',
  initialState: {
    ISGetClassTeachers: [],
    ISGetStudentNameDropdown: [],
    ISStudentProgressReport: [],
    ISlistStudentsDetails: [],
    ISlistSubjectsDetails: [],
    ISlistTestDetails: [],
    ISlistSubjectIdDetails: [],
    ISlistTestidDetails: [],
    ISListSchoolWiseTestNameDetail: [],
    ISListSubjectidDetails: [],
    ISListTestTypeIdDetails: [],
    ISListMarkssDetails: [],
    ISListDisplayNameDetails: [],
    ISGetPassedAcademicYears: [],
    ISGetAllMarksGradeConfiguration:[],
    ISGetAllMarksGradeConfiguration1:[]


  },
  reducers: {
    RGetClassTeachers(state, action) {
      state.ISGetClassTeachers = action.payload;
    },
    RGetStudentNameDropdown(state, action) {
      state.ISGetStudentNameDropdown = action.payload;
    },
    RStudentProgressReport(state, action) {
      state.ISStudentProgressReport = action.payload;
    },
    RlistStudentsDetails(state, action) {
      state.ISlistStudentsDetails = action.payload;
    },
    RlistSubjectsDetails(state, action) {
      state.ISlistSubjectsDetails = action.payload;
    },
    RlistTestDetails(state, action) {
      state.ISlistTestDetails = action.payload;
    },
    RListSchoolWiseTestNameDetail(state, action) {
      state.ISListSchoolWiseTestNameDetail = action.payload;
    },
    RlistSubjectIdDetails(state, action) {
      state.ISlistSubjectIdDetails = action.payload;
    },
    RListSubjectidDetails(state, action) {
      state.ISListSubjectidDetails = action.payload;
    },
    RlistTestidDetails(state, action) {
      state.ISlistTestidDetails = action.payload;
    },

    RListMarkssDetails(state, action) {
      state.ISListMarkssDetails = action.payload;
    },
    RListDisplayNameDetails(state, action) {
      state.ISListDisplayNameDetails = action.payload;
    },

    RListTestTypeIdDetails(state, action) {
      state.ISListTestTypeIdDetails = action.payload;
    },
    RGetPassedAcademicYears(state, action) {
      state.ISGetPassedAcademicYears = action.payload;
    },
    RGetAllMarksGradeConfiguration(state, action) {
      state.ISGetAllMarksGradeConfiguration = action.payload;
    },

    RGetAllMarksGradeConfiguration1(state, action) {
      state.ISGetAllMarksGradeConfiguration1 = action.payload;
    },


    




  }
});

export const CDAGetClassTeachers =
  (data: IGetClassTeachersBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressReport.GetClassTeachers(data);
      let ClassTeachersList = [{ Id: '0', Name: '--Select--', Value: '0' }];
      response.data.map((item, i) => {
        ClassTeachersList.push({
          Id: item.Teacher_Id,
          Name: item.TeacherName,
          Value: item.Teacher_Id
        });
      });
      dispatch(ProgressReportSlice.actions.RGetClassTeachers(ClassTeachersList));
    };

export const CDAGetStudentName =
  (data: IGetStudentNameDropdownBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressReport.GetStudentNameDropdown(data)
      let StudentList = [{ Id: '0', Name: 'All', Value: '0' }];
      response.data.map((item, i) => {
        StudentList.push({
          Id: item.Student_Id,
          Name: item.StudentName,
          Value: item.Student_Id
        });
      });

      dispatch(ProgressReportSlice.actions.RGetStudentNameDropdown(StudentList));


    };


export const CDAStudentProgressReport =
  (data: IStudentProgressReportBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressReport.StudentProgressReport(data)

      let listStudentsDetails = response.data.listStudentsDetails.map((item, i) => {
        return {
          Id: item.YearWise_Student_Id,
          Student_Name: item.Student_Name,
          Roll_No: item.Roll_No,
          Standard_Name: item.Standard_Name,
          Division_Name: item.Division_Name,
          Academic_Year: item.Academic_Year,
          School_Name: item.School_Name,
          School_Orgn_Name: item.School_Orgn_Name

        };
      });
      let listSubjectsDetails = response.data.listSubjectsDetails.map((item, i) => {
        return {
          Subject_Id: item.Subject_Id,
          Subject_Name: item.Subject_Name,

        };
      });
      let listTestDetails = response.data.listTestDetails
        .filter(item => Number(item.Test_Id) !== -1)
        .map(item => {
          return {
            Test_Id: item.Test_Id,
            Test_Name: item.Test_Name,
          };
        });



      let listSubjectIdDetails = response.data.listSubjectIdDetails.map((item, i) => {
        return {
          Id: item.Original_SchoolWise_Test_Id,
          ShortenTestType_Name: item.ShortenTestType_Name,
          Marks:item.Marks

        };
      });

      let ListSchoolWiseTestNameDetail = response.data.ListSchoolWiseTestNameDetail.map((item, i) => {
        return {
          Id: item.Percentage,
          Text1: item.Total_Marks_Scored,

        };
      });
      let listTestidDetails = response.data.listTestidDetails.map((item, i) => {
        return {
          Id: item.OutOfMarks,
          Text1: item.Parent_Subject_Name,

        };
      });


      let ListSubjectidDetails = response.data.ListSubjectidDetails.map((item, i) => {
        return {
          Id: item.Subject_Id,
          Text1: item.TestTypeSort_Order,

        };
      });


      let ListTestTypeIdDetails = response.data.ListTestTypeIdDetails.map((item, i) => {
        return {
          Id: item.TestType_Name,
          Text1: item.TestTypeSort_Order,

        };
      });

      let ListMarkssDetails = response.data.ListMarkssDetails.map((item, i) => {
        return {
          Text1: '',
          Text2: item.Grade_Name,
          Text3: item.Remarks,
          IsForCoCurricularSubjects:item.IsForCoCurricularSubjects

        };
      });
      



      let ListDisplayNameDetails = response.data.ListDisplayNameDetails.map((item, i) => {
        return {
          Id: item.DisplayValue,
          Text1: item.DisplayName

        };
      });

      dispatch(ProgressReportSlice.actions.RlistStudentsDetails(listStudentsDetails));
      dispatch(ProgressReportSlice.actions.RlistSubjectsDetails(listSubjectsDetails));
      dispatch(ProgressReportSlice.actions.RlistTestDetails(listTestDetails));
      dispatch(ProgressReportSlice.actions.RlistSubjectIdDetails(listSubjectIdDetails));
      dispatch(ProgressReportSlice.actions.RListSchoolWiseTestNameDetail(ListSchoolWiseTestNameDetail));
      dispatch(ProgressReportSlice.actions.RlistTestidDetails(listTestidDetails));
      dispatch(ProgressReportSlice.actions.RListSubjectidDetails(ListSubjectidDetails));
      dispatch(ProgressReportSlice.actions.RListTestTypeIdDetails(ListTestTypeIdDetails));
      dispatch(ProgressReportSlice.actions.RListMarkssDetails(ListMarkssDetails));
      dispatch(ProgressReportSlice.actions.RListDisplayNameDetails(ListDisplayNameDetails));
    };


export const CDAGetPassedAcademicYears =
  (data: IGetPassedAcademicYearsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressReport.GetPassedAcademicYears(data)
      console.log(response.data, "response.data  ");

      dispatch(ProgressReportSlice.actions.RGetPassedAcademicYears(response.data));


    };


    export const CDAGetAllMarksGradeConfiguration =
  (data: IGetAllMarksGradeConfigurationBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressReport.GetAllMarksGradeConfiguration(data)
      let listGradeDetailss = response.data.listGradeDetailss.map((item, i) => {
        return {
          Text1: `${item.Starting_Marks_Range} - ${item.Ending_Marks_Range}`,
          Text2: item.Grade_Name,
          Text3: item.Remarks,

        };
      });

      dispatch(ProgressReportSlice.actions.RGetAllMarksGradeConfiguration(listGradeDetailss));


    };

    export const CDAGetAllMarksGradeConfiguration1 =
    (data: IGetAllMarksGradeConfigurationBody): AppThunk =>
      async (dispatch) => {
        const response = await ApiProgressReport.GetAllMarksGradeConfiguration(data)
        let listGradeDetailss = response.data.listGradeDetailss.map((item, i) => {
          return {
            Text1: `${item.Starting_Marks_Range} - ${item.Ending_Marks_Range}`,
            Text2: item.Grade_Name,
            Text3: item.Remarks,
  
          };
        });
        dispatch(ProgressReportSlice.actions.RGetAllMarksGradeConfiguration1(listGradeDetailss));
  
  
      };




export default ProgressReportSlice.reducer;
