import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from 'src/store';
import APIFeedback from 'src/api/Feedback/ApiFeedback'
import { IGetUserFeedbackBody,ISaveFeedbackDetailsBody } from 'src/interfaces/Student/IFeedback';

const SliceFeedback = createSlice({
  name: 'Feedback',
  initialState: {
    FeedbackList: [],
    AddFeedbackList: [],
    Loading: true,
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
      state.Loading = true
      state.FeedbackList = [];
    }
  }
});

export const saveFeedbackdetails =
(data: ISaveFeedbackDetailsBody): AppThunk =>
  async (dispatch) => {
    const response = await APIFeedback.AddFeedbackapi(data)
    dispatch(SliceFeedback.actions.SaveFeedbackDetails(response.data));
  };
  
export const getuserFeedback =
  (data: IGetUserFeedbackBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceFeedback.actions.getLoading(true));
      const response = await APIFeedback.Feedbackapi(data);
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