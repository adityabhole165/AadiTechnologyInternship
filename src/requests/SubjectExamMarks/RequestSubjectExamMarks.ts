import { createSlice } from '@reduxjs/toolkit';
import SubjectExamMarksApi from 'src/api/SubjectExamMarks/ApiSubjectExamMarks';
import {
    IGetAllGradesForSubjectMarkListBody,
    IGetAllStudentsForMarksAssignmentsBody,
    IGetClassExamSubjectNameDetailesBody,
    IGetSubjectExamMarkslistsBody,
    IManageStudentsTestMarkBody
} from 'src/interfaces/SubjectExamMarks/ISubjectExamMarks';
import { AppThunk } from 'src/store';
const SubjectExamMarksslice = createSlice({
    name: 'Subject Exam Marks',
    initialState: {
        StudentsForMarksAssignments: [],
        ClassExamSubjectNameDetailesBody: null,
        StandardName: null,
        SubjectName: "",
        SchoolWiseTestName: null,
        GradesForSubjectMarkList: [],
        SubjectExamMarkslists: null,
        ListTestDetailss: [],
        ListStudentTestMarkDetails: [],
        ListDisplayNameDetail: [],
        ListFailCreatiaDetails: [],
        ListYearwiseStudentId: [],
        ManageStudentsTestMark: '',
        Loading: true
    },
    reducers: {
        GetAllStudentsForMarksAssignment(state, action) {
            state.Loading = false;
            state.StudentsForMarksAssignments = action.payload;
        },

        GetClassExamSubjectNameDetail(state, action) {
            state.Loading = false;
            state.ClassExamSubjectNameDetailesBody = action.payload;
            state.StandardName = action.payload.GetStandardName;
            state.SubjectName = action.payload.SubjectName;
            state.SchoolWiseTestName = action.payload.GetSchoolWiseTestName;
        },
        GetAllGradesForSubjectMarkList(state, action) {
            state.Loading = false;
            state.GradesForSubjectMarkList = action.payload;
        },

        GetSubjectExamMarkslist(state, action) {
            state.Loading = false;
            state.SubjectExamMarkslists = action.payload;

            state.ListStudentTestMarkDetails = action.payload.listStudentTestMarkDetails;

            state.ListFailCreatiaDetails = action.payload.listFailCreatiaDetails;
            state.ListYearwiseStudentId = action.payload.listYearwiseStudentId;

        },
        GetListTestDetailss(state, action) {
            state.ListTestDetailss = action.payload;
        },
        GetListDisplayNameDetail(state, action) {
            state.ListDisplayNameDetail = action.payload;
        },
        GetManageStudentsTestMark(state, action) {
            state.Loading = false;
            state.ManageStudentsTestMark = action.payload;
        },
        resetManageStudentsTestMark(state) {
            state.Loading = false;
            state.ManageStudentsTestMark = "";
        },
        getLoading(state, action) {
            state.Loading = true;

        },

    }
});



export const getClassExamSubjectNameDetailes =
    (data: IGetClassExamSubjectNameDetailesBody): AppThunk =>
        async (dispatch) => {
            dispatch(SubjectExamMarksslice.actions.getLoading(true));
            const response = await SubjectExamMarksApi.GetClassExamSubjectNameDetailes(data);
            dispatch(SubjectExamMarksslice.actions.GetClassExamSubjectNameDetail(response.data));

        };


export const resetManageStudentsTestMark =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(SubjectExamMarksslice.actions.resetManageStudentsTestMark());// Dispatching action to reset the message
        };
export const getAllGradesForSubjectMarkList =
    (data: IGetAllGradesForSubjectMarkListBody): AppThunk =>
        async (dispatch) => {
            dispatch(SubjectExamMarksslice.actions.getLoading(true));
            const response = await SubjectExamMarksApi.GetAllGradesForSubjectMarkList(data);
            dispatch(SubjectExamMarksslice.actions.GetAllGradesForSubjectMarkList(response.data));

        };
//For RollNo,StudentName
// export const getAllStudentsForMarksAssignments =
// (data: IGetAllStudentsForMarksAssignmentsBody): AppThunk =>
//     async (dispatch) => {
//         dispatch(SubjectExamMarksslice.actions.getLoading(true));
//         const response = await SubjectExamMarksApi.GetAllStudentsForMarksAssignments(data);
//         dispatch(SubjectExamMarksslice.actions.GetAllStudentsForMarksAssignment(response.data));
//         console.log(response, "abc")
//     };

//HeaderList,ItemList,Dropdown Status
// export const getSubjectExamMarkslists =
//     (data: IGetSubjectExamMarkslistsBody): AppThunk =>
//         async (dispatch) => {
//             dispatch(SubjectExamMarksslice.actions.getLoading(true));
//             const response = await SubjectExamMarksApi.GetSubjectExamMarkslists(data);
//             dispatch(SubjectExamMarksslice.actions.GetSubjectExamMarkslist(response.data));
//             console.log(response, "response")
//         };





export const getSubjectExamMarkslist =
    (data): AppThunk =>
        async (dispatch) => {
            dispatch(SubjectExamMarksslice.actions.getLoading(true));
            const body1: IGetAllStudentsForMarksAssignmentsBody = {
                asAcademicYearID: data.asAcademicYrId,
                asSchoolId: data.asSchoolId,
                asSubject_Id: data.asSubjectId,
                asStandardDivision_Id: data.asStandardDivision_Id,
                asTestDate: data.asTestDate
            }
            const body2: IGetSubjectExamMarkslistsBody = {
                asSchoolId: data.asSchoolId,
                asStandardDivision_Id: data.asStandardDivision_Id,
                asSubjectId: data.asSubjectId,
                asTestId: data.asTestId,
                asAcademicYrId: data.asAcademicYrId,
                asShowTotalAsPerOutOfMarks: data.asShowTotalAsPerOutOfMarks
            }
            const response1 = await SubjectExamMarksApi.GetAllStudentsForMarksAssignments(body1);
            const response2 = await SubjectExamMarksApi.GetSubjectExamMarkslists(body2);
            let reponseData1 = [];
            const getMarksForStudent = (StudentId) => {
                let arr = [];
                response2.data.listStudentTestMarkDetails.map((Item, i) => {
                    // console.log(Item.Student_Id, " == ", StudentId)
                    if (Item.Student_Id == StudentId)
                        arr.push({
                            Id: Item.TestType_Id,
                            Text1: Item.Marks_Scored,
                            Text2: Item.Grade_Or_Marks,
                        });
                });
                return arr
            }

            const getTotalMarksForStudent = (StudentId) => {
                let TotalMarks = "0"
                response2.data.listStudentTestMarkDetails.map((Item, i) => {
                    // console.log(Item.Student_Id, " == ", StudentId)
                    if (Item.Student_Id == StudentId)
                        TotalMarks = Item.Total_Marks_Scored
                });
                return TotalMarks
            }
            response1.data.map((Item, i) => {
                reponseData1.push({
                    Id: Item.Student_Id,
                    Text1: Item.Roll_No,
                    Text2: Item.Name,
                    MarksForStudent: getMarksForStudent(Item.Student_Id),
                    TotalMarks: getTotalMarksForStudent(Item.Student_Id),
                    ExamStatus: "0"
                });
            });
            console.log(reponseData1, "reponseData1");

            dispatch(SubjectExamMarksslice.actions.GetAllStudentsForMarksAssignment(reponseData1));

            let responseData2 = [];
            const HeaderList = {
                Text1: "Sr.No.",
                Text2: "Student Name",
                Text3: "Exam Status",
                Text4: response2.data.listTestDetailss.map((Item, i) => {
                    return {
                        Text1: Item.TestType_Name,
                        Text2: Item.TestType_Total_Marks
                    };
                }),
                Text5: "Total/" + response2.data.listTestDetailss[0].TotalMarks
            }

            dispatch(SubjectExamMarksslice.actions.GetListTestDetailss(HeaderList));

            dispatch(SubjectExamMarksslice.actions.GetSubjectExamMarkslist(response2.data));



            // dispatch(SubjectExamMarksslice.actions.GetSubjectExamMarkslist(responseData3));


            const response4 = await SubjectExamMarksApi.GetSubjectExamMarkslists(body2);
            let responseData4 = [];

            response4.data.listDisplayNameDetail.map((Item, i) => {
                responseData4.push({
                    Id: Item.ExamStatusId,
                    Name: Item.DisplayName,
                    Value: Item.ExamStatusId
                });
            });

            dispatch(SubjectExamMarksslice.actions.GetListDisplayNameDetail(responseData4));
        }




export const getManageStudentsTestMark =
    (data: IManageStudentsTestMarkBody): AppThunk =>
        async (dispatch) => {
            dispatch(SubjectExamMarksslice.actions.getLoading(true));
            const response = await SubjectExamMarksApi.ManageStudentsTestMark(data);
            dispatch(SubjectExamMarksslice.actions.GetManageStudentsTestMark(response.data));

        };


export default SubjectExamMarksslice.reducer;
