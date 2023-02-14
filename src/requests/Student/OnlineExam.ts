import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import GetOnlineExamListApi from "../../api/Student/OnlineExam";
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import IOnlineTest, {IExamData, AnswerDetails, ExamSchedules, IOnlineExamQuestions, IOnlineTestSubject, QuestionDetails } from 'src/interfaces/Student/OnlineExam';

const SelectOnlineExamSlice = createSlice({
    name: 'selectOnlineExam',
    initialState: {
        GetAllTestsForStudentdata: [],
        SubjectList: [],
        QuestionDetailsList: [],
        AnswerDetailsList: [],
        ExamSchedulesList: [],
        ExamData: []
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
        },
        getExamData(state, action) {
            state.ExamData = action.payload;
        }
    }
});

export const AllExamData =
    (data: IExamData): AppThunk =>
        async (dispatch) => {
            const response = await GetOnlineExamListApi.AllExamData(data);
            const response1 = await GetOnlineExamListApi.GetOnlineExamQuestionsDetail(data);
            const getChild = (QuestionId) => {
                return (
                    response1.data.AnswerDetails
                        .filter((objAnswer) => objAnswer.QuestionID === QuestionId && objAnswer.Answer!=="")
                        .map((item, i) => {
                            return {
                                Id: item.AnswerId,
                                Value: item.AnswerId,
                                Name: item.Answer,
                                isActive: false
                            }

                        })
                )
            };

            const questions =
                response?.data?.QuestionDetails.map((item) => {
                    return {
                        Parent: {
                            Id: item.QuestionId,
                            Name: item.Question,
                            Marks:item.Marks,
                            SerialNo:item.SerialNo,
                            isSingleSelect: true,
                        },
                        Child: getChild(item.QuestionId)
                    }

                })
            dispatch(SelectOnlineExamSlice.actions.getExamData(questions));
        }
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