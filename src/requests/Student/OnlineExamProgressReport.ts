import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { AppThunk } from 'src/store';
import OnlineExamProgressReport from 'src/interfaces/Student/OnlineExamProgressReport';
import OnlineExamProgressReportapi from 'src/api/Student/OnlineExamProgressReport';


const OnlineExamProgressReportSlice = createSlice({
  name: 'OnlineExamProgressReport',
  initialState: {
    SchoolInformation: [],
    Students: [],
    OnlineExams: [],
    Subjects: [],
    MarkInformation: [],
    Details: [],
    Header: []
  },
  reducers: {
    getStudentDetails(state, action) {
      state.Students = action.payload.Students
    },
    getSchoolInformation(state, action) {
      state.SchoolInformation = action.payload.SchoolInformation
    },
    getOnlineExams(state, action) {
      state.OnlineExams = action.payload.OnlineExams
    },
    getSubjects(state, action) {
      state.Subjects = action.payload.Subjects
    },
    getMarkInformation(state, action) {
      state.MarkInformation = action.payload.MarkInformation
    },
    getDetails(state, action) {
      state.Details = action.payload
    },
    getHeader(state, action) {
      state.Header = action.payload
    },
  }
});


export const getStudentDetails =
  (data: OnlineExamProgressReport): AppThunk =>
    async (dispatch) => {
      const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
      dispatch(OnlineExamProgressReportSlice.actions.getStudentDetails(response.data));
    };

export const getSchoolInformation =
  (data: OnlineExamProgressReport): AppThunk =>
    async (dispatch) => {
      const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
      dispatch(OnlineExamProgressReportSlice.actions.getSchoolInformation(response.data));
    };

export const getOnlineExams =
  (data: OnlineExamProgressReport): AppThunk =>
    async (dispatch) => {
      const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
      dispatch(OnlineExamProgressReportSlice.actions.getOnlineExams(response.data));
    };

export const getSubjects =
  (data: OnlineExamProgressReport): AppThunk =>
    async (dispatch) => {
      const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
      dispatch(OnlineExamProgressReportSlice.actions.getSubjects(response.data));
    };

export const getMarkInformation =
  (data: OnlineExamProgressReport): AppThunk =>
    async (dispatch) => {
      const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
      dispatch(OnlineExamProgressReportSlice.actions.getMarkInformation(response.data));
    };

export const getHeader =
  (data: OnlineExamProgressReport): AppThunk =>
    async (dispatch) => {
      const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
      const child = (ExamId) => {
        return response.data.MarkInformation
          .filter((obj) => {
            return obj.ExamId === ExamId;
          })
          .map((item, index) => {
            return {
              Id: index,
              Name: response.data.Subjects.filter((obj) => {
                return obj.SubjectId === item.SubjectId;
              })[0].Name,
              Value: item.Marks + '/' + item.OutOfMarks
            };
          })
      }
      const header =
        response.data.OnlineExams.map((item, index) => {
          return {
            Id: index,
            Name: item.Name,
            Child: child(item.Id)
          };
        })
      dispatch(OnlineExamProgressReportSlice.actions.getHeader(header));
    };

export default OnlineExamProgressReportSlice.reducer
