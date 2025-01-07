import { createSlice } from "@reduxjs/toolkit";
import VideoGalleryApi from "src/api/VideoGallery/ApiVideoGallery";
import { ICountVideoBody, IdeleteVideoBody, IGetSaveUpdateVideoBody, IGetVideoGalleryBody, IGetViewVideoListBody } from "src/interfaces/VideoGalleryInterface/IVideoGallery";
import { AppThunk } from "src/store";


const VideoSlice = createSlice({
    name: 'VideoNew',
    initialState: {
        ISGetVideoDetails: [],
        ISDeleteVideo: "",
        ISCuntVideo: [],
        ISGetViewVideoDetails: [],
        DeleteVideoGallary: '',
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
        DeleteVideoGallary(state, action) {
            state.DeleteVideoGallary = action.payload;

        },
        resetDeleteVideoGallary(state) {
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
            Id: Item.VideoId,
            VideoName: Item.VideoName,
            URL: Item.URL,
            Description: Item.Description,
            VideoDetailsId: Item.VideoDetailsId
        };
    });
    dispatch(VideoSlice.actions.RGetViewVideoDetails(responseData));
};

export const getSubmitLeave =
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

export const DeletevideoGallary =
    (data: IdeleteVideoBody): AppThunk =>
        async (dispatch) => {
            const response = await VideoGalleryApi.Deletevideo(data);
            dispatch(VideoSlice.actions.DeleteVideoGallary(response.data))
        };

export const resetDeleteVideoGallary = (): AppThunk => async (dispatch) => {
    dispatch(VideoSlice.actions.resetDeleteVideoGallary());
};
