import { createSlice } from "@reduxjs/toolkit";
import colors from "react-multi-date-picker/plugins/colors";
import ApiProgressReport from "src/api/ProgressReport/ApiProgressReport";
import { GetIsPrePrimaryBody, GetSchoolSettingsBody,IGetTeachersForPrePrimaryProgressReportBody, IGetLatestExamIdBody,IGetAcademicYearsOfStudentBody, IGetAllMarksGradeConfigurationBody, IGetAllStudentsProgressSheetBody, IGetClassTeachersBody, IgetIsFinalResultPublishedBody, IgetIsTermExamPublishedBody, IGetOldStudentDetailsBody, IGetPassedAcademicYearsBody, IGetPrePrimaryExamPublishStatusBody, IGetSchoolSettingValuesBody, IGetStudentNameDropdownBody, IProgressReportBody, IsGradingStandarBody, IsTestPublishedForStdDivBody, IsTestPublishedForStudentBody, IStudentProgressReportBody, IIsXseedApplicableBody } from "src/interfaces/ProgressReport/IprogressReport";

import { AppThunk } from "src/store";

const ProgressReportSlice = createSlice({
  name: 'ProgressReport',
  initialState: {
    ISGetClassTeachers: [],
    ISEntireDataList: [],
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
    ISThirdHeaderColumn: [],
    ISListDisplayNameDetails: [],
    ISGetPassedAcademicYears: [],
    ISGetAllMarksGradeConfiguration: [],
    ISGetAllMarksGradeConfiguration1: [],
    IsGradingStandarBodyIS: {},
    IsTestPublishedForStdDivBodyIS: {},
    RIsTestPublishedForStudentIS: {},
    IsGetSchoolSettings: null,
    Loading: false,
    MarkDetailsList: [],
    HeaderArray: [],
    SubHeaderArray: [],
    MarkDetailsList1: [],
    HeaderArray1: [],
    SubHeaderArray1: [],
    AllStudentsProgressSheet: null,
    IsAcademicYearsOfStudent: [],
    ISGetOldStudentDetails: {},
    SchoolSettingValues: [],
    GetTerms: {},
    ProgressReportDownload: null,
    IsPrePrimary: false,
    ISPrePrimaryExamPublishStatus: {},
    ISgetIsTermExamPublished: null,
    ISgetIsFinalResultPublished: null,
    ISLatestExamId:null,
    ISLatestExamId1:null,
    ISGetTeachersForPrePrimaryProgressReport:[],
    IsXseedApplicable:null,
    ISErrorMessage:"",


  },
  reducers: {
    ShowData(state, action) {
      state.Loading = false;
      state.MarkDetailsList = action.payload;
    },
    REntireDataList(state, action) {
      state.ISEntireDataList = action.payload;
    },
    ShowHeader(state, action) {
      state.Loading = false;
      state.HeaderArray = action.payload;
    },
    ShowSubHeader(state, action) {
      state.Loading = false;
      state.SubHeaderArray = action.payload;
    },
    RThirdHeaderColumn(state, action) {
      state.ISThirdHeaderColumn = action.payload;
    },
    ShowData1(state, action) {
      state.Loading = false;
      state.MarkDetailsList1 = action.payload;
    },
    ShowHeader1(state, action) {
      state.Loading = false;
      state.HeaderArray1 = action.payload;
    },
    ShowSubHeader1(state, action) {
      state.Loading = false;
      state.SubHeaderArray1 = action.payload;
    },

    RGetClassTeachers(state, action) {
      state.ISGetClassTeachers = action.payload;
    },
    RGetStudentNameDropdown(state, action) {
      state.ISGetStudentNameDropdown = action.payload;
    },
    RStudentProgressReport(state, action) {
      state.Loading = false;
      state.ISStudentProgressReport = action.payload;
    },
    GetAllStudentsProgressSheet(state, action) {
      state.Loading = false;
      state.AllStudentsProgressSheet = action.payload;
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
    RErrorMessage(state, action) {
      state.ISErrorMessage = action.payload;
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
      state.Loading = false;
      state.ISGetAllMarksGradeConfiguration = action.payload;
    },

    RGetAllMarksGradeConfiguration1(state, action) {
      state.Loading = false;
      state.ISGetAllMarksGradeConfiguration1 = action.payload;
    },


    RIsGradingStandard(state, action) {
      state.Loading = false;
      state.IsGradingStandarBodyIS = action.payload;
    },
    RTestPublishedForStdDivBody(state, action) {
      state.IsTestPublishedForStdDivBodyIS = action.payload;
    },
    RIsTestPublishedForStudent(state, action) {
      state.RIsTestPublishedForStudentIS = action.payload;
    },
    RGetSchoolSettings(state, action) {
      state.Loading = false;
      state.IsGetSchoolSettings = action.payload;
    },

    RresetGetSchoolSettings(state) {
      state.IsGetSchoolSettings = {};
    },
    RAcademicYearsOfStudent(state, action) {
      state.Loading = false;
      state.IsAcademicYearsOfStudent = action.payload;
    },

    RgetOldStudentDetails(state, action) {
      state.Loading = false;
      state.ISGetOldStudentDetails = action.payload;
    },

    getSchoolSettingValues(state, action) {
      state.Loading = false;
      state.SchoolSettingValues = action.payload;
    },
    RGetTerms(state, action) {
      state.Loading = false;
      state.GetTerms = action.payload;
    },
    getProgressReport(state, action) {
      state.Loading = false;
      state.ProgressReportDownload = action.payload;
    },
    RGetIsPrePrimary(state, action) {
      state.Loading = false;
      state.IsPrePrimary = action.payload;
    },
    RGetPrePrimaryExamPublishStatus(state, action) {
      state.Loading = false;
      state.ISPrePrimaryExamPublishStatus = action.payload;
    },

    RgetIsTermExamPublished(state, action) {
      state.Loading = false;
      state.ISgetIsTermExamPublished = action.payload;
    },

    
    RLatestExamId(state, action) {
      state.Loading = false;
      state.ISLatestExamId = action.payload;
    },
    
     RLatestExamId1(state, action) {
      state.Loading = false;
      state.ISLatestExamId1 = action.payload;
    },

    RGetTeachersForPrePrimaryProgressReport(state, action) {
      state.Loading = false;
      state.ISGetTeachersForPrePrimaryProgressReport = action.payload;
    },

    
    RgetIsFinalResultPublished(state, action) {
      state.Loading = false;
      state.ISgetIsFinalResultPublished = action.payload;
    },
    resetProgressReportFileName(state) {
      state.ProgressReportDownload = null;

    },
    RIsXseedApplicable(state, action) {
      state.Loading = false;
      state.IsXseedApplicable = action.payload;
    },

    



    setLoading(state) {
      state.Loading = true;
    }
  }
});

export const CDAGetClassTeachers =
  (data: IGetClassTeachersBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiProgressReport.GetClassTeachers(data);
      let ClassTeachersList = [{ Id: '0', Name: 'Select', Value: '0', NewValue: '0', asStandardId: '0' }];
      response.data.map((item, i) => {
        ClassTeachersList.push({
          Id: item.SchoolWise_Standard_Division_Id,
          Name: item.TeacherName,
          Value: item.Teacher_Id,
          NewValue: item.Teacher_Id,
          asStandardId: item.Standard_Id
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



export const GetAllStudentsProgressSheet =
  (data: IGetAllStudentsProgressSheetBody): AppThunk =>
    async (dispatch, getState) => {
      dispatch(ProgressReportSlice.actions.setLoading());
      const response = await ApiProgressReport.GetAllStudentsProgressSheet(data);
      dispatch(ProgressReportSlice.actions.GetAllStudentsProgressSheet(response.data));
    }
export const CDAStudentProgressReport =
  (data: IStudentProgressReportBody, IsGradingStandardFlag, totalCount, isFailCriteria): AppThunk =>
    async (dispatch, getState) => {
      dispatch(ProgressReportSlice.actions.setLoading());
      const response = await ApiProgressReport.StudentProgressReport(data); // dataList2; //
      dispatch(ProgressReportSlice.actions.REntireDataList(response.data));
      const { IsGradingStandarBodyIS } = getState().ProgressReportNew;

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
          Standard_Division_Id: item.Standard_Division_Id,
          IsFailCriteriaNotApplicable: item.IsFailCriteriaNotApplicable

        };
      });
      let listSubjectsDetails = response.data.listSubjectsDetails
      const getListDisplayName = (cell) => {
        let returnVal: any = ""

        if (cell.Is_Absent === "N") {

          if (response.data?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true') {
            returnVal = cell.Grade
          } else {
            returnVal = parseFloat(cell.Marks_Scored)
          }
        }
        else {
          response.data.ListDisplayNameDetails.map((Item) => {
            if (Item.ShortName === cell.Is_Absent)
              returnVal = Item.DisplayName
          })
        }
        return returnVal
      }


      const getListDisplayName1 = (cell) => {
        let returnVal = ""

        if (cell.Is_Absent == "N") {
          returnVal = cell.Grade
        }
        else {
          response.data.ListDisplayNameDetails.map((Item) => {
            if (Item.ShortName == cell.Is_Absent)
              returnVal = Item.DisplayName
          })
        }
        return returnVal
      }

      const getMatch = (TestId, SubjectId, TestTypeId) => {
        let returnVal = null
        response.data.listSubjectIdDetails.map((Item) => {
          if (Item.Original_SchoolWise_Test_Id === TestId &&
            Item.Subject_Id === SubjectId &&
            Item.TestType_Id === TestTypeId

          ) {
            returnVal = Item
          }
        })
        return returnVal
      }
      const getParentHeader = (listSubjectsDetails, Subject, TestId) => {
        let returnVal = ""
        let colsPan = 0
        if (Subject.Parent_Subject_Id != '0') {
          colsPan = listSubjectsDetails.filter((obj) => { return obj.Parent_Subject_Id == Subject.Parent_Subject_Id }).length

          response.data.listTestidDetails
            .filter((obj) => { return obj.Test_Id == TestId && obj.Parent_Subject_Id == Subject.Parent_Subject_Id })
            .map((Item) => {
              returnVal = Item.Parent_Subject_Name
            })
        }
        return { parent: returnVal, colsPan: colsPan }
      }
      function subIdDetailsLength(subId) {
        let result = response.data.ListSubjectidDetails.filter((item) => item.Subject_Id === subId).length;
        return result
      }


      let rows = []
      let HeaderArray = []
      let SubHeaderArray = []
      let HeaderCount = 0
      let countOne = 0
      let Arraytemp = [];
      // listTestDetails []
      // list1 = []
      function findCellValue(list, psId, testTypeId, testId) {
        let filter1 = list.filter(item => {
          return item.Parent_Subject_Id == psId &&
            item.TestType_Id == testTypeId &&
            item.Test_Id == testId;  // Use loose equality (==)
        });
        if (filter1.length >= 1) {
          return parseFloat(filter1[0].TestType_Total_Marks); // Correct property name
        }

        return '-';
      }
      function findCellValue1(list, psId, testTypeId, testId) {
        let filter1 = list.filter(item => {
          return item.Parent_Subject_Id == psId &&
            item.TestType_Id == testTypeId &&
            item.Test_Id == testId;  // Use loose equality (==)
        });
        if (filter1.length >= 1) {
          return parseFloat(filter1[0].TestType_Total_Marks_Scored); // Correct property name
        }

        return '-';
      }
      response.data.listTestDetails
        .filter(item => item.Test_Id !== `-1`)
        .map((Test, TestIndex) => {
          let columns = []
          // list2 = []
          let SubjectArray = response.data.listSubjectsDetails;
          response.data.listSubjectsDetails.map((Subject, SubjectIndex) => {
            HeaderCount = 0
            // list3 = []
            let arrTemp = response.data.ListSubjectidDetails
              .filter((obj) => { return obj.Subject_Id === Subject.Subject_Id })
            // f() to control visibility of Test Type Columns
            function showTestTypeDetails() {
              let flag = false;
              if (subIdDetailsLength(Subject.Subject_Id) === 1 && data.IsTotalConsiderForProgressReport.toLowerCase() === 'true') {
                return false;
              } else if (subIdDetailsLength(Subject.Subject_Id) === 1 && data.IsTotalConsiderForProgressReport.toLowerCase() === 'false') {
                return true;
              } else if (subIdDetailsLength(Subject.Subject_Id) > 1 && data.IsTotalConsiderForProgressReport.toLowerCase() === 'true') {
                return true;
              } else if (subIdDetailsLength(Subject.Subject_Id) > 1 && data.IsTotalConsiderForProgressReport.toLowerCase() === 'false') {
                return true;
              }
            }
            Arraytemp = arrTemp;
            let TestTypeCount = arrTemp.length;
            let temp = "";
            let totalMarks = null;

            arrTemp.map((TestType, TestTypeIndex) => {
              // if (TestType.Subject_Id == "2397")

              HeaderCount += 1
              let cell = getMatch(Test.Original_SchoolWise_Test_Id, Subject.Subject_Id, TestType.TestType_Id)
              if (showTestTypeDetails()) {  // 3 > !==1
                // Flag > 🚩
                // let Flag = SubjectArray[SubjectIndex].Parent_Subject_Id !== '0' && SubjectArray[SubjectIndex + 1].Parent_Subject_Id === '0' ? true : false;
                if (SubjectArray[SubjectIndex].Parent_Subject_Id === '0') {
                  // if (cell.Grade_Or_Marks.trim().toLowerCase() === 'g') {
                  //   returnVal = cell.Grade
                  // } else {
                  columns.push({
                    MarksScored: cell ? `${getListDisplayName(cell)}` : "-",
                    TotalMarks: cell ? cell.Is_Absent == "N" ? response.data?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true' ? cell.Grade : parseFloat(cell.TestType_Total_Marks) : "" : "-",
                    IsAbsent: cell ? cell.Is_Absent : "N"
                  })
                } else if (SubjectArray[SubjectIndex].Parent_Subject_Id !== '0') {
                  columns.push({
                    MarksScored: cell ? `${getListDisplayName(cell)}` : "-",
                    TotalMarks: cell ? cell.Is_Absent == "N" ? response.data?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true' ? cell.Grade : parseFloat(cell.TestType_Total_Marks) : "" : "-",
                    IsAbsent: cell ? cell.Is_Absent : "N"
                  })
                }
                //#region  check
              }

              if (TestIndex == 0) {
                SubHeaderArray.push({
                  TestTypeName: (data.IsTotalConsiderForProgressReport.toLowerCase() === "true" && TestTypeCount == 1)
                    ? "Total" : TestType.ShortenTestType_Name
                })
              }

              if (cell && (temp !== (Subject.Subject_Id + "--" + Test.Test_Id))) {
                temp = Subject.Subject_Id + "--" + Test.Test_Id
                // Flag 🟥 
                // Helper function to handle grade or marks
                const getGradeOrMarks = (cell, isGrade, totalGrade) => {
                  if (!cell) return "-";
                  return isGrade ? `${totalGrade}` : `${parseFloat(cell.Total_Marks_Scored)}`;
                };

                // Main calculation function
                const calculateTotalMarks = (data, Subject, cell) => {
                  if (!cell) {
                    return {
                      MarksScored: " ",
                      TotalMarks: "-",
                      IsAbsent: "N"
                    };
                  }

                  const isConsiderForReport = data.IsTotalConsiderForProgressReport.toLowerCase() === "true";
                  const isSingleSubject = subIdDetailsLength(Subject.Subject_Id) === 1;
                  const isGradeFormat = response.data?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true'

                  // Determine marks or grade based on conditions
                  const marksScored = isConsiderForReport && isSingleSubject
                    ? isGradeFormat ? `${cell.TotalGrade}` : `${parseFloat(cell.Total_Marks_Scored)}`
                    : getGradeOrMarks(cell, isGradeFormat, cell.TotalGrade);

                  const totalMarks = isConsiderForReport && isSingleSubject
                    ? isGradeFormat ? `${cell.TotalGrade}` : `${parseFloat(cell.Subject_Total_Marks)}`
                    : isGradeFormat ? `${cell.TotalGrade}` : cell.Subject_Total_Marks;

                  return {
                    MarksScored: marksScored,
                    TotalMarks: totalMarks,
                    IsAbsent: cell.Is_Absent
                  };
                };

                // Usage
                totalMarks = calculateTotalMarks(data, Subject, cell);
                const isConsideredForReport = data.IsTotalConsiderForProgressReport.toLowerCase() === "true";
                const isSingleSubject = subIdDetailsLength(Subject.Subject_Id) === 1;
                const isGrade = cell?.Grade_Or_Marks?.trim().toLowerCase() === 'g';


              }

              if (TestTypeIndex == TestTypeCount - 1 && data.IsTotalConsiderForProgressReport.toLowerCase() == "true") {
                columns.push(totalMarks);
              }

              if (SubjectArray[SubjectIndex].Parent_Subject_Id !== '0' && SubjectArray[SubjectIndex + 1].Parent_Subject_Id === '0' && TestTypeIndex === arrTemp.length - 1) {
                // response.data.ListTestTypeIdDetails.map((list1, i1) => {
                // response.data.Listtestid2Details.map((list2, i2) => {
                // if (list2.Test_Id !== '-1') {
                // if (list2.Test_Id === Test.Test_Id && list2.TestType_Id === list1.TestType_Id && list2.Parent_Subject_Id === SubjectArray[SubjectIndex].Parent_Subject_Id) {
                response.data.ListTestTypeIdDetails.map((itemArr) => {
                  columns.push({
                    MarksScored: findCellValue1(response.data.Listtestid2Details, SubjectArray[SubjectIndex].Parent_Subject_Id, itemArr.TestType_Id, Test.Test_Id), //list2.TestType_Total_Marks,
                    //  function findIts(list, psId, testTypeId, testId) {
                    TotalMarks: findCellValue(response.data.Listtestid2Details, SubjectArray[SubjectIndex].Parent_Subject_Id, itemArr.TestType_Id, Test.Test_Id),
                    IsAbsent: "N"
                  })
                })
                // }
                // }
                // })
                // })
                if (data.IsTotalConsiderForProgressReport.toLowerCase() == "true") {
                  let isDataPushed = false;

                  response.data.listTestidDetails.map((Item) => {
                    // Check if the IDs match and data has not been pushed yet
                    if (Item.Test_Id === Test.Test_Id && !isDataPushed) {
                      // const insertIndex = columns.length > 0 ? columns.length - (testTypeLength + 1) : 0;
                      columns.push({
                        MarksScored: `${parseFloat(Item.Total_Marks_Scored)}`,
                        TotalMarks: `${Item.ChildSubject_Marks_Total}`,
                        IsAbsent: "N",
                      });

                      isDataPushed = true;
                    }
                  });
                }
              }



            })


            if (TestIndex == 0) {
              if (HeaderCount > 1) {
                SubHeaderArray.push({ TestTypeName: "Total" })

              }
              HeaderArray.push({
                SubjectName: Subject.Subject_Name,
                colSpan: HeaderCount > 1 ? HeaderCount + 1 : HeaderCount,
                ParentSubjectId: Subject.Parent_Subject_Id,
                ParentSubjectName: getParentHeader(listSubjectsDetails, Subject, Test.Test_Id).parent,
              })
            }
            if (Subject.Is_CoCurricularActivity === 'True') {
              let valArr = response.data.listSubjectIdDetails.filter(item => item.Original_SchoolWise_Test_Id === Test.Original_SchoolWise_Test_Id && item.Is_CoCurricularActivity.toLowerCase() === 'true' && item.Subject_Id === Subject.Subject_Id)
              // let data = response.data.listSubjectIdDetails.filter((item) => )
              function showGradeHeader(subId) {
                let flag = true;
                let filter = [];
                filter = response?.data?.ListSubjectidDetails?.filter((item) => item.Subject_Id === subId)
                if (filter?.length > 0) {
                  flag = false;
                }
                return flag;
              }
              if (response.data?.listStudentsDetails[0]?.ShowOnlyGrades.trim() === 'true' && showGradeHeader(Subject.Subject_Id)) {
                columns.push({
                  MarksScored: valArr.length > 0 ? `${valArr[0].Marks}` : '-',
                  TotalMarks: "-",
                  IsAbsent: "N"
                })
              } else if (showGradeHeader(Subject.Subject_Id)) {
                columns.push({
                  MarksScored: valArr.length > 0 ? `${valArr[0].Marks}` : '-',
                  TotalMarks: "-",
                  IsAbsent: "N"
                })
              }
            }
          })


          const matchingTestId = response.data.Listtestid2Details.find(testDetail =>
            testDetail.Test_Id
          )?.Test_Id;

          // Find the matching test in listTestDetails
          const matchingTest = response.data.listTestDetails.find(item =>
            Number(item.Test_Id) === Number(matchingTestId)
          );

          // Find the matching TestType_Id from Listtestid2Details
          const matchingTestType_Id = response.data.Listtestid2Details.find(testDetail =>
            testDetail.TestType_Id
          )?.TestType_Id;

          // Find the matching test type in ListTestTypeIdDetails
          const matchingTestType = response.data.ListTestTypeIdDetails.find(item =>
            Number(item.TestType_Id) === Number(matchingTestType_Id)
          );

          // Ensure matchingTest and matchingTestType exist before using them
          if (matchingTest && matchingTestType) {
            // Add the TestTypeName to SubHeaderArray
            SubHeaderArray.push({ TestTypeName: matchingTestType.ShortenTestType_Name });

            // Find the matching test detail from Listtestid2Details
            const matchingTestDetail = response.data.Listtestid2Details.find(testDetail =>
              Number(testDetail.Test_Id) === Number(matchingTestId)
            );

            // if (matchingTestDetail) {
            //   // Push columns data for the matching test detail
            //   columns.push({
            //     MarksScored: `${matchingTestDetail.TestType_Total_Marks_Scored}/${matchingTestDetail.TestType_Total_Marks}`,
            //     TotalMarks: "-",
            //     IsAbsent: "N"
            //   });
            // }
          }




          //show grade column
          if (data.IsTotalConsiderForProgressReport.toLowerCase() === "true") {
            response.data.ListSchoolWiseTestNameDetail.map((Item) => {
              let testTypeLength = response.data.ListTestTypeIdDetails.length;
              if (Item.SchoolWise_Test_Id == Test.Test_Id) {
                let isDataPushed = false; // Flag to track if data has been pushed

                // response.data.listTestidDetails.map((Item) => {
                //   // Check if the IDs match and data has not been pushed yet
                //   if (Item.Test_Id === Test.Test_Id && !isDataPushed) {
                //     const insertIndex = columns.length > 0 ? columns.length - (testTypeLength + 1) : 0;
                //     columns.splice(insertIndex, 0, {
                //       MarksScored: `${parseFloat(Item.Total_Marks_Scored)}`,
                //       TotalMarks: Item.ChildSubject_Marks_Total,
                //       IsAbsent: "N",
                //     });

                //     isDataPushed = true;
                //   }
                // });



                const matchingMarksDetails = response.data.ListMarkssDetails.find(
                  (marksItem) => marksItem.Marks_Grades_Configuration_Detail_ID === Item.Grade_id
                );

                if (response.data?.listStudentsDetails[0]?.ShowOnlyGrades.trim() !== 'true') {
                  columns.push({
                    MarksScored: Item.FailCount !== '' ? `${parseFloat(Item.Total_Marks_Scored)}` : '',
                    TotalMarks: Item.Subjects_Total_Marks,
                    IsAbsent: "N",
                    IsGrades: "Y"
                  })

                  columns.push({
                    MarksScored: Item.FailCount !== '' ? Item.Percentage + "%" : '-',
                    TotalMarks: "-",
                    IsAbsent: "N",
                    IsGrades: "Y"
                  })
                }
                columns.push({
                  MarksScored: Item.FailCount !== '' && Item.Grade_Name !== '-99'
                    ? `${Item.Grade_Name} [${matchingMarksDetails?.Remarks}]`
                    : '-',
                  TotalMarks: "-",
                  IsAbsent: "N",
                  IsGrades: "Y"
                })
              }
            })
          }
          // 🔗
          if (true) {
            response.data.ListSchoolWiseTestNameDetail.map((Item) => {
              let testTypeLength = response.data.ListTestTypeIdDetails.length;
              if (Item.SchoolWise_Test_Id == Test.Test_Id) {
                let isDataPushed = false; // Flag to track if data has been pushed
                const matchingMarksDetails = response.data.ListMarkssDetails.find(
                  (marksItem) => marksItem.Marks_Grades_Configuration_Detail_ID === Item.Grade_id
                );
                if (isFailCriteria === 'N' && data.IsTotalConsiderForProgressReport.toLowerCase() === 'true') {
                  columns.push({
                    MarksScored: Item.Result.trim(),
                    TotalMarks: "-",
                    IsAbsent: "N",
                    IsGrades: "Y",
                    Result: Item.Result.trim(),
                    Rank: Item.rank
                  })
                }
                if (totalCount !== '0' && data.IsTotalConsiderForProgressReport.toLowerCase() === 'true') {
                  columns.push({
                    MarksScored: Item.rank.trim().includes('999') ? '-' : Item.rank.trim(),
                    TotalMarks: "-",
                    IsAbsent: "N",
                    IsGrades: "Y",
                    Result: Item.Result.trim(),
                    Rank: Item.rank
                  })
                }
              }
            })
          }
          // response.data.ListSchoolWiseTestNameDetail.map((Item) => {
          //   columns.push({
          //     MarksScored: Item.Result.trim(),
          //     TotalMarks: "-",
          //     IsAbsent: "N",
          //     IsGrades: "Y",
          //     Result: Item.Result.trim(),
          //     Rank: Item.rank
          //   })
          //   columns.push({
          //     MarksScored: Item.rank.trim(),
          //     TotalMarks: "-",
          //     IsAbsent: "N",
          //     IsGrades: "Y",
          //     Result: Item.Result.trim(),
          //     Rank: Item.rank
          //   })
          // })

          // }
          rows.push({
            TestName: Test.Test_Name,
            MarksArr: columns
          })
        })
      //show grade column
      if (data.IsTotalConsiderForProgressReport.toLowerCase() == "true") {
        SubHeaderArray.push({ TestTypeName: "Total" })
        SubHeaderArray.push({ TestTypeName: "Total" })
        SubHeaderArray.push({ TestTypeName: "%" })
        SubHeaderArray.push({ TestTypeName: "Grade" })
      }
      //Add subheader for PE Sports
      // SubHeaderArray.push({ TestTypeName: "Grade" })


      //// grade data
      // #region Grade View | Section
      function findTotalGrade(subId, testId) {
        let list1 = response.data.listSubjectIdDetails.filter((item) => item)
      }

      let rows1 = []
      let HeaderArray1 = []
      let SubHeaderArray1 = []
      let HeaderCount1 = 0
      let countOne1 = 0
      response.data.listTestDetails
        .filter(item => Number(item.Test_Id) !== -1)
        .map((Test, TestIndex) => {
          let columns = []
          response.data.listSubjectsDetails.map((Subject) => {
            HeaderCount1 = 0
            let arrTemp = response.data.ListSubjectidDetails
              .filter((obj) => { return obj.Subject_Id == Subject.Subject_Id })


            let TestTypeCount = arrTemp.length
            let temp = ""
            let totalMarks = null
            arrTemp.map((TestType, TestTypeIndex) => {
              // if (TestType.Subject_Id == "2397")

              HeaderCount1 += 1
              let cell = getMatch(Test.Original_SchoolWise_Test_Id, Subject.Subject_Id, TestType.TestType_Id)


              if (TestTypeCount !== 1) {
                columns.push({
                  MarksScored: cell ? `${getListDisplayName1(cell)}` : "-",
                  TotalMarks: cell ? cell.Is_Absent == "N" ? parseFloat(cell.TotalGrade) : "" : "-",
                  IsAbsent: cell ? cell.Is_Absent : "N"
                })
                // 
              }




              if (TestIndex == 0) {
                SubHeaderArray1.push({
                  TestTypeName: (data.IsTotalConsiderForProgressReport.toLowerCase() == "true" && TestTypeCount == 1)
                    ? "Total" : TestType.ShortenTestType_Name
                })
              }

              if (cell && (temp !== (Subject.Subject_Id + "--" + Test.Test_Id))) {
                temp = Subject.Subject_Id + "--" + Test.Test_Id;
                totalMarks = {
                  MarksScored: (data.IsTotalConsiderForProgressReport.toLowerCase() === "true" && TestTypeCount === 1) ? `${cell.Grade}` : `${cell.TotalGrade}`,
                  TotalMarks: (data.IsTotalConsiderForProgressReport.toLowerCase() === "true" && TestTypeCount === 1) ? cell.Grade : "-",
                  IsAbsent: cell ? cell.Is_Absent : "N"
                }
              }
              if (TestTypeCount === 1) {
                columns.push(totalMarks)
              }


            })
            let cell = getMatch(Test.Original_SchoolWise_Test_Id, Subject.Subject_Id, '')
            function showGradeHeader(subId) {
              let flag = true;
              let filter = [];
              filter = response.data?.ListSubjectidDetails?.filter((item) => item.Subject_Id === subId)
              if (filter?.length > 0) {
                flag = false;
              }
              return flag;
            }
            if (showGradeHeader(Subject.Subject_Id)) {
              columns.push({
                MarksScored: cell ? `${getListDisplayName1(cell)}` : "-",
                TotalMarks: cell ? cell.Is_Absent == "N" ? parseFloat(cell.TotalGrade) : "" : "-",
                IsAbsent: cell ? cell.Is_Absent : "N"
              })
            }


            if (TestIndex == 0) {
              if (HeaderCount1 > 1 && data.IsTotalConsiderForProgressReport.toLowerCase() == "true") {
                columns.push(totalMarks)
                SubHeaderArray1.push({ TestTypeName: "Total" })

              }

              HeaderArray1.push({
                SubjectName: Subject.Subject_Name,
                colSpan: HeaderCount1 > 1 ? HeaderCount1 + (data.IsTotalConsiderForProgressReport.toLowerCase() == "true" ? 1 : 0) : HeaderCount1,
                ParentSubjectId: Subject.Parent_Subject_Id,
                ParentSubjectName: getParentHeader(listSubjectsDetails, Subject, Test.Test_Id).parent,
                Is_CoCurricularActivity: Subject.Is_CoCurricularActivity
              })





            }
          })
          //show grade column |  Last Three Columns
          if (data.IsTotalConsiderForProgressReport.toLowerCase() == "true") {
            response.data.ListSchoolWiseTestNameDetail.map((Item) => {

              if (Item.SchoolWise_Test_Id == Test.Test_Id) {
                let isDataPushed = false; // Flag to track if data has been pushed

                // response.data.listTestidDetails.map((Item) => {
                //   // Check if the IDs match and data has not been pushed yet
                //   if (Item.Test_Id === Test.Test_Id && !isDataPushed) {
                //     const insertIndex = columns.length > 0 ? columns.length - 1 : 0;
                //     columns.splice(insertIndex, 0, {
                //       MarksScored: parseFloat(Item.Grade),
                //       TotalMarks: Item.Grade,
                //       IsAbsent: "N",
                //     });

                //     isDataPushed = true;
                //   }
                // });


                const matchingMarksDetails = response.data.ListMarkssDetails.find(
                  (marksItem) => marksItem.Marks_Grades_Configuration_Detail_ID === Item.Grade_id
                );






                columns.push({
                  MarksScored: `${Item.Grade_Name} [${matchingMarksDetails?.Remarks}]`,
                  TotalMarks: "-",
                  IsAbsent: "N"
                })
              }
            })
          }
          if (true) {
            response.data.ListSchoolWiseTestNameDetail.map((Item) => {
              let testTypeLength = response.data.ListTestTypeIdDetails.length;
              if (Item.SchoolWise_Test_Id == Test.Test_Id) {
                let isDataPushed = false; // Flag to track if data has been pushed
                const matchingMarksDetails = response.data.ListMarkssDetails.find(
                  (marksItem) => marksItem.Marks_Grades_Configuration_Detail_ID === Item.Grade_id
                );
                if (isFailCriteria === 'N' && data.IsTotalConsiderForProgressReport.toLowerCase() === 'true') {
                  columns.push({
                    MarksScored: Item.Result.trim() ?  Item.Result.trim() : "-" ,
                    TotalMarks: "-",
                    IsAbsent: "N",
                    IsGrades: "Y",
                    Result: Item.Result.trim(),
                    Rank: Item.rank,
                    
                  })
                }
                if (totalCount !== '0' && data.IsTotalConsiderForProgressReport.toLowerCase() === 'true') {
                  columns.push({
                    MarksScored: Item.rank.trim().includes('999') ? '-' : Item.rank.trim(),
                    TotalMarks: "-",
                    IsAbsent: "N",
                    IsGrades: "Y",
                    Result: Item.Result.trim(),
                    Rank: Item.rank
                  })
                }

              }
            })
          }
          // }
          rows1.push({
            TestName: Test.Test_Name,
            MarksArr: columns
          })
        })
      //show grade column
      // if (data.IsTotalConsiderForProgressReport == "True") {

      //   SubHeaderArray1.push({ TestTypeName: "Grade" })
      // }





      let listTestDetailsArr = []
      response.data.listTestDetails
        .filter(item => Number(item.Test_Id) !== -1)
        .map((Tests, TestIndex) => {
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
          //show grade column
          if (data.IsTotalConsiderForProgressReport.toLowerCase() == "true") {
            let tempGrade = response.data.ListSchoolWiseTestNameDetail
              .filter(item => (item.SchoolWise_Test_Id == Tests.Test_Id))
            arr.push({
              SchoolWise_Test_Name: "-",
              Grade: tempGrade.length > 0 ? tempGrade[0].Grade_Name : "-"
            })
          }
          listTestDetailsArr.push({
            Test_Id: Tests.Test_Id,
            Test_Name: Tests.Test_Name,
            subjectIdArr: arr
          })

        });


      let listTestDetailsArr1 = []
      // response.data.listTestDetails
      //   .filter(item => Number(item.Test_Id) !== -1)
      //   .map(Tests => {
      //     let arr = []
      //     response.data.listSubjectsDetails.map((Subjects, i) => {
      //       let temp = response.data.listSubjectIdDetails
      //         .filter(item => (item.Subject_Id == Subjects.Subject_Id &&
      //           item.Original_SchoolWise_Test_Id == Tests.Original_SchoolWise_Test_Id
      //         ))
      //       arr.push({
      //         SchoolWise_Test_Name: temp.length > 0 ? temp[0].SchoolWise_Test_Name : "-",
      //         Grade: temp.length > 0
      //           ? data.IsTotalConsiderForProgressReport == "True"
      //             ? `${parseFloat(temp[0].Total_Marks_Scored)} / ${temp[0].Subject_Total_Marks}`
      //             : `${parseFloat(temp[0].Marks_Scored)} / ${temp[0].TestType_Total_Marks}`
      //           : "-"
      //       });


      //     });
      //     listTestDetailsArr1.push({
      //       Test_Id: Tests.Test_Id,
      //       Test_Name: Tests.Test_Name,
      //       subjectIdArr: arr
      //     })
      //   })








      let listSubjectIdDetails = response.data.listSubjectIdDetails.map((item, i) => {
        return {

          Marks_Scored: item.Marks_Scored,
          Grade: item.Grade

        };
      });
      let ThirdHeaderColumn = response.data.ListSubjectidDetails;

      let ListSchoolWiseTestNameDetail = response.data.ListSchoolWiseTestNameDetail.map((item, i) => {
        return {
          Total: `${parseFloat(item.Total_Marks_Scored)} / ${item.Subjects_Total_Marks}`,
          Percentage: item.Percentage,
          Grade_Name: item.Grade_Name,
          SchoolWise_Test_Id: item.SchoolWise_Test_Id,
          Grade_id: item.Grade_id
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
      //show grade column
      if (data.IsTotalConsiderForProgressReport.toLowerCase() == "true") {
        ListSubjectidDetails.push({
          Subject_Id: "-1",
          ShortenTestType_Name: "Grade",
        })
      }
      let ListTestTypeIdDetails = response.data.ListTestTypeIdDetails.map((item, i) => {
        return {
          Id: item.TestType_Name,
          Text1: item.TestTypeSort_Order,
          Text2: item.ShortenTestType_Name
        };
      });

      let ListMarkssDetails = response.data.ListMarkssDetails.map((item, i) => {
        return {
          Text1: '',
          Text2: item.Grade_Name,
          Remarks: item.Remarks,
          IsForCoCurricularSubjects: item.IsForCoCurricularSubjects,
          Marks_Grades_Configuration_Detail_ID: item.Marks_Grades_Configuration_Detail_ID
        };
      });




      let ListDisplayNameDetails = response.data.ListDisplayNameDetails.map((item, i) => {
        return {
          Id: item.DisplayValue,
          Text1: item.DisplayName

        };
      });

      let ErrorMessage = response.data.ErrorMessage
      

      let listTestDetails = []

      dispatch(ProgressReportSlice.actions.ShowHeader(HeaderArray));
      dispatch(ProgressReportSlice.actions.ShowSubHeader(SubHeaderArray));
      dispatch(ProgressReportSlice.actions.ShowData(rows));

      1
      dispatch(ProgressReportSlice.actions.ShowHeader1(HeaderArray1));
      dispatch(ProgressReportSlice.actions.ShowSubHeader1(SubHeaderArray1));
      dispatch(ProgressReportSlice.actions.ShowData1(rows1));


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
      // RThirdHeaderColumn
      dispatch(ProgressReportSlice.actions.RThirdHeaderColumn(ThirdHeaderColumn));
      dispatch(ProgressReportSlice.actions.RErrorMessage(response.data.ErrorMessage));
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
      dispatch(ProgressReportSlice.actions.setLoading());
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
      dispatch(ProgressReportSlice.actions.setLoading());
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
      dispatch(ProgressReportSlice.actions.setLoading());
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
      dispatch(ProgressReportSlice.actions.setLoading());
      const response = await ApiProgressReport.GetSchoolSettings(data)

      dispatch(ProgressReportSlice.actions.RGetSchoolSettings(response.data));


    };

export const CDAresetGetSchoolSettings =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(ProgressReportSlice.actions.RresetGetSchoolSettings());// Dispatching action to reset the message
    };

export const CDAGetAcademicYearsOfStudent =
  (data: IGetAcademicYearsOfStudentBody): AppThunk =>
    async (dispatch) => {
      dispatch(ProgressReportSlice.actions.setLoading());
      const response = await ApiProgressReport.GetAcademicYearsOfStudent(data);

      const AcademicYearsOfStudent = response.data.GetAcademicYears.map((item) => ({
        Id: item.Id,
        Name: item.AcademicYear,
        Value: item.Id,
      }));
      const GetTerms = response.data.GetTerms.map((item) => ({
        Id: item.Id,
        TermName: item.TermName

      }));



      dispatch(ProgressReportSlice.actions.RAcademicYearsOfStudent(AcademicYearsOfStudent));
      dispatch(ProgressReportSlice.actions.RGetTerms(GetTerms));
    };


export const CDAgetOldstudentDetails =
  (data: IGetOldStudentDetailsBody): AppThunk =>
    async (dispatch) => {
      dispatch(ProgressReportSlice.actions.setLoading());
      const response = await ApiProgressReport.GetOldStudentDetails(data);
      dispatch(ProgressReportSlice.actions.RgetOldStudentDetails(response.data?.OldStudentDetails));
    };


export const GetSchoolSettingValues =
  (data: IGetSchoolSettingValuesBody): AppThunk =>
    async (dispatch) => {
      dispatch(ProgressReportSlice.actions.setLoading());
      const response = await ApiProgressReport.GetSchoolSettingValues(data);
      dispatch(ProgressReportSlice.actions.getSchoolSettingValues(response.data));
    };


export const CDAGetProgressReport =
  (data: IProgressReportBody): AppThunk =>
    async (dispatch) => {
      dispatch(ProgressReportSlice.actions.setLoading());
      const response = await ApiProgressReport.GetProgressReport(data);
      dispatch(ProgressReportSlice.actions.getProgressReport(response.data));
    };

export const resetProgressReportFileName =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(ProgressReportSlice.actions.resetProgressReportFileName());
    };

export const CDAGetIsPrePrimary =
  (data: GetIsPrePrimaryBody): AppThunk =>
    async (dispatch) => {
      dispatch(ProgressReportSlice.actions.setLoading());
      const response = await ApiProgressReport.GetIsPrePrimary(data);
      dispatch(ProgressReportSlice.actions.RGetIsPrePrimary(response.data));
    };

export const CDAGetPrePrimaryExamPublishStatus =
  (data: IGetPrePrimaryExamPublishStatusBody): AppThunk =>
    async (dispatch) => {
      dispatch(ProgressReportSlice.actions.setLoading());
      const response = await ApiProgressReport.GetPrePrimaryExamPublishStatus(data);
      dispatch(ProgressReportSlice.actions.RGetPrePrimaryExamPublishStatus(response.data.DownloadButtonStateDetailsResult));
    };


export const CDAgetIsTermExamPublished =
  (data: IgetIsTermExamPublishedBody): AppThunk =>
    async (dispatch) => {
      dispatch(ProgressReportSlice.actions.setLoading());
      const response = await ApiProgressReport.getIsTermExamPublished(data);
      dispatch(ProgressReportSlice.actions.RgetIsTermExamPublished(response.data));
    };


export const CDAgetIsFinalResultPublished =
  (data: IgetIsFinalResultPublishedBody): AppThunk =>
    async (dispatch) => {
      dispatch(ProgressReportSlice.actions.setLoading());
      const response = await ApiProgressReport.getIsFinalResultPublished(data);
      dispatch(ProgressReportSlice.actions.RgetIsFinalResultPublished(response.data));
    };


    export const CDAGetLatestExamId =
  (data: IGetLatestExamIdBody): AppThunk =>
    async (dispatch) => {
      dispatch(ProgressReportSlice.actions.setLoading());
      const response = await ApiProgressReport.GetLatestExamId(data);
      dispatch(ProgressReportSlice.actions.RLatestExamId(response.data));
    };

    export const CDAGetLatestExamId1 =
    (data: IGetLatestExamIdBody): AppThunk =>
      async (dispatch) => {
        dispatch(ProgressReportSlice.actions.setLoading());
        const response = await ApiProgressReport.GetLatestExamId(data);
        dispatch(ProgressReportSlice.actions.RLatestExamId1(response.data));
      };


      export const CDAGetTeachersForPrePrimaryProgressReport =
      (data: IGetTeachersForPrePrimaryProgressReportBody): AppThunk =>
        async (dispatch) => {
          dispatch(ProgressReportSlice.actions.setLoading());
          const response = await ApiProgressReport.ApiGetTeachersForPrePrimaryProgressReport(data);
          dispatch(ProgressReportSlice.actions.RGetTeachersForPrePrimaryProgressReport(response.data));
        };

        export const CDAIsXseedApplicable =
        (data: IIsXseedApplicableBody): AppThunk =>
          async (dispatch) => {
            dispatch(ProgressReportSlice.actions.setLoading());
            const response = await ApiProgressReport.IsXseedApplicable(data);
            dispatch(ProgressReportSlice.actions.RIsXseedApplicable(response.data));
          };


export default ProgressReportSlice.reducer;
