import { createSlice } from '@reduxjs/toolkit'
import VideoGalleryApi from 'src/api/VideoGallery/VideoGallery';
import { AppThunk } from 'src/store';
import { IVideoList,Icomments } from 'src/interfaces/Common/VideoGallery';

const VideOGallerySlice = createSlice({
    name: 'Video Gallery',
    initialState: {
        VideoList:[],
        Comments:[],
     
    },
    reducers: {
        getVideos(state,action){
          state.VideoList=action.payload;
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
        const Data=response.data.GetVideoGalleryResult===undefined?[]:
        response.data.GetVideoGalleryResult.map((item, index) => {
           return {
             id: index,
             header: item.VideoGalleryName===null?'':item.VideoGalleryName,
             text1: '',
             text2: '',
             linkPath: `/Common/Comments/` + item.VideoId + '/VideoGallery',
             FileName: ''
           };
         });

        dispatch(VideOGallerySlice.actions.getVideos(Data));
      };

      export const getcommentS =
      (data:Icomments): AppThunk =>
      async (dispatch) => {
        const response = await VideoGalleryApi.GetComments(data);
        dispatch(VideOGallerySlice.actions.getComments(response.data));
      };
 export default VideOGallerySlice.reducer