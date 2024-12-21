import { createSlice } from "@reduxjs/toolkit";
import PhotoGallaryApi from "src/api/PhotoGallery/PhotoGallary";
import { IDeletePhotoBody, IGetPhotoDetailsBody } from "src/interfaces/Common/PhotoGallery";
import { AppThunk } from "src/store";

const PhotoSlice = createSlice({
    name: 'Photo',

    initialState: {
        ISGetPhotoDetils: [],
        ISDeletePhoto: "",
        Loading: true
    },

    reducers: {
        RGetPhotoDetails(state, action) {
            state.Loading = false;
            state.ISGetPhotoDetils = action.payload
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
                    galleryName: item.Gallery_Name,
                    className: item.Classes,
                    lastUpdated: item.Update_Date


                }
            });
            dispatch(PhotoSlice.actions.RGetPhotoDetails(PhotoDetails));
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