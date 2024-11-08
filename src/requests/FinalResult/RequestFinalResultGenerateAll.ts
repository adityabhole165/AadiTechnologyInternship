
import { createSlice } from "@reduxjs/toolkit";
import ApiFinalResultGenerateAll from "src/api/FinalResult/ApiFinalResultGenerateAll";
import { IGetGenerateAllStudentBody, IGetStudentPrrogressReportBody, IUpdateStudentTestMarksBody, IViewBody } from "src/interfaces/FinalResult/IFinalResultGenerateAll";
import { AppThunk } from "src/store";



const FinalResultGenerateAllSlice = createSlice({
    name: 'FinalResultGenerateAll',

    initialState: {
        getStudentDetails: [],
        getGenerateAll: '',
        getViewResult: [],
        getSubjectDetails: [],
        getShortenTestDetails: [],
        getTestMarksGA: [],
        getExamDetails: [],
        getTotalPerGradeView: [],
        getPerDetails: [],
        getSubjectDetailsView: [],
        getMarkDetailsView: [],
        getGradesDetailsView: [],
        MarkDetailsList: [],
        UpdateStudentTestMarks: '',
        ListDisplayNameDetails: [],
        HeaderArray: [],
        SubHeaderArray: [],
        EntireDataList: [],
        Loading: true
    },

    reducers: {
        StudentDetails(state, action) {
            state.Loading = false;
            state.getStudentDetails = action.payload;
        },
        ShowData(state, action) {
            state.Loading = false;
            state.MarkDetailsList = action.payload;
        },
        REntireDataList(state, action) {
            state.Loading = false;
            state.EntireDataList = action.payload;
        },
        ShowHeader(state, action) {
            state.Loading = false;
            state.HeaderArray = action.payload;
        },
        ShowSubHeader(state, action) {
            state.Loading = false;
            state.SubHeaderArray = action.payload;
        },
        getListDisplayNameDetails(state, action) {
            state.Loading = false;
            state.ListDisplayNameDetails = action.payload;
        },
        ExamDetails(state, action) {
            state.Loading = false;
            state.getExamDetails = action.payload;
        },
        TestMarksDetails(state, action) {
            state.Loading = false;
            state.getTestMarksGA = action.payload;
        },
        GenerateAll(state, action) {
            state.Loading = false;
            state.getGenerateAll = action.payload;
        },
        resetGenerateAll(state) {
            state.Loading = false;
            state.getGenerateAll = '';
        },
        ViewResult(state, action) {
            state.Loading = false;
            state.getViewResult = action.payload;
        },
        SubjectDetails(state, action) {
            state.Loading = false;
            state.getSubjectDetails = action.payload;
        },
        ShortenTestDetails(state, action) {
            state.Loading = false;
            state.getShortenTestDetails = action.payload;
        },
        MarkDetailsView(state, action) {
            state.Loading = false;
            state.getMarkDetailsView = action.payload;
        },
        GradesDetailsView(state, action) {
            state.Loading = false;
            state.getGradesDetailsView = action.payload;
        },
        SubjectDetailsView(state, action) {
            state.Loading = false;
            state.getSubjectDetailsView = action.payload;
        },
        TotalPerGradeView(state, action) {
            state.Loading = false;
            state.getTotalPerGradeView = action.payload;
        },
        PercentDetails(state, action) {
            state.Loading = false;
            state.getPerDetails = action.payload;
        },
        UpdateStudentTestMarksMSG(state, action) {
            state.Loading = false;
            state.UpdateStudentTestMarks = action.payload;
        },
        resetupdatestudentlist(state) {
            state.UpdateStudentTestMarks = '';
        },
        getLoading(state, action) {
            state.Loading = true;
            state.getStudentDetails = [];
        }
    }

});

export const StudentDetailsGA =
    (data: IGetStudentPrrogressReportBody, data1: string): AppThunk =>
        async (dispatch) => {
            const response = await ApiFinalResultGenerateAll.StudentPrrogressReport(data);
            dispatch(FinalResultGenerateAllSlice.actions.REntireDataList(response.data));
            let listSubjectsDetails = response.data.listSubjectsDetails
            const getListDisplayName = (cell) => {
                let returnVal: any = ""

                if (cell.Is_Absent === "N") {
                    console.log('this is cell', cell);
                    if (response.data?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true1') {
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
                        Arraytemp = arrTemp;
                        let TestTypeCount = arrTemp.length;
                        let temp = "";
                        let totalMarks = null;

                        arrTemp.map((TestType, TestTypeIndex) => {
                            // if (TestType.Subject_Id == "2397")

                            HeaderCount += 1
                            let cell = getMatch(Test.Original_SchoolWise_Test_Id, Subject.Subject_Id, TestType.TestType_Id)
                            // if (showTestTypeDetails()) {  // 3 > !==1
                            // Flag > 🚩
                            // let Flag = SubjectArray[SubjectIndex].Parent_Subject_Id !== '0' && SubjectArray[SubjectIndex + 1].Parent_Subject_Id === '0' ? true : false;
                            if (SubjectArray[SubjectIndex].Parent_Subject_Id === '0') {
                                // if (cell.Grade_Or_Marks.trim().toLowerCase() === 'g') {
                                //   returnVal = cell.Grade
                                // } else {
                                columns.push({
                                    MarksScored: cell ? `${getListDisplayName(cell)}` : "-",
                                    TotalMarks: cell ? cell.Is_Absent == "N" ? response.data?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true1' ? cell.Grade : parseFloat(cell.TestType_Total_Marks) : "" : "-",
                                    IsAbsent: cell ? cell.Is_Absent : "N"
                                })
                            } else if (SubjectArray[SubjectIndex].Parent_Subject_Id !== '0') {
                                columns.push({
                                    MarksScored: cell ? `${getListDisplayName(cell)}` : "-",
                                    TotalMarks: cell ? cell.Is_Absent == "N" ? response.data?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true1' ? cell.Grade : parseFloat(cell.TestType_Total_Marks) : "" : "-",
                                    IsAbsent: cell ? cell.Is_Absent : "N"
                                })
                            }
                            //#region  check
                            // }

                            if (TestIndex == 0) {
                                SubHeaderArray.push({
                                    TestTypeName: (data1 == "True" && TestTypeCount == 1)
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

                                    const isConsiderForReport = data.IsTotalConsiderForProgressReport === "True";
                                    const isSingleSubject = subIdDetailsLength(Subject.Subject_Id) === 1;
                                    const isGradeFormat = response.data?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true1'

                                    // Determine marks or grade based on conditions
                                    const marksScored = isConsiderForReport && isSingleSubject
                                        ? isGradeFormat ? `${cell.TotalGrade}` : `${parseFloat(cell.Total_Marks_Scored)}`
                                        : getGradeOrMarks(cell, isGradeFormat, cell.TotalGrade);

                                    const totalMarks = isConsiderForReport && isSingleSubject
                                        ? isGradeFormat ? `${cell.TotalGrade}` : `${parseFloat(cell.Subject_Total_Marks)}`
                                        : isGradeFormat ? `${cell.TotalGrade}` : cell.Subject_Total_Marks;

                                    return {
                                        MarksScored: `${marksScored}`,
                                        TotalMarks: `${totalMarks}`,
                                        IsAbsent: cell.Is_Absent
                                    };
                                };

                                // Usage
                                totalMarks = calculateTotalMarks(data, Subject, cell);

                            }

                            if (TestTypeIndex == TestTypeCount - 1 && data1.toLowerCase() == "true" && subIdDetailsLength(Subject.Subject_Id) > 1) {
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
                                if (data1 == "True") {
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
                            if (response.data?.listStudentsDetails[0]?.ShowOnlyGrades.trim() === 'true1' && showGradeHeader(Subject.Subject_Id)) {
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

                    //show grade column
                    if (data1 === "True") {
                        response.data.ListSchoolWiseTestNameDetail.map((Item) => {
                            if (Item.SchoolWise_Test_Id == Test.Test_Id) {
                                const matchingMarksDetails = response.data.ListMarkssDetails.find(
                                    (marksItem) => marksItem.Marks_Grades_Configuration_Detail_ID === Item.Grade_id
                                );

                                // if (response.data?.listStudentsDetails[0]?.ShowOnlyGrades.trim() !== 'true') {
                                columns.push({
                                    MarksScored: `${parseFloat(Item.Total_Marks_Scored)}`,
                                    TotalMarks: Item.Subjects_Total_Marks,
                                    IsAbsent: "N"
                                })

                                columns.push({
                                    MarksScored: Item.Percentage + "%",
                                    TotalMarks: "-",
                                    IsAbsent: "N"
                                })
                                // }

                                columns.push({
                                    MarksScored: `${Item.Grade_Name} [${matchingMarksDetails.Remarks}]`,
                                    TotalMarks: "-",
                                    IsAbsent: "N"
                                })
                            }

                        })
                        if (Test.Test_Id === `-1`) {
                            columns.push({
                                MarksScored: `-`,
                                TotalMarks: '-',
                                IsAbsent: "N"
                            })

                            columns.push({
                                MarksScored: "-",
                                TotalMarks: "-",
                                IsAbsent: "N"
                            })
                            // }

                            columns.push({
                                MarksScored: `-`,
                                TotalMarks: "-",
                                IsAbsent: "N"
                            })
                        }
                    }


                    // }
                    rows.push({
                        TestName: Test.Test_Name,
                        MarksArr: columns
                    })
                })
            //show grade column
            if (data1 == "True") {
                SubHeaderArray.push({ TestTypeName: "Total" })
                SubHeaderArray.push({ TestTypeName: "Total" })
                SubHeaderArray.push({ TestTypeName: "%" })
                SubHeaderArray.push({ TestTypeName: "Grade" })
            }
            console.log(HeaderArray, "HeaderArray", SubHeaderArray, "SubHeaderArray");

            dispatch(FinalResultGenerateAllSlice.actions.ShowHeader(HeaderArray));
            dispatch(FinalResultGenerateAllSlice.actions.ShowSubHeader(SubHeaderArray));
            dispatch(FinalResultGenerateAllSlice.actions.ShowData(rows));
            console.log('following rows are going to be pushed', rows);

            dispatch(FinalResultGenerateAllSlice.actions.getListDisplayNameDetails(response.data.ListDisplayNameDetails));


            response.data.ListSubjectidDetails.map((Item) => {

            })

            let abc = response.data.listStudentsDetails.map((item, i) => {
                return {
                    Id: item.YearWise_Student_Id,
                    Text1: item.Student_Name,
                    Text2: item.Roll_No,
                    Text3: item.Standard_Name,
                    Text4: item.Division_Name,
                    Text5: item.Academic_Year,
                    School_Name: item.School_Name,
                    School_Orgn_Name: item.School_Orgn_Name,
                    standardDivId: item.Standard_Division_Id
                };
            });
            dispatch(FinalResultGenerateAllSlice.actions.StudentDetails(abc));

            let Subjects = [];
            response.data.listSubjectsDetails.map((item, i) => {
                Subjects.push({
                    Id: item.Subject_Id,
                    Name: item.Subject_Name,
                    Value: item.Subject_Id
                });
            });
            dispatch(FinalResultGenerateAllSlice.actions.SubjectDetails(Subjects));

            let ShortenTestType = [];
            response.data.listSubjectIdDetails.map((item, i) => {
                ShortenTestType.push({
                    Id: item.Subject_Id,
                    Name: item.ShortenTestType_Name,
                    Value: item.Subject_Id,

                });
            });
            dispatch(FinalResultGenerateAllSlice.actions.ShortenTestDetails(ShortenTestType));

            let Exams = [];
            response.data.listTestDetails.map((item, i) => {
                Exams.push({
                    Id: item.Test_Id,
                    Name: item.Test_Name,
                    Value: item.Original_SchoolWise_Test_Id
                });
            });
            dispatch(FinalResultGenerateAllSlice.actions.ExamDetails(Exams));

            let testMarks = [];
            response.data.listSubjectIdDetails.map((item, i) => {
                testMarks.push({
                    Id: item.TestWise_Subject_Marks_Id,
                    Name: `${item.Marks_Scored} / ${item.Subject_Total_Marks}`,
                    Value: item.TestWise_Subject_Marks_Id,
                    // Grade: item.Grade
                });
            });
            dispatch(FinalResultGenerateAllSlice.actions.TestMarksDetails(testMarks));
        }

export const GenerateAllGA = (data: IGetGenerateAllStudentBody): AppThunk => async (dispatch) => {
    dispatch(FinalResultGenerateAllSlice.actions.getLoading(true));
    const response = await ApiFinalResultGenerateAll.GenerateResultAll(data);
    dispatch(FinalResultGenerateAllSlice.actions.GenerateAll(response.data));
};

export const UpdateStudentTestMarks = (data: IUpdateStudentTestMarksBody): AppThunk => async (dispatch) => {
    dispatch(FinalResultGenerateAllSlice.actions.getLoading(true));
    const response = await ApiFinalResultGenerateAll.UpdateStudentTestMarks(data);
    dispatch(FinalResultGenerateAllSlice.actions.UpdateStudentTestMarksMSG(response.data));
};

export const resetStudentTestMarks =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(FinalResultGenerateAllSlice.actions.resetupdatestudentlist());
        };

export const resetGenerateAllGA = (): AppThunk => async (dispatch) => {
    dispatch(FinalResultGenerateAllSlice.actions.resetGenerateAll());
};





export const ViewResultGA =
    (data: IViewBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiFinalResultGenerateAll.ViewReportProgress(data);

            let abc = response.data.listStudentDetail.map((item, i) => {
                return {
                    Id: item.YearWise_Student_Id,
                    Text1: item.Student_Name,
                    Text2: item.Roll_No,
                    Text3: item.Standard_Name,
                    Text4: item.Division_Name,
                    Text5: item.Academic_Year,
                    Text6: item.School_Name,
                    Text7: item.School_Orgn_Name,
                    ShowOnlyGrades: item.ShowOnlyGrades
                };
            });
            dispatch(FinalResultGenerateAllSlice.actions.ViewResult(abc));

            let Subject = [];
            response.data.listSubjectDetails.map((item, i) => {
                Subject.push({
                    Id: item.Subject_Id,
                    Name: item.Subject_Name,
                    Value: item.Subject_Id,
                    IsAbsent: item.IsAbsent,
                    Total_Consideration: item.Total_Consideration
                });
            });
            dispatch(FinalResultGenerateAllSlice.actions.SubjectDetailsView(Subject));

            let Marks = [{ Id: '0', Name: 'Marks', Value: '0', IsAbsent: '0' }];
            response.data.listSubjectDetails.map((item, i) => {
                const marksScored = item.Marks_Scored.includes('.0') ? parseFloat(item.Marks_Scored) : item.Marks_Scored;
                Marks.push({
                    Id: item.Subject_Id,
                    Name: `${marksScored} / ${item.Subject_Total_Marks}`,
                    Value: item.Subject_Id,
                    IsAbsent: item.IsAbsent
                });
            });
            dispatch(FinalResultGenerateAllSlice.actions.MarkDetailsView(Marks));

            let grades = [{ Id: '0', Name: 'Subject Grade', Value: '0', IsAbsent: '0' }];
            response.data.listSubjectDetails.map((item, i) => {
                grades.push({
                    Id: item.Subject_Id,
                    Name: item.Grade,
                    Value: item.Subject_Id,
                    IsAbsent: item.IsAbsent
                });
            });
            dispatch(FinalResultGenerateAllSlice.actions.GradesDetailsView(grades));

            let Total = response.data.listMarksDetails.map((item, i) => {
                const totalmarksScored = item.Total_Marks_Scored.includes('.0') ? parseFloat(item.Total_Marks_Scored) : item.Total_Marks_Scored;
                return {
                    TotalMarks: `${totalmarksScored} / ${item.Subjects_Total_Marks}`,
                    GradeName: item.Grade_Name,
                    Percentage: item.Percentage,
                    Grade_id: item.Grade_id
                };
            });
            let PerCentDetails = response.data.listParcentageDetails.map((item, i) => {
                return {
                    TotalMarks: item.Range,
                    Grade: item.Grade,
                    Remarks: item.Remarks,
                    GradeConfId: item.Marks_Grades_Configuration_Detail_ID
                };
            });
            dispatch(FinalResultGenerateAllSlice.actions.PercentDetails(PerCentDetails));
            dispatch(FinalResultGenerateAllSlice.actions.TotalPerGradeView(Total));
        }


export default FinalResultGenerateAllSlice.reducer