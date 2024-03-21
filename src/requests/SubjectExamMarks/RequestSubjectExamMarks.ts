import { createSlice } from '@reduxjs/toolkit';
import SubjectExamMarksApi from 'src/api/SubjectExamMarks/ApiSubjectExamMarks';
import {
    IGetAllGradesForSubjectMarkListBody,
    IGetAllStudentsForMarksAssignmentsBody,
    IGetSubjectExamMarkslistsBody,
    IGetSubjectMarkListBody,
    IManageStudentsTestMarkBody
} from 'src/interfaces/SubjectExamMarks/ISubjectExamMarks';
import { AppThunk } from 'src/store';
const SubjectExamMarksslice = createSlice({
    name: 'Subject Exam Marks',
    initialState: {
        StudentsForMarksAssignments: [],
        SubjectMarkList: null,
        ListGetStandardName: [],
        ListGetSubjectName: [],
        ListGetSchoolWiseTestName: [],
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

        GetSubjectMarkLists(state, action) {
            state.Loading = false;
            state.SubjectMarkList = action.payload;
            state.ListGetStandardName = action.payload.listGetStandardName;
            state.ListGetSubjectName = action.payload.listGetSubjectName;
            state.ListGetSchoolWiseTestName = action.payload.listGetSchoolWiseTestName;
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
        getLoading(state, action) {
            state.Loading = true;

        },

    }
});



export const getSubjectMarkList =
    (data: IGetSubjectMarkListBody): AppThunk =>
        async (dispatch) => {
            dispatch(SubjectExamMarksslice.actions.getLoading(true));
            const response = await SubjectExamMarksApi.GetSubjectMarkList(data);
            dispatch(SubjectExamMarksslice.actions.GetSubjectMarkLists(response.data));

        };
export const getAllStudentsForMarksAssignments =
    (data: IGetAllStudentsForMarksAssignmentsBody): AppThunk =>
        async (dispatch) => {
            dispatch(SubjectExamMarksslice.actions.getLoading(true));
            const response = await SubjectExamMarksApi.GetAllStudentsForMarksAssignments(data);
            dispatch(SubjectExamMarksslice.actions.GetAllStudentsForMarksAssignment(response.data));
            console.log(response, "abc")
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
