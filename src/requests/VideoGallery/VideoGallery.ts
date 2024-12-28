import { createSlice } from '@reduxjs/toolkit';
import VideoGalleryApi from 'src/api/VideoGallery/ApiVideoGallery';

import { IVideoList, Icomments } from 'src/interfaces/Common/VideoGallery';
import { AppThunk } from 'src/store';

const VideOGallerySlice = createSlice({
  name: 'Video Gallery',
  initialState: {
    VideoList: [],
    Comments: [],
    Loading: true
  },
  reducers: {
    getVideos(state, action) {
      state.VideoList = action.payload;
      state.Loading = false;
    },
    getComments(state, action) {
      state.Comments = action.payload.GetVideoGalleryCommentsResult;
      state.Loading = false;
    },
    getLoading(state, action) {
      state.Loading = true;
      state.VideoList = [];
    }
  }
});

export const getVideoss =
  (data: IVideoList): AppThunk =>
    async (dispatch) => {
      dispatch(VideOGallerySlice.actions.getLoading(true));
      const response = await VideoGalleryApi.GetVideosGallary(data);
      const Data =
        response.data.GetVideoGalleryResult === undefined
          ? []
          : response.data.GetVideoGalleryResult.map((item, index) => {
            return {
              id: index,
              header:
                item.VideoGalleryName === null ? '' : item.VideoGalleryName,
              text1: '',
              text2: '',
              linkPath: `/Common/Comments/` + item.VideoId + '/VideoGallery2',
              FileName: ''
            };
          });

      dispatch(VideOGallerySlice.actions.getVideos(Data));
    };

export const getcommentS =
  (data: Icomments): AppThunk =>
    async (dispatch) => {
      dispatch(VideOGallerySlice.actions.getLoading(true));

      const response = await VideoGalleryApi.GetComments(data);
      dispatch(VideOGallerySlice.actions.getComments(response.data));
    };
export default VideOGallerySlice.reducer;
