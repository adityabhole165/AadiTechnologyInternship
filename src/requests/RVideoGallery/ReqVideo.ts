import { createSlice } from "@reduxjs/toolkit";
import VideoGalleryApi from "src/api/VideoGallery/ApiVideoGallery";
import { ICountVideoBody, IdeleteVideoBody, IDeleteVideogallaryDetails, IGetPhotoImageListBody, IGetSaveUpdateVideoBody, IGetVideoGalleryBody, IGetViewVideoListBody } from "src/interfaces/VideoGalleryInterface/IVideoGallery";
import { AppThunk } from "src/store";


const VideoSlice = createSlice({
    name: 'VideoNew',
    initialState: {
        ISGetVideoDetails: [],
        ISDeleteVideo: "",
        ISCuntVideo: [],
        ISGetViewVideoDetails: [],
        DeleteVideoGallary: '',
        ISGetPhotoImageList: [],
        SaveUpdateVideo: '',
        Loading: true
    },
    reducers: {

        RGetVideoDetails(state, action) {
            state.Loading = false;
            state.ISGetVideoDetails = action.payload;
        },

        RDeleteVideo(state, action) {
            state.ISDeleteVideo = action.payload;

        },
        DeleteViewVideoGallary(state, action) {
            state.DeleteVideoGallary = action.payload;

        },
        resetDeleteViewVideoGallary(state) {
            state.DeleteVideoGallary = "";
        },
        getSaveUpdateVideo(state, action) {
            state.Loading = false;
            state.SaveUpdateVideo = action.payload;
        },
        resetSaveUpdateVideo(state) {
            state.SaveUpdateVideo = '';
        },
        RresetDeleteVideo(state) {
            state.ISDeleteVideo = "";
        },
        RCountVideoList(state, action) {
            state.ISCuntVideo = action.payload;
        },
        RGetViewVideoDetails(state, action) {
            state.Loading = false;
            state.ISGetViewVideoDetails = action.payload;
        },
        RGetPhotoImageList(state, action) {
            state.Loading = false;
            state.ISGetPhotoImageList = action.payload;
        },
        getLoading(state, action) {
            state.Loading = true;

        }
    }
})
export const CDAVideoDetails =
    (data: IGetVideoGalleryBody): AppThunk =>
        async (dispatch) => {
            dispatch(VideoSlice.actions.getLoading(true))
            const response = await VideoGalleryApi.GetVideoDetails(data);
            const VideoDetails = response.data.map((row) => {
                return {
                    RowID: row.RowID,
                    TotalRows: row.TotalRows,
                    Video_Id: row.Video_Id,
                    videoName: row.Video_Name,
                    URLSource: row.URLSource,
                    lastUpdated: (row.Update_Date)
                }
            });
            dispatch(VideoSlice.actions.RGetVideoDetails(VideoDetails));
        }
export default VideoSlice.reducer;

export const CDADeletevideo =
    (data: IdeleteVideoBody): AppThunk =>
        async (dispatch) => {
            const response = await VideoGalleryApi.Deletevideo(data);
            dispatch(VideoSlice.actions.RDeleteVideo(response.data))
        };

export const CDAresetDeleteVideo = (): AppThunk => async (dispatch) => {
    dispatch(VideoSlice.actions.RresetDeleteVideo());
};

export const CDAGetCountVideo =
    (data: ICountVideoBody): AppThunk =>
        async (dispatch) => {
            dispatch(VideoSlice.actions.getLoading(true));
            const response = await VideoGalleryApi.GetCountVideo(data);
            const count = response.data.map((item) => {
                return {
                    TotalCount: item.TotalCount

                }
            });
            dispatch(VideoSlice.actions.RCountVideoList(count));

        }

export const getViewVideoDetails = (data: IGetViewVideoListBody): AppThunk => async (dispatch) => {
    dispatch(VideoSlice.actions.getLoading(true));
    const response = await VideoGalleryApi.GetViewVideo(data);

    const responseData = response.data.map((Item, i) => {
        return {
            id: Item.VideoId,
            VideoName: Item.VideoName,
            url: Item.URL,
            title: Item.Description,
            VideoDetailsId: Item.VideoDetailsId
        };
    });
    dispatch(VideoSlice.actions.RGetViewVideoDetails(responseData));
};

export const getPhotoImageList = (data: IGetPhotoImageListBody): AppThunk => async (dispatch) => {
    dispatch(VideoSlice.actions.getLoading(true));
    const response = await VideoGalleryApi.GetPhotoImageList(data);

    let responseData = [];
    response.data.GalleryimgsResult.map((item, i) => {
        responseData.push({
            GalleryId: item.GalleryId,
            images: item.ImagePath,
            ImageSrNo: item.ImageSrNo,
            Comment: item.Comment
        });
    });
    dispatch(VideoSlice.actions.RGetPhotoImageList(responseData));
    console.log(responseData,'images');
};
export const getSaveVideo =
    (data: IGetSaveUpdateVideoBody): AppThunk =>
        async (dispatch) => {
            dispatch(VideoSlice.actions.getLoading(true));
            const response = await VideoGalleryApi.GetSaveUpdateVideo(data);
            dispatch(VideoSlice.actions.getSaveUpdateVideo(response.data))
        }
export const resetSaveUpdateVideo =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(VideoSlice.actions.resetSaveUpdateVideo())
        }

export const DeleteViewVideoGallary =
    (data: IDeleteVideogallaryDetails): AppThunk =>
        async (dispatch) => {
            const response = await VideoGalleryApi.DeleteViewVideoGallary(data);
            dispatch(VideoSlice.actions.DeleteViewVideoGallary(response.data))
        };

export const resetDeleteViewVideoGallary = (): AppThunk => async (dispatch) => {
    dispatch(VideoSlice.actions.resetDeleteViewVideoGallary());
};
