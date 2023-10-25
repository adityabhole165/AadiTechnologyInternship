import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import { IGetAllActiveNoticesBody, IGetNoticeBoardDetailsBody } from "src/interfaces/Student/ISchoolNoticeBoard";
import SchoolNoticeApi from 'src/api/SchoolNoticeBoard/ApiSchoolNoticeBoard';



const SliceSchoolNoticeBoard = createSlice({
  name: 'schoolnotice',
  initialState: {
    SchoolNoticeBoard: [],
    AllActiveNotices:[],
    Loading: true
  },
  reducers: {
    getSchoolNoticeBoard(state, action) {
      state.SchoolNoticeBoard = action.payload.NoticeBoardDetails;
      state.Loading = false;

    },

    getAllActiveNotices(state, action) {
      state.AllActiveNotices = action.payload.GetSchoolNoticesResult;
      state.Loading = false;

    },

     getAllNoticeRecet(state) {
      state.AllActiveNotices = [];
    },
 
    getLoading(state, action) {
      state.Loading = true
      state.SchoolNoticeBoard = [];
    }
  }
});


export const getSchoolNoticeBoard =
  (data: IGetNoticeBoardDetailsBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceSchoolNoticeBoard.actions.getLoading(true));
      const response = await SchoolNoticeApi.GetNoticeBoardList(data);
      dispatch(SliceSchoolNoticeBoard.actions.getSchoolNoticeBoard(response.data));
    };

    export const getAllActiveNotices =
  (data: IGetAllActiveNoticesBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceSchoolNoticeBoard.actions.getLoading(true));
      const response = await SchoolNoticeApi.GetAllActiveNotices(data);
      dispatch(SliceSchoolNoticeBoard.actions.getAllActiveNotices(response.data));
    };

   export const getAllNoticeRecet =
    (): AppThunk =>
      async (dispatch) => {
        dispatch(SliceSchoolNoticeBoard.actions.getAllNoticeRecet());
      }




export default SliceSchoolNoticeBoard.reducer