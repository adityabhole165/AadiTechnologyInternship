import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import OnlineExamProgressReportapi from 'src/api/Student/OnlineExamProgressReport';
import OnlineExamProgressReport from 'src/interfaces/Student/OnlineExamProgressReport'


const OnlineExamProgressReportSlice = createSlice({
    name: 'OnlineProgressReport',
    initialState: {
        GetOnlineProgressReport:[],
        // SchoolInformation:{},
        // Students:{},
        // OnlineExams:{},
        // Subjects:{},
        // MarkInformation:{},
        Loading: true,
    },
    reducers: {
        getOnlineProgressReport(state, action) {
            state.GetOnlineProgressReport = action.payload;
            state.Loading = false;
        },
        getLoading(state, action) {
            state.Loading = true
        }
    }
});


export const getOnlineProgressReport =
(data: OnlineExamProgressReport): AppThunk =>
  async (dispatch) => {
    dispatch(OnlineExamProgressReportSlice.actions.getLoading(true));
    const response = await OnlineExamProgressReportapi.getOnlineExamProgressReport(data)
    dispatch(OnlineExamProgressReportSlice.actions.getOnlineProgressReport(response.data));
  };

  export default OnlineExamProgressReportSlice.reducer;