import { createSlice } from "@reduxjs/toolkit";
import VideoGalleryApi from "src/api/VideoGallery/ApiVideoGallery";
import { ICountVideoBody, IdeleteVideoBody, IGetVideoGalleryBody } from "src/interfaces/VideoGalleryInterface/IVideoGallery";
import { AppThunk } from "src/store";


const VideoSlice = createSlice({
    name: 'VideoNew',
    initialState: {
        ISGetVideoDetails: [],
        ISDeleteVideo: "",
        ISCuntVideo: [],
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
        RresetDeleteVideo(state) {
            state.ISDeleteVideo = "";
        },
        RCountVideoList(state, action) {
            state.ISCuntVideo = action.payload;
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