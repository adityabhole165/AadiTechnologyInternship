import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { AppThunk } from 'src/store';
import OnlineExamProgressReport from 'src/interfaces/Student/OnlineExamProgressReport';
import OnlineExamProgressReportapi from 'src/api/Student/OnlineExamProgressReport';
import IOnlineExamProgressReportBody from 'src/interfaces/Student/OnlineExamProgressReport';


const OnlineExamProgressReportSlice = createSlice({
  name: 'OnlineExamProgressReport',
  initialState: {
    SchoolInformation: [],
    Students: [],
    OnlineExams: [],
    Subjects: [],
    MarkInformation: [],
    Details: [],
    Header: null,
    getExamDetailslist: []
  },
  reducers: {
    getStudentDetails(state, action) {
      state.Students = action.payload.Students
    },
    getSchoolInformation(state, action) {
      state.SchoolInformation = action.payload.SchoolInformation
    },
    getOnlineExams(state, action) {
      state.OnlineExams = action.payload
    },
    getOnlineExamDetails(state, action) {
      state.getExamDetailslist = action.payload
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
  (data: IOnlineExamProgressReportBody): AppThunk =>
    async (dispatch) => {
      const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
      dispatch(OnlineExamProgressReportSlice.actions.getStudentDetails(response.data));
    };

export const getSchoolInformation =
  (data: IOnlineExamProgressReportBody): AppThunk =>
    async (dispatch) => {
      const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
      dispatch(OnlineExamProgressReportSlice.actions.getSchoolInformation(response.data));
    };

export const getOnlineExams =
  (data: IOnlineExamProgressReportBody): AppThunk =>
    async (dispatch) => {
      const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
      const onlineExams = response.data.OnlineExams.map((item, index) => {
        return {
          Id: index,
          Name: item.Name,
          Value: item.Id.toString(),
          IsActive:false
        };
      })
      dispatch(OnlineExamProgressReportSlice.actions.getOnlineExams(onlineExams));
      const getSubjectName = (SubjectId) => {
        let sub = ""
        response.data.Subjects
          .map((item) => {
            if (item.SubjectId === SubjectId)
              sub = item.Name
          })
        return sub
      };
      const onlineExamDetails =
        response.data.MarkInformation.map((item, index) => {
          return {
            Id: index,
            ExamId: item.ExamId,
            Text1: getSubjectName(item.SubjectId),
            Text2: item.Marks + '/' + item.OutOfMarks,
            Text3: ((item.Marks / item.OutOfMarks) * 100).toFixed(2),
          };
        })
      dispatch(OnlineExamProgressReportSlice.actions.getOnlineExamDetails(onlineExamDetails));
      
    }
export const getSubjects =
  (data: IOnlineExamProgressReportBody): AppThunk =>
    async (dispatch) => {
      const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
      dispatch(OnlineExamProgressReportSlice.actions.getSubjects(response.data));
    };

export const getMarkInformation =
  (data: IOnlineExamProgressReportBody): AppThunk =>
    async (dispatch) => {
      const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
      dispatch(OnlineExamProgressReportSlice.actions.getMarkInformation(response.data));
    };

export const getDetails =
  (data: IOnlineExamProgressReportBody): AppThunk =>
    async (dispatch) => {
      const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data);
      dispatch(OnlineExamProgressReportSlice.actions.getDetails(response.data));
    };

export const getHeader =
  (data: IOnlineExamProgressReportBody): AppThunk =>
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
      dispatch(OnlineExamProgressReportSlice.actions.getHeader({ Header: header, Students: response.data.Students }));
    };

export default OnlineExamProgressReportSlice.reducer
