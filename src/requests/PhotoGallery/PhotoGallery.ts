import { createSlice } from '@reduxjs/toolkit';
import PhotoGallaryApi from 'src/api/PhotoGallery/PhotoGallary';
import { IDeletePhotosBody, IGetAllImagesBody, IGetPhotoCountBody, IInsertVideoGallaryBody, IManagePhotoGalleryBody, IPics, IStandardDivisionNameBody, IUpdateCommentBody, Iimg } from 'src/interfaces/Common/PhotoGallery';
import { IYearList } from 'src/interfaces/Student/PhotoGallary';
import { AppThunk } from 'src/store';

const GallerySlice = createSlice({
  name: 'Gallery',
  initialState: {
    PicsList: [],
    imgList: [],
    YearList: [],
    IStandardDivisionName: [],
    IManagePhotoGalleryMsg: '',
    IInsertVideoGallaryMsg: '',
    IGetPhotoCount: [],
    IGetAllImages: [],
    IDeletePhotoMsg: '',
    IUpdateCommentMsg: '',
    Loading: true
  },
  reducers: {
    getPicsList(state, action) {
      state.PicsList = action.payload.GetAlbumsResult;
    },
    getimgList(state, action) {
      state.imgList = action.payload;
    },
    getYearList(state, action) {
      state.YearList = action.payload;
    },
    RStandardDivisionName(state, action) {
      state.Loading = false;
      state.IStandardDivisionName = action.payload;
    },
    RManagePhotoGalleryMsg(state, action) {
      state.Loading = false;
      state.IManagePhotoGalleryMsg = action.payload;
    },
    resetManagePhotoGalleryMsg(state) {
      state.Loading = false;
      state.IManagePhotoGalleryMsg = '';
    },
    RInsertVideoGallaryMsg(state, action) {
      state.Loading = false;
      state.IInsertVideoGallaryMsg = action.payload;
    },
    resetInsertVideoGallaryMsg(state) {
      state.Loading = false;
      state.IInsertVideoGallaryMsg = '';
    },
    RGetAllImages(state, action) {
      state.Loading = false;
      state.IGetAllImages = action.payload;
    },
    RGetPhotoCount(state, action) {
      state.Loading = false;
      state.IGetPhotoCount = action.payload;
    },
    RDeletePhotoMsg(state, action) {
      state.Loading = false;
      state.IDeletePhotoMsg = action.payload;
    },
    resetDeletePhotoMsg(state) {
      state.Loading = false;
      state.IDeletePhotoMsg = '';
    },
    RUpdateCommentMsg(state, action) {
      state.Loading = false;
      state.IUpdateCommentMsg = action.payload;
    },
    resetUpdateCommentMsg(state) {
      state.Loading = false;
      state.IUpdateCommentMsg = '';
    },
    getLoading(state, action) {
      state.Loading = true;
    }
  }
});
export const getpicS =
  (data: IPics): AppThunk =>
    async (dispatch) => {
      const response = await PhotoGallaryApi.GetPICSList(data);
      dispatch(GallerySlice.actions.getPicsList(response.data));
    };

export const getimgs =
  (data: Iimg): AppThunk =>
    async (dispatch) => {
      const response = await PhotoGallaryApi.GetimgList(data);
      const responseData = response.data.GetImagesResult.map((obj) => {
        return {
          Id: obj.ImageId,
          Name: obj.Description,
          Value: localStorage.getItem('SiteURL') + '/RITeSchool/' + obj.ImagePath
        };
      });

      dispatch(GallerySlice.actions.getimgList(responseData));
    };

export const getYearList =
  (data: IYearList): AppThunk =>
    async (dispatch) => {
      const response =
        await PhotoGallaryApi.GetAllAcademicYearsForSchool(data);
      let a = response.data.map((item, i) => {
        return {
          Id: item.Academic_Year_ID,
          Name: item.YearValue,
          Value: item.Academic_Year_ID
        };
      });

      dispatch(GallerySlice.actions.getYearList(a));
    };

export const CDAStandardDivisionName =
  (data: IStandardDivisionNameBody): AppThunk =>
    async (dispatch) => {
      const response = await PhotoGallaryApi.StandardDivisionNameAPI(data);
      let GetStandardDivisionName = response.data.map((item, i) => {
        return {
          Standard_Id: item.Standard_Id,
          SchoolWise_Standard_Division_Id: item.SchoolWise_Standard_Division_Id,
          Original_Division_Id: item.Original_Division_Id,
          Division_Name: item.Division_Name,
          Original_Standard_Id: item.Original_Standard_Id,
          Standard_Name: item.Standard_Name
        }
      });
      dispatch(GallerySlice.actions.RStandardDivisionName(GetStandardDivisionName));
    };


export const CDAManagePhotoGalleryMsg = (data: IManagePhotoGalleryBody): AppThunk => async (dispatch) => {
  dispatch(GallerySlice.actions.getLoading(true));
  const response = await PhotoGallaryApi.ManagePhotoGalleryApi(data);
  dispatch(GallerySlice.actions.RManagePhotoGalleryMsg(response.data));
};

export const resetManagePhotoGalleryMsg = (): AppThunk => async (dispatch) => {
  dispatch(GallerySlice.actions.resetManagePhotoGalleryMsg());
};
export const CDAInsertVideoGallaryMsg = (data: IInsertVideoGallaryBody): AppThunk => async (dispatch) => {
  dispatch(GallerySlice.actions.getLoading(true));
  const response = await PhotoGallaryApi.InsertVideoGallaryApi(data);
  dispatch(GallerySlice.actions.RInsertVideoGallaryMsg(response.data));
};
export const resetInsertVideoGallaryMsg = (): AppThunk => async (dispatch) => {
  dispatch(GallerySlice.actions.resetInsertVideoGallaryMsg());
};

export const CDAGetAllImages =
  (data: IGetAllImagesBody): AppThunk =>
    async (dispatch) => {
      const response = await PhotoGallaryApi.GetAllImagesAPI(data);
      let AllImages = response.data.map((item, i) => {
        return {
          Gallery_Id: item.Gallery_Id,
          Image_Path: item.Image_Path,
          Image_SrNo: item.Image_SrNo,
          Comment: item.Comment
        }
      });
      dispatch(GallerySlice.actions.RGetAllImages(AllImages));
    };
export const CDAGetPhotoCount =
  (data: IGetPhotoCountBody): AppThunk =>
    async (dispatch) => {
      const response = await PhotoGallaryApi.GetPhotoCountAPI(data);
      let Count = response.data.map((item, i) => {
        return {
          Cnt: item.Cnt
        }
      });
      dispatch(GallerySlice.actions.RGetPhotoCount(Count));
    };
export const CDADeletePhotoMsg = (data: IDeletePhotosBody): AppThunk => async (dispatch) => {
  dispatch(GallerySlice.actions.getLoading(true));
  const response = await PhotoGallaryApi.DeletePhotoAPI(data);
  dispatch(GallerySlice.actions.RDeletePhotoMsg(response.data));
};
export const resetDeletePhotoMsg = (): AppThunk => async (dispatch) => {
  dispatch(GallerySlice.actions.resetDeletePhotoMsg());
};
export const CDAUpdateCommentMsg = (data: IUpdateCommentBody): AppThunk => async (dispatch) => {
  dispatch(GallerySlice.actions.getLoading(true));
  const response = await PhotoGallaryApi.UpdateCommentAPI(data);
  dispatch(GallerySlice.actions.RUpdateCommentMsg(response.data));
};
export const resetUpdateCommentMsg = (): AppThunk => async (dispatch) => {
  dispatch(GallerySlice.actions.resetUpdateCommentMsg());
};


export default GallerySlice.reducer;
