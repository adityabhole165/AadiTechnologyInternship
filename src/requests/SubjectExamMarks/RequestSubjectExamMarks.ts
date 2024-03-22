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
            state.ListTestDetailss = action.payload.listTestDetailss;
            state.ListStudentTestMarkDetails = action.payload.listStudentTestMarkDetails;
            state.ListDisplayNameDetail = action.payload.listDisplayNameDetail;
            state.ListFailCreatiaDetails = action.payload.listFailCreatiaDetails;
            state.ListYearwiseStudentId = action.payload.listYearwiseStudentId;

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
export const getAllStudentsForMarksAssignments =
    (data: IGetAllStudentsForMarksAssignmentsBody): AppThunk =>
        async (dispatch) => {
            dispatch(SubjectExamMarksslice.actions.getLoading(true));
            const response = await SubjectExamMarksApi.GetAllStudentsForMarksAssignments(data);
            dispatch(SubjectExamMarksslice.actions.GetAllStudentsForMarksAssignment(response.data));
            console.log(response, "abc")
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

export const getSubjectExamMarkslists =
    (data: IGetSubjectExamMarkslistsBody): AppThunk =>
        async (dispatch) => {
            dispatch(SubjectExamMarksslice.actions.getLoading(true));
            const response = await SubjectExamMarksApi.GetSubjectExamMarkslists(data);
            dispatch(SubjectExamMarksslice.actions.GetSubjectExamMarkslist(response.data));
            console.log(response, "response")
        };
export const getManageStudentsTestMark =
    (data: IManageStudentsTestMarkBody): AppThunk =>
        async (dispatch) => {
            dispatch(SubjectExamMarksslice.actions.getLoading(true));
            const response = await SubjectExamMarksApi.ManageStudentsTestMark(data);
            dispatch(SubjectExamMarksslice.actions.GetManageStudentsTestMark(response.data));

        };


export default SubjectExamMarksslice.reducer;
