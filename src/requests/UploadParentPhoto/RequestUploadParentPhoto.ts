import { createSlice } from '@reduxjs/toolkit'
import ApiUploadParentPhoto from 'src/api/UploadParentPhoto/ApiUploadParentPhoto'
import { AppThunk } from 'src/store';
import {IGetParentPhotosBody, IsaveParentPhotosBody, ISubmitParentPhotoDetailsBody } from 'src/interfaces/Student/IUpoladParentPhoto';


const SliceUploadParentPhoto = createSlice({
  name: 'UploadParentPhoto',
  initialState: {
    GetParentphoto: [],
    GetParentphotos: [],
    SaveParentPhotos: {},
    SubmitParentPhotoDetails: {},
    Loading: true,

  },
  reducers: {
    getParentphoto(state, action) {
      state.GetParentphoto = action.payload;
      state.Loading = false;
    },
    getParentphotos(state, action) {
      state.GetParentphotos = action.payload.ParentPhotoDetails;
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

export const getParentphoto1 =
  (data: IGetParentPhotosBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceUploadParentPhoto.actions.getLoading(true));
      const response = await ApiUploadParentPhoto.GetParentPhotosApi(data)
      const UserArray = [ 
        { 
        Id:'1',
        Name:'Father',
        Text:response?.data?.ParentPhotoDetails.FatherName,
        Value: response.data.ParentPhotoDetails.FatherPhoto,
        IsActive:true
        },
        { 
          Id:'2',
          Name:'Mother',
          Text:response.data.ParentPhotoDetails.MotherName,
          Value:  response.data.ParentPhotoDetails.MotherPhoto,
          IsActive:false
           },
           {
          
            Id:'3',
            Name:'relative',
            Text: response.data.ParentPhotoDetails.RelativeName,  
            Value: response.data.ParentPhotoDetails.RelativePhoto,
            IsActive:false
           },
        ];
      console.log("reducer",UserArray);
      
      dispatch(SliceUploadParentPhoto.actions.getParentphoto(UserArray));
      dispatch(SliceUploadParentPhoto.actions.getParentphotos(response.data));
    };

export const getParentphoto =
  (data: IGetParentPhotosBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceUploadParentPhoto.actions.getLoading(true));
      const response = await ApiUploadParentPhoto.GetParentPhotosApi(data)
      const ParentPhotoList = {
        Text1:response?.data?.ParentPhotoDetails.FatherName,
        Text2:response.data.ParentPhotoDetails.MotherName,
        Text3:response.data.ParentPhotoDetails.RelativeName,
        Text4:response.data.ParentPhotoDetails.FatherPhoto,
        Text5:response.data.ParentPhotoDetails.MotherPhoto,
        Text6:response.data.ParentPhotoDetails.RelativePhoto,
      }
      const UserArray = [ 
        { index:0,
        id:'1',
        tabTitle:'Father',
        title:response?.data?.ParentPhotoDetails.FatherName,
         ImageUrl: response.data.ParentPhotoDetails.FatherPhoto,
        },
        { index:1,
          id:'2',
          tabTitle:'Mother',
          title:response.data.ParentPhotoDetails.MotherName,
          ImageUrl:  response.data.ParentPhotoDetails.MotherPhoto,
           },
           {
            index:2,
            id:'3',
            tabTitle:'relative',
           title: response.data.ParentPhotoDetails.RelativeName,  
           
           ImageUrl: response.data.ParentPhotoDetails.RelativePhoto,
           },
        ];
      console.log("reducer",UserArray);
      
      dispatch(SliceUploadParentPhoto.actions.getParentphoto(UserArray));
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