import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from 'src/store';
import { IPics, Iimg } from "src/interfaces/Common/PhotoGallery";
import { IYearList, AllAcademicYearsForSchoolResult } from 'src/interfaces/Student/PhotoGallary';
import PhotoGallaryApi from 'src/api/PhotoGallery/PhotoGallary';

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
      state.imgList = action.payload.GetImagesResult;
    },
    getYearList(state, action) {
      state.YearList = action.payload;
    },
  }
});
export const getpicS =
  (data: IPics): AppThunk =>
    async (dispatch) => {
      const response = await PhotoGallaryApi.GetPICSList(data)
      dispatch(GallerySlice.actions.getPicsList(response.data));
    };

export const getimgs =
  (data: Iimg): AppThunk =>
    async (dispatch) => {
      const response = await PhotoGallaryApi.GetimgList(data)
      dispatch(GallerySlice.actions.getimgList(response.data));
    };

export const getYearList =
  (data: IYearList): AppThunk =>
    async (dispatch) => {
      const response = await PhotoGallaryApi.GetAllAcademicYearsForSchool(data);
      const standardList =
        response.data.GetAllAcademicYearsForSchoolResult.map((item, index) => {
          return {
            Value: item.split('-')[0],
            Name: item.split('-')[0],
          }

        })
      dispatch(GallerySlice.actions.getYearList(standardList));
    };
export default GallerySlice.reducer