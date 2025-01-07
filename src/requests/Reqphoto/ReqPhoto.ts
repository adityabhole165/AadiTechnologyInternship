import { createSlice } from "@reduxjs/toolkit";
import PhotoGallaryApi from "src/api/PhotoGallery/PhotoGallary";
import { IDeletePhotoBody, IGetCountBody, IGetPhotoDetailsBody } from "src/interfaces/Common/PhotoGallery";
import { AppThunk } from "src/store";

const PhotoSlice = createSlice({
    name: 'Photo',

    initialState: {
        ISGetPhotoDetils: [],
        ISDeletePhoto: "",
        ISCount: [],
        Loading: true
    },

    reducers: {
        RGetPhotoDetails(state, action) {
            state.Loading = false;
            state.ISGetPhotoDetils = action.payload
        },
        RCountPhotoList(state, action) {

            state.ISCount = action.payload;
        },
        RDeletePhoto(state, action) {
            state.ISDeletePhoto = action.payload;
        },
        RresetDeletePhoto(state) {
            state.ISDeletePhoto = "";
        },
        getLoading(state, action) {
            state.Loading = true;
            // state.ISGetPhotoDetils = [];
        }
    }
})
//photodetails
export const CDAGetPhotoDetails =
    (data: IGetPhotoDetailsBody): AppThunk =>
        async (dispatch) => {
            dispatch(PhotoSlice.actions.getLoading(true));
            const response = await PhotoGallaryApi.GetPhotodetails(data);
            const PhotoDetails = response.data.map((item) => {
                return {
                    RowID: item.RowID,
                    TotalRows: item.TotalRows,
                    galleryName: item.Gallery_Name,
                    className: item.Classes ? item.Classes : "-",
                    // className: item.Classes,
                    lastUpdated: (item.Update_Date)


                }
            });
            dispatch(PhotoSlice.actions.RGetPhotoDetails(PhotoDetails));

        }
export const CDAGetCount =
    (data: IGetCountBody): AppThunk =>
        async (dispatch) => {
            dispatch(PhotoSlice.actions.getLoading(true));
            const response = await PhotoGallaryApi.GetCount(data);
            const count = response.data.map((item) => {
                return {
                    TotalRecordCount: item.TotalRecordCount

                }
            });
            dispatch(PhotoSlice.actions.RCountPhotoList(count));

        }
//deletePhotoGallery
export const CDADeletePhoto =
    (data: IDeletePhotoBody): AppThunk =>
        async (dispatch) => {
            const response = await PhotoGallaryApi.DeletePhoto(data);
            dispatch(PhotoSlice.actions.RDeletePhoto(response.data))
        };

export const resetDeletePhoto = (): AppThunk => async (dispatch) => {
    dispatch(PhotoSlice.actions.RresetDeletePhoto());
};

export default PhotoSlice.reducer;