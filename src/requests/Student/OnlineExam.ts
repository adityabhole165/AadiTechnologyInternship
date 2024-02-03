import { createSlice } from '@reduxjs/toolkit';
import IOnlineTest, {
  IExamData,
  IOnlineExamQuestions,
  IOnlineTestSubject,
  ISaveOnlineExamDetailsBody,
  ISubmitOnlineExamBody
} from 'src/interfaces/Student/OnlineExam';
import { AppThunk } from 'src/store';
import GetOnlineExamListApi from '../../api/Student/OnlineExam';

const SelectOnlineExamSlice = createSlice({
  name: 'selectOnlineExam',
  initialState: {
    GetAllTestsForStudentdata: [],
    SubjectList: [],
    QuestionDetailsList: [],
    AnswerDetailsList: [],
    ExamSchedulesList: [],
    ExamData: [],
    SubmitExam: null,
    SaveExam: null
  },
  reducers: {
    getOnlineExam(state, action) {
      state.GetAllTestsForStudentdata =
        action.payload.GetAllTestsForStudentdata;
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
    },
    submitExam(state, action) {
      state.SubmitExam = action.payload.Message;
    },
    saveExam(state, action) {
      state.SaveExam = action.payload.Message;
    },
    resetSaveMsg(state) {
      state.SaveExam = '';
    },
    resetSubmitMsg(state) {
      state.SubmitExam = '';
    }
  }
});
export const resetSaveMsg = (): AppThunk => async (dispatch) => {
  dispatch(SelectOnlineExamSlice.actions.resetSaveMsg());
};
export const resetSubmitMsg = (): AppThunk => async (dispatch) => {
  dispatch(SelectOnlineExamSlice.actions.resetSubmitMsg());
};
export const AllExamData =
  (data: IExamData): AppThunk =>
  async (dispatch) => {
    const response = await GetOnlineExamListApi.AllExamData(data);
    const GetIsExamSubmitted = () => {
      let bIsExamSubmitted = false;
      if (response.data.QuestionDetails.length > 0) {
        bIsExamSubmitted = response.data.QuestionDetails[0].IsExamSubmited;
      }
      return bIsExamSubmitted;
    };
    const response1 = await GetOnlineExamListApi.GetOnlineExamQuestionsDetail(
      data
    );
    const getChild = (QuestionId) => {
      return response1.data.AnswerDetails.filter(
        (objAnswer) =>
          objAnswer.QuestionID === QuestionId &&
          (objAnswer.Answer !== '' || objAnswer.AttachmentPath !== '')
      ).map((item, i) => {
        return {
          Id: item.AnswerId,
          Value: item.QuestionID,
          Name: item.Answer,
          isActive: item.UserSelectedAnswer === item.AnswerId ? true : false,
          IsCorrectAnswer: item.IsCorrectAnswer,
          UserSelectedAnswer: item.UserSelectedAnswer,
          IsExamSubmitted: GetIsExamSubmitted(),
          path1: item.AttachmentPath
        };
      });
    };

    const questions = response?.data?.QuestionDetails.map((item) => {
      return {
        Parent: {
          Id: item.QuestionId,
          Name: item.Question,
          Marks: item.Marks,
          SerialNo: item.SerialNo,
          IsExamSubmitted: item.IsExamSubmited,
          isSingleSelect: true,
          isActive: false,
          path: item.AttachmentPath
        },
        Child: getChild(item.QuestionId)
      };
    });

    dispatch(SelectOnlineExamSlice.actions.getExamData(questions));
  };
export const GetOnlineExamList =
  (data: IOnlineTest): AppThunk =>
  async (dispatch) => {
    const response = await GetOnlineExamListApi.GetOnlineExamList(data);
    dispatch(SelectOnlineExamSlice.actions.getOnlineExam(response.data));
  };

export const GetOnlineExamSubjectList =
  (data: IOnlineTestSubject): AppThunk =>
  async (dispatch) => {
    const response = await GetOnlineExamListApi.GetOnlineExamSubjectList(data);
    dispatch(SelectOnlineExamSlice.actions.getOnlineExamSubject(response.data));
  };

export const GetQuestionDetailsList =
  (data: IOnlineExamQuestions): AppThunk =>
  async (dispatch) => {
    const response = await GetOnlineExamListApi.GetOnlineExamQuestionsDetail(
      data
    );
    dispatch(SelectOnlineExamSlice.actions.getQuestionDetails(response.data));
  };

export const GetAnswerDetailsList =
  (data: IOnlineExamQuestions): AppThunk =>
  async (dispatch) => {
    const response = await GetOnlineExamListApi.GetOnlineExamQuestionsDetail(
      data
    );
    dispatch(SelectOnlineExamSlice.actions.getAnswerDetails(response.data));
  };

export const GetExamSchedulesListList =
  (data: IOnlineExamQuestions): AppThunk =>
  async (dispatch) => {
    const response = await GetOnlineExamListApi.GetOnlineExamQuestionsDetail(
      data
    );
    dispatch(SelectOnlineExamSlice.actions.getExamSchedules(response.data));
  };

export const GetSubmitExam =
  (data: ISubmitOnlineExamBody): AppThunk =>
  async (dispatch) => {
    const response = await GetOnlineExamListApi.SubmitExam(data);
    dispatch(SelectOnlineExamSlice.actions.submitExam(response.data));
  };
export const GetSaveExam =
  (data: ISaveOnlineExamDetailsBody): AppThunk =>
  async (dispatch) => {
    const response = await GetOnlineExamListApi.SaveExam(data);
    dispatch(SelectOnlineExamSlice.actions.saveExam(response.data));
  };

export default SelectOnlineExamSlice.reducer;
