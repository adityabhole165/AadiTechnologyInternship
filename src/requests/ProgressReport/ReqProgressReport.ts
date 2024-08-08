import { createSlice } from "@reduxjs/toolkit";
import ApiProgressReport from "src/api/ProgressReport/ApiProgressReport";
import { IGetAllMarksGradeConfigurationBody,IsTestPublishedForStudentBody,GetSchoolSettingsBody,IsTestPublishedForStdDivBody, IGetClassTeachersBody, IsGradingStandarBody,IGetPassedAcademicYearsBody, IGetStudentNameDropdownBody, IStudentProgressReportBody } from "src/interfaces/ProgressReport/IprogressReport";

import { AppThunk } from "src/store";

const ProgressReportSlice = createSlice({
  name: 'ProgressReport',
  initialState: {
    ISGetClassTeachers: [],
    ISGetStudentNameDropdown: [],
    ISStudentProgressReport: [],
    ISlistTestDetailsArr: [],
    ISlistTestDetailsArr1: [],
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
    ISGetAllMarksGradeConfiguration: [],
    ISGetAllMarksGradeConfiguration1: [],
    IsGradingStandarBodyIS:{},
    IsTestPublishedForStdDivBodyIS:{},
    RIsTestPublishedForStudentIS:{},
    IsGetSchoolSettings:{}

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

    RlistTestDetailsArr(state, action) {
      state.ISlistTestDetailsArr = action.payload;
    },
     RlistTestDetailsArr1(state, action) {
      state.ISlistTestDetailsArr1 = action.payload;
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

    
    RIsGradingStandard(state, action) {
      state.IsGradingStandarBodyIS = action.payload;
    },
    RTestPublishedForStdDivBody(state, action) {
      state.IsTestPublishedForStdDivBodyIS = action.payload;
    },
    RIsTestPublishedForStudent(state, action) {
      state.RIsTestPublishedForStudentIS = action.payload;
    },
    RGetSchoolSettings(state, action) {
      state.IsGetSchoolSettings = action.payload;
    },

  }
});

export const CDAGetClassTeachers =
  (data: IGetClassTeachersBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressReport.GetClassTeachers(data);
      let ClassTeachersList = [{ Id: '0', Name: 'Select', Value: '0',NewValue:'0',asStandardId:'0' }];
      response.data.map((item, i) => {
        ClassTeachersList.push({
          Id: item.SchoolWise_Standard_Division_Id,
          Name: item.TeacherName,
          Value: item.Teacher_Id,
          NewValue:item.Teacher_Id,
          asStandardId:item.Standard_Id
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
          Value: item.Student_Id,

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
          School_Orgn_Name: item.School_Orgn_Name,
          Standard_Id: item.Standard_Id,
          Standard_Division_Id: item.Standard_Division_Id

        };
      });
      let listSubjectsDetails = response.data.listSubjectsDetails.map((item, i) => {
        return {
            Subject_Id: item.Subject_Id,
            Subject_Name: item.Subject_Name,
            Total_Consideration: item.Total_Consideration
        };
    });
  
      // console.log(response.data.listTestDetails, "Tests",
      //   response.data.listSubjectsDetails, "Subjects",
      //   response.data.listSubjectIdDetails, "ID Details"
      // )
      let listTestDetailsArr = []
      response.data.listTestDetails
        .filter(item => Number(item.Test_Id) !== -1)
        .map(Tests => {
          let arr = []
          response.data.listSubjectsDetails.map((Subjects, i) => {
            let temp = response.data.listSubjectIdDetails
              .filter(item => (item.Subject_Id == Subjects.Subject_Id &&
                item.Original_SchoolWise_Test_Id == Tests.Original_SchoolWise_Test_Id
              ))
            arr.push({
              SchoolWise_Test_Name: temp.length > 0 ? temp[0].SchoolWise_Test_Name : "-",
              Grade: temp.length > 0 ? temp[0].Grade : "-"
            })
          });
          listTestDetailsArr.push({
            Test_Id: Tests.Test_Id,
            Test_Name: Tests.Test_Name,
            subjectIdArr: arr
          })
        });


        let listTestDetailsArr1 = []
        response.data.listTestDetails
          .filter(item => Number(item.Test_Id) !== -1)
          .map(Tests => {
            let arr = []
            response.data.listSubjectsDetails.map((Subjects, i) => {
              let temp = response.data.listSubjectIdDetails
                .filter(item => (item.Subject_Id == Subjects.Subject_Id &&
                  item.Original_SchoolWise_Test_Id == Tests.Original_SchoolWise_Test_Id
                ))
                arr.push({
                  SchoolWise_Test_Name: temp.length > 0 ? temp[0].SchoolWise_Test_Name : "-",
                  Grade: temp.length > 0 ? `${parseInt(temp[0].Marks_Scored)} / ${temp[0].TestType_Total_Marks}` : "-"
                });
                
            });
            listTestDetailsArr1.push({
              Test_Id: Tests.Test_Id,
              Test_Name: Tests.Test_Name,
              subjectIdArr: arr
            })
          });

      let listSubjectIdDetails = response.data.listSubjectIdDetails.map((item, i) => {
        return {

          Marks_Scored: item.Marks_Scored,
          Grade: item.Grade

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

          Subject_Id: item.Subject_Id,
          ShortenTestType_Name: item.ShortenTestType_Name,

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
          IsForCoCurricularSubjects: item.IsForCoCurricularSubjects

        };
      });




      let ListDisplayNameDetails = response.data.ListDisplayNameDetails.map((item, i) => {
        return {
          Id: item.DisplayValue,
          Text1: item.DisplayName

        };
      });
      let listTestDetails = []

      dispatch(ProgressReportSlice.actions.RlistTestDetailsArr(listTestDetailsArr));
      dispatch(ProgressReportSlice.actions.RlistTestDetailsArr1(listTestDetailsArr1));

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

      dispatch(ProgressReportSlice.actions.RGetPassedAcademicYears(response.data));


    };


export const CDAGetAllMarksGradeConfiguration =
  (data: IGetAllMarksGradeConfigurationBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressReport.GetAllMarksGradeConfiguration(data);
      let listGradeDetailss = response.data.listGradeDetailss.map((item, i) => {
        return {
          Text1: `${item.Starting_Marks_Range} - ${item.Ending_Marks_Range}`,
          Text2: item.Grade_Name,
          Text3: item.Remarks,
          Standard_Id: item.Standard_Id
        };
      });

      dispatch(ProgressReportSlice.actions.RGetAllMarksGradeConfiguration(listGradeDetailss));

    };

export const CDAGetAllMarksGradeConfiguration1 =
  (data: IGetAllMarksGradeConfigurationBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressReport.GetAllMarksGradeConfiguration(data);
      let listGradeDetailss = response.data.listGradeDetailss.map((item, i) => {
        return {
          Text1: `${item.Starting_Marks_Range} - ${item.Ending_Marks_Range}`,
          Text2: item.Grade_Name,
          Text3: item.Remarks,
          Standard_Id: item.Standard_Id
        };
      });

      dispatch(ProgressReportSlice.actions.RGetAllMarksGradeConfiguration1(listGradeDetailss));
    };

    export const CDAIsGradingStandard =
  (data: IsGradingStandarBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressReport.IsGradingStandard(data);
      dispatch(ProgressReportSlice.actions.RIsGradingStandard(response.data));
    };     
    export const CDAIsTestPublishedForStdDiv =
    (data: IsTestPublishedForStdDivBody): AppThunk =>
      async (dispatch) => {
        const response = await ApiProgressReport.IsTestPublishedForStdDiv(data);
        dispatch(ProgressReportSlice.actions.RTestPublishedForStdDivBody(response.data));
      };

      export const CDAIsTestPublishedForStudent =
      (data: IsTestPublishedForStudentBody): AppThunk =>
        async (dispatch) => {
          const response = await ApiProgressReport.IsTestPublishedForStudent(data);
          dispatch(ProgressReportSlice.actions.RIsTestPublishedForStudent(response.data));
        };

  export const CDAGetSchoolSettings =
  (data: GetSchoolSettingsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressReport.GetSchoolSettings(data)
    
      dispatch(ProgressReportSlice.actions.RGetSchoolSettings(response.data));


    };

    
      

export default ProgressReportSlice.reducer;
