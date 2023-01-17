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
      state.FeedbackList = action.payload;
    },
    getLoading(state, action) {
      state.Loading = true
      state.FeedbackList = [];
    }
  }
});

export const getuserFeedback =
  (data: IGetUserFeedbackBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceFeedback.actions.getLoading(true));
      const response = await ApiFeedback.Feedbackapi(data);
      const FeedbackList =
        response.data.GetUserFeedbackDetails.map((item, index) => {
          let date = item.Date.split(" ")[0];
          let time = item.Date.replace(date+" ","");
          const day = new Date(date).getDate();
          const month = new Date(date).toLocaleString('default',{month:"short"});
          const year = new Date(date).getFullYear();
          const newdate= `${day} ${month} ${year}`
          return {
           id:index,
           Header:item.UserName,
           Text1:time,
           Text2:newdate,
           Text3:item.Text
          }
        })
      dispatch(SliceFeedback.actions.GetuserFeedback(FeedbackList));
    };

export default SliceFeedback.reducer