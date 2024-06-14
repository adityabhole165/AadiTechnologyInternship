
import { createSlice } from "@reduxjs/toolkit";
import ApiFinalResultGenerateAll from "src/api/FinalResult/ApiFinalResultGenerateAll";
import { IGetGenerateAllStudentBody, IGetStudentPrrogressReportBody, IViewBody } from "src/interfaces/FinalResult/IFinalResultGenerateAll";
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
        Loading: true
    },

    reducers: {
        StudentDetails(state, action) {
            state.Loading = false;
            state.getStudentDetails = action.payload;
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
            let abc = response.data.listStudentsDetails.map((item, i) => {
                return {
                    Id: item.YearWise_Student_Id,
                    Text1: item.Student_Name,
                    Text2: item.Roll_No,
                    Text3: item.Standard_Name,
                    Text4: item.Division_Name,
                    Text5: item.Academic_Year
                };
            });
            dispatch(FinalResultGenerateAllSlice.actions.StudentDetails(abc));
            console.log(abc)

            let Subjects = [];
            response.data.listSubjectIdDetails.map((item, i) => {
                Subjects.push({
                    Id: item.Subject_Id,
                    Name: item.Subject_Name,
                    Value: item.Subject_Id
                });
            });
            dispatch(FinalResultGenerateAllSlice.actions.SubjectDetails(Subjects));
            console.log(Subjects)

            let ShortenTestType = [];
            response.data.listSubjectIdDetails.map((item, i) => {
                ShortenTestType.push({
                    Id: item.Subject_Id,
                    Name: item.ShortenTestType_Name,
                    Value: item.Subject_Id
                });
            });
            dispatch(FinalResultGenerateAllSlice.actions.ShortenTestDetails(ShortenTestType));
            console.log(ShortenTestType, "ShortenTestType")

            let Exams = [];
            response.data.listSubjectIdDetails.map((item, i) => {
                Exams.push({
                    Id: item.SchoolWise_Test_Id,
                    Name: item.SchoolWise_Test_Name,
                    Value: item.SchoolWise_Test_Id
                });
            });
            dispatch(FinalResultGenerateAllSlice.actions.ExamDetails(Exams));
            console.log(Exams)

            let testMarks = [];
            response.data.listSubjectIdDetails.map((item, i) => {
                testMarks.push({
                    Id: item.SchoolWise_Test_Id,
                    Name: `${item.Marks_Scored} / ${item.Subject_Total_Marks}`,
                    Value: item.SchoolWise_Test_Id,
                    // Grade: item.Grade
                });
            });
            dispatch(FinalResultGenerateAllSlice.actions.TestMarksDetails(testMarks));
            console.log(testMarks);

        }

export const GenerateAllGA = (data: IGetGenerateAllStudentBody): AppThunk => async (dispatch) => {
    dispatch(FinalResultGenerateAllSlice.actions.getLoading(true));
    const response = await ApiFinalResultGenerateAll.GenerateResultAll(data);
    console.log(response, 'dddf');
    dispatch(FinalResultGenerateAllSlice.actions.GenerateAll(response.data));
    console.log(response.data, 'assdf');
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
            console.log(abc)
        }

export const SubjectDetailsVA =
    (data: IViewBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiFinalResultGenerateAll.ViewReportProgress(data);
            let abc = [];
            response.data.listSubjectDetails.map((item, i) => {
                abc.push({
                    Id: item.Subject_Id,
                    Name: item.Subject_Name,
                    Value: item.Subject_Id
                });
            });
            dispatch(FinalResultGenerateAllSlice.actions.SubjectDetailsView(abc));
            console.log(abc)
        }


export const MarksDetailsVA =
    (data: IViewBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiFinalResultGenerateAll.ViewReportProgress(data);
            let abc = [{ Id: '0', Name: 'Marks', Value: '0' }];
            response.data.listSubjectDetails.map((item, i) => {
                abc.push({
                    Id: item.Subject_Id,
                    Name: `${item.Marks_Scored} / ${item.Subject_Total_Marks}`,
                    Value: item.Subject_Id
                });
            });
            dispatch(FinalResultGenerateAllSlice.actions.MarkDetailsView(abc));
            console.log(abc)
        }

export const GradesDetailsVA =
    (data: IViewBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiFinalResultGenerateAll.ViewReportProgress(data);
            let abc = [{ Id: '0', Name: 'Subject Grade', Value: '0' }];
            response.data.listSubjectDetails.map((item, i) => {
                abc.push({
                    Id: item.Subject_Id,
                    Name: item.Grade,
                    Value: item.Subject_Id
                });
            });
            dispatch(FinalResultGenerateAllSlice.actions.GradesDetailsView(abc));
            console.log(abc)
        }

export default FinalResultGenerateAllSlice.reducer