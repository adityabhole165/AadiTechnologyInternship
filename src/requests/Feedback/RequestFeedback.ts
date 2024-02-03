import { createSlice } from '@reduxjs/toolkit';
import APIFeedback from 'src/api/Feedback/ApiFeedback';
import { getDateFormatFeedback } from 'src/components/Common/Util';
import {
  IGetUserFeedbackBody,
  ISaveFeedbackDetailsBody
} from 'src/interfaces/Student/IFeedback';
import { AppThunk } from 'src/store';

const SliceFeedback = createSlice({
  name: 'Feedback',
  initialState: {
    FeedbackList: [],
    AddFeedbackList: {},
    Loading: false
  },
  reducers: {
    GetuserFeedback(state, action) {
      state.Loading = false;
      state.FeedbackList = action.payload;
    },
    SaveFeedbackDetails(state, action) {
      state.Loading = false;
      state.AddFeedbackList = action.payload;
    },
    getLoading(state, action) {
      state.Loading = true;
      state.FeedbackList = [];
    },
    removeSuccessMessage(state) {
      state.AddFeedbackList = {};
    }
  }
});

export const saveFeedbackdetails =
  (data: ISaveFeedbackDetailsBody): AppThunk =>
  async (dispatch) => {
    dispatch(SliceFeedback.actions.getLoading(true));
    const response = await APIFeedback.AddFeedbackapi(data);
    dispatch(SliceFeedback.actions.SaveFeedbackDetails(response.data));
  };

export const removeSuccessMessage = (): AppThunk => async (dispatch) => {
  dispatch(SliceFeedback.actions.removeSuccessMessage());
};
export const getuserFeedback =
  (data: IGetUserFeedbackBody): AppThunk =>
  async (dispatch) => {
    dispatch(SliceFeedback.actions.getLoading(true));
    const response = await APIFeedback.Feedbackapi(data);
    const FeedbackList = response.data.GetUserFeedbackDetails.map(
      (item, index) => {
        let date = item.Date.split(' ')[0];
        let time = item.Date.replace(date + ' ', '');
        return {
          id: index,
          Header: item.UserName,
          Text1: time,
          Text2: getDateFormatFeedback(item.Date),
          Text3: item.Text
        };
      }
    );
    dispatch(SliceFeedback.actions.GetuserFeedback(FeedbackList));
  };

export default SliceFeedback.reducer;
