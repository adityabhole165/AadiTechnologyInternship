import { createSlice } from '@reduxjs/toolkit'
import ApiUploadParentPhoto from 'src/api/UploadParentPhoto/ApiUploadParentPhoto'
import { AppThunk } from 'src/store';
import {IGetParentPhotosBody, IsaveParentPhotosBody, ISubmitParentPhotoDetailsBody } from 'src/interfaces/Student/IUpoladParentPhoto';


const SliceUploadParentPhoto = createSlice({
  name: 'UploadParentPhoto',
  initialState: {
    GetParentphoto: [],
    GetParentphotos: {},
    SaveParentPhotos: {},
    SubmitParentPhotoDetails: {},
    Loading: true,

  },
  reducers: {
    getParentphoto(state, action) {
      state.GetParentphoto = action.payload;
      state.Loading = false;
    },
    resetMessage(state) {
      state.SaveParentPhotos = {};
    },
    resetMessage1(state) {
      state.SubmitParentPhotoDetails = {};
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

export const getParentphoto =
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
        IsActive:true,
        ImgUrl:"/imges/father.png",
        fileName:"",
        choosefileDisable:response?.data?.ParentPhotoDetails.IsPhotosSubmitted
        },
        { 
          Id:'2',
          Name:'Mother',
          Text:response.data.ParentPhotoDetails.MotherName,
          Value:  response.data.ParentPhotoDetails.MotherPhoto,
          IsActive:false,
          ImgUrl:"/imges/mom.png",
          fileName:"",
          choosefileDisable:response?.data?.ParentPhotoDetails.IsPhotosSubmitted
           },
           {
          
            Id:'3',
            Name:'Relative',
            Text: response.data.ParentPhotoDetails.RelativeName,  
            Value: response.data.ParentPhotoDetails.RelativePhoto,
            IsActive:false,
            ImgUrl:"/imges/relative.png",
            fileName:"",
            choosefileDisable:response?.data?.ParentPhotoDetails.IsPhotosSubmitted
           },
        ];
      
      dispatch(SliceUploadParentPhoto.actions.getParentphoto(UserArray));
      dispatch(SliceUploadParentPhoto.actions.getParentphotos(response.data));
    };


  export const getSaveParentPhotos =
  (data: IsaveParentPhotosBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceUploadParentPhoto.actions.getLoading(true));
      const response = await ApiUploadParentPhoto.saveParentPhotosApi(data)
      dispatch(SliceUploadParentPhoto.actions.getSaveParentPhotos(response.data));
    };
    export const resetMessage =
    (): AppThunk =>
      async (dispatch) => {
      dispatch(SliceUploadParentPhoto.actions.resetMessage());
    }
    
export const getSubmitParentPhotoDetails =
  (data: ISubmitParentPhotoDetailsBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceUploadParentPhoto.actions.getLoading(true));
      const response = await ApiUploadParentPhoto.SubmitParentPhotoDetailsApi(data)
      dispatch(SliceUploadParentPhoto.actions.getSubmitParentPhotoDetails(response.data));
    };

    export const resetMessage1 =
    (): AppThunk =>
      async (dispatch) => {
      dispatch(SliceUploadParentPhoto.actions.resetMessage1());
    }


export default SliceUploadParentPhoto.reducer