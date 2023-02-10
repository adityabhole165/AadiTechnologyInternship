import { createSlice } from '@reduxjs/toolkit'
import ApiUploadParentPhoto from 'src/api/UploadParentPhoto/ApiUploadParentPhoto'
import { AppThunk } from 'src/store';
import {IGetParentPhotosBody, IsaveParentPhotosBody, ISubmitParentPhotoDetailsBody } from 'src/interfaces/Student/IUpoladParentPhoto';


const SliceUploadParentPhoto = createSlice({
  name: 'UploadParentPhoto',
  initialState: {
    GetParentphoto: {},
    SaveParentPhotos: {},
    SubmitParentPhotoDetails: {},
    Loading: true,

  },
  reducers: {
    getParentphoto(state, action) {
      state.GetParentphoto = action.payload.ParentPhotoDetails;
      state.Loading = false;
    },
    getSaveParentPhotos(state, action) {
      state.SaveParentPhotos = action.payload;
      state.Loading = false;
    },
    getSubmitParentPhotoDetails(state, action) {
      state.SubmitParentPhotoDetails = action.payload;
      state.Loading = false;
    },
    getLoading(state, action) {
      state.Loading = true
    }
  }
});

export const getParentphoto =
  (data: IGetParentPhotosBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceUploadParentPhoto.actions.getLoading(true));
      const response = await ApiUploadParentPhoto.GetParentPhotosApi(data)
      dispatch(SliceUploadParentPhoto.actions.getParentphoto(response.data));
    };
export const getSaveParentPhotos =
  (data: IsaveParentPhotosBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceUploadParentPhoto.actions.getLoading(true));
      const response = await ApiUploadParentPhoto.saveParentPhotosApi(data)
      dispatch(SliceUploadParentPhoto.actions.getSaveParentPhotos(response.data));
    };

export const getSubmitParentPhotoDetails =
  (data: ISubmitParentPhotoDetailsBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceUploadParentPhoto.actions.getLoading(true));
      const response = await ApiUploadParentPhoto.SubmitParentPhotoDetailsApi(data)
      dispatch(SliceUploadParentPhoto.actions.getSubmitParentPhotoDetails(response.data));
    };


export default SliceUploadParentPhoto.reducer