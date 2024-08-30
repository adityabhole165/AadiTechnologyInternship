import { createSlice } from '@reduxjs/toolkit';
import PhotoGallaryApi from 'src/api/PhotoGallery/PhotoGallary';
import { IPics, Iimg } from 'src/interfaces/Common/PhotoGallery';
import { IYearList } from 'src/interfaces/Student/PhotoGallary';
import { AppThunk } from 'src/store';

const GallerySlice = createSlice({
  name: 'Gallery',
  initialState: {
    PicsList: [],
    imgList: [],
    YearList: []
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
export default GallerySlice.reducer;
