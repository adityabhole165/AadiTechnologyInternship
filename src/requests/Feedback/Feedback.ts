import { createSlice } from '@reduxjs/toolkit'
import FeedbackApi from 'src/api/Feedback/Feedback';
import { AppThunk } from 'src/store';
import { IFeedbackList } from 'src/interfaces/Student/dashboard';

const Feedbackslice = createSlice({
  name: 'Feedback',
  initialState: {
    FeedbackList:[],
    Loading:true,
  },
  reducers: {
   
    getFeedback(state, action) {
      state.FeedbackList = action.payload.GetUserFeedbackDetails;
    }

  }
});

      export const getFeedback =
      (data: IFeedbackList): AppThunk =>
        async (dispatch) => {
          const response = await FeedbackApi.Feedback(data)
          dispatch(Feedbackslice.actions.getFeedback(response.data));
        };


export default Feedbackslice.reducer
