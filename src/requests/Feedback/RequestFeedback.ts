import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from 'src/store';
import ApiFeedback from 'src/api/Feedback/ApiFeedback'
import { IGetUserFeedbackBody } from 'src/interfaces/Student/IFeedback';

const SliceFeedback = createSlice({
  name: 'Feedback',
  initialState: {
    FeedbackList: [],
    Loading: true,
  },
  reducers: {
    GetuserFeedback(state, action) {
      state.Loading = false;
      state.FeedbackList = action.payload.GetUserFeedbackDetails;
    },
    getLoading (state,action) {
      state.Loading = true
      state.FeedbackList = [];
  }
  }
});

export const getuserFeedback =
  (data: IGetUserFeedbackBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceFeedback.actions.getLoading(true));
      const response = await ApiFeedback.Feedbackapi(data)
      dispatch(SliceFeedback.actions.GetuserFeedback(response.data));
    };

export default SliceFeedback.reducer