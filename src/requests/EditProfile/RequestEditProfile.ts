import { createSlice } from '@reduxjs/toolkit';
import ApiEditprofile from 'src/api/EditProfile/ApiEditProfile';
import {
  ISaveStudentPhotoBody,
  ISubmitStudentPhotoBody
} from 'src/interfaces/Student/IEditProfile';
import { AppThunk } from 'src/store';

const SliceEditProfile = createSlice({
  name: 'EditProfile',
  initialState: {
    SaveStudentPhoto: {},
    SubmitStudentPhoto: {},
    Loading: true
  },
  reducers: {
    getSaveStudentPhoto(state, action) {
      state.SaveStudentPhoto = action.payload;
      state.Loading = false;
    },
    resetMessage(state) {
      state.SaveStudentPhoto = {};
    },

    getSubmitStudentPhoto(state, action) {
      state.SubmitStudentPhoto = action.payload;
      state.Loading = false;
    },

    resetMessage1(state) {
      state.SubmitStudentPhoto = {};
    },

    getLoading(state, action) {
      state.Loading = true;
    }
  }
});

export const getSaveStudentPhoto =
  (data: ISaveStudentPhotoBody): AppThunk =>
  async (dispatch) => {
    dispatch(SliceEditProfile.actions.getLoading(true));
    const response = await ApiEditprofile.SaveStudentPhotoApi(data);
    dispatch(SliceEditProfile.actions.getSaveStudentPhoto(response.data));
  };
export const resetMessage = (): AppThunk => async (dispatch) => {
  dispatch(SliceEditProfile.actions.resetMessage());
};

export const getSubmitStudentPhoto =
  (data: ISubmitStudentPhotoBody): AppThunk =>
  async (dispatch) => {
    dispatch(SliceEditProfile.actions.getLoading(true));
    const response = await ApiEditprofile.SubmitStudentPhotoapi(data);
    dispatch(SliceEditProfile.actions.getSubmitStudentPhoto(response.data));
  };
export const resetMessage1 = (): AppThunk => async (dispatch) => {
  dispatch(SliceEditProfile.actions.resetMessage1());
};

export default SliceEditProfile.reducer;
