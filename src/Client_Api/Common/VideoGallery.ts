import { createSlice } from '@reduxjs/toolkit'
import VideoGalleryApi from 'src/Api/Common/VideoGallery';
import { AppThunk } from 'src/store';
import { IVideoList,Icomments } from 'src/Interface/Common/VideoGallery';

const VideOGallerySlice = createSlice({
    name: 'Video Gallery',
    initialState: {
        VideoList:[],
        Comments:[],
     
    },
    reducers: {
        getVideos(state,action){
          state.VideoList=action.payload.GetVideoGalleryResult;
        },
        getComments(state,action){
          state.Comments=action.payload.GetVideoGalleryCommentsResult;
        }

    }
});

      export const getVideoss =
      (data:IVideoList): AppThunk =>
      async (dispatch) => {
        const response = await VideoGalleryApi.GetVideosGallary(data);
        dispatch(VideOGallerySlice.actions.getVideos(response.data));
      };

      export const getcommentS =
      (data:Icomments): AppThunk =>
      async (dispatch) => {
        const response = await VideoGalleryApi.GetComments(data);
        dispatch(VideOGallerySlice.actions.getComments(response.data));
      };
 export default VideOGallerySlice.reducer