import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import GetOnlineExamListApi from "../../api/Student/OnlineExam";
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import IOnlineTest, { AnswerDetails, ExamSchedules, IOnlineExamQuestions, IOnlineTestSubject, QuestionDetails } from 'src/Interface/Student/OnlineExam';

const SelectOnlineExamSlice = createSlice({
    name: 'selectOnlineExam',
    initialState: {
        GetAllTestsForStudentdata: [],
        SubjectList: [],
        QuestionDetailsList: [],
        AnswerDetailsList: [],
        ExamSchedulesList: []
    },
    reducers: {
        getOnlineExam(state, action) {
            state.GetAllTestsForStudentdata = action.payload.GetAllTestsForStudentdata;
        },
        getOnlineExamSubject(state, action) {
            state.SubjectList = action.payload.GetAllSubjectsForExamdata;
        },
        getQuestionDetails(state, action) {
            state.QuestionDetailsList = action.payload.QuestionDetails;
        },
        getAnswerDetails(state, action) {
            state.AnswerDetailsList = action.payload.AnswerDetails;
        },
        getExamSchedules(state, action) {
            state.ExamSchedulesList = action.payload.ExamSchedules;
        }
    }
});

export const GetOnlineExamList =
    (data: IOnlineTest): AppThunk =>
        async (dispatch) => {
            const response = await GetOnlineExamListApi.GetOnlineExamList(data);
            dispatch(SelectOnlineExamSlice.actions.getOnlineExam(response.data));
        }

export const GetOnlineExamSubjectList =
    (data: IOnlineTestSubject): AppThunk =>
        async (dispatch) => {
            const response = await GetOnlineExamListApi.GetOnlineExamSubjectList(data);
            dispatch(SelectOnlineExamSlice.actions.getOnlineExamSubject(response.data));
        }

export const GetQuestionDetailsList =
    (data: IOnlineExamQuestions): AppThunk =>
        async (dispatch) => {
            const response = await GetOnlineExamListApi.GetOnlineExamQuestionsDetail(data);
            dispatch(SelectOnlineExamSlice.actions.getQuestionDetails(response.data));
        }

export const GetAnswerDetailsList =
    (data: IOnlineExamQuestions): AppThunk =>
        async (dispatch) => {
            const response = await GetOnlineExamListApi.GetOnlineExamQuestionsDetail(data);
            dispatch(SelectOnlineExamSlice.actions.getAnswerDetails(response.data));
        }

export const GetExamSchedulesListList =
    (data: IOnlineExamQuestions): AppThunk =>
        async (dispatch) => {
            const response = await GetOnlineExamListApi.GetOnlineExamQuestionsDetail(data);
            dispatch(SelectOnlineExamSlice.actions.getExamSchedules(response.data));
        }



export default SelectOnlineExamSlice.reducer 