
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
        getSubjectDetailsView: [],
        getMarkDetailsView: [],
        getGradesDetailsView: [],
        MarkDetailsList: [],
        UpdateStudentTestMarks: '',
        ListDisplayNameDetails: [],
        HeaderArray: [],
        SubHeaderArray: [],
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
    (data: IGetStudentPrrogressReportBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiFinalResultGenerateAll.StudentPrrogressReport(data);

            let rows = []
            const getMatch = (TestId, SubjectId, TestTypeId) => {
                let returnVal = null
                response.data.listSubjectIdDetails.map((Item) => {
                    if (Item.Original_SchoolWise_Test_Id == TestId &&
                        Item.Subject_Id == SubjectId &&
                        Item.TestType_Id == TestTypeId

                    )
                        returnVal = Item
                })
                return returnVal
            }
            let HeaderArray = []
            let SubHeaderArray = []
            let HeaderCount = 0
            response.data.listTestDetails.map((Test, TestIndex) => {
                let columns = []
                response.data.listSubjectsDetails.map((Subject) => {
                    HeaderCount = 0
                    response.data.ListSubjectidDetails
                        .filter((obj) => { return obj.Subject_Id == Subject.Subject_Id })
                        .map((TestType) => {
                            HeaderCount += 1
                            if (TestIndex == 0) {

                                SubHeaderArray.push({
                                    TestTypeName: TestType.ShortenTestType_Name,
                                })
                            }
                            let cell = getMatch(Test.Original_SchoolWise_Test_Id, Subject.Subject_Id, TestType.TestType_Id)
                            columns.push({
                                MarksScored: cell ? cell.Marks_Scored : "-",
                                TotalMarks: cell ? cell.Subject_Total_Marks : "-",
                                IsAbsent: cell ? cell.Is_Absent : "N"
                            })

                        })
                    if (TestIndex == 0) {
                        HeaderArray.push({
                            SubjectName: Subject.Subject_Name,
                            colSpan: HeaderCount
                        })
                    }
                })

                rows.push({
                    TestName: Test.Test_Name,
                    MarksArr: columns
                })
            })
            console.log(HeaderArray, "HeaderArray", SubHeaderArray, "SubHeaderArray");

            dispatch(FinalResultGenerateAllSlice.actions.ShowHeader(HeaderArray));
            dispatch(FinalResultGenerateAllSlice.actions.ShowSubHeader(SubHeaderArray));
            dispatch(FinalResultGenerateAllSlice.actions.ShowData(rows));
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
                    Text5: item.Academic_Year
                };
            });
            dispatch(FinalResultGenerateAllSlice.actions.ViewResult(abc));

            let Subject = [];
            response.data.listSubjectDetails.map((item, i) => {
                Subject.push({
                    Id: item.Subject_Id,
                    Name: item.Subject_Name,
                    Value: item.Subject_Id,
                    IsAbsent: item.IsAbsent
                });
            });
            dispatch(FinalResultGenerateAllSlice.actions.SubjectDetailsView(Subject));

            let Marks = [{ Id: '0', Name: 'Marks', Value: '0', IsAbsent: '0' }];
            response.data.listSubjectDetails.map((item, i) => {
                Marks.push({
                    Id: item.Subject_Id,
                    Name: `${item.Marks_Scored} / ${item.Subject_Total_Marks}`,
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
        }


export default FinalResultGenerateAllSlice.reducer