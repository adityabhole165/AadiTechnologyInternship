import { createSlice } from '@reduxjs/toolkit';
import PhotoGallaryApi from 'src/api/PhotoGallery/PhotoGallary';
import { IManagePhotoGalleryBody, IPics, IStandardDivisionNameBody, Iimg } from 'src/interfaces/Common/PhotoGallery';
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
export default GallerySlice.reducer;
