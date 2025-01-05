import { createSlice } from '@reduxjs/toolkit';
import { ISchoolList } from 'src/interfaces/Authentication/SchoolList';
import { ISchoolSettings } from 'src/interfaces/Authentication/SchoolSettings';
import { AppThunk } from 'src/store';
import SchoolListApi from '../../api/Authentication/SchoolList';

const SchoolListslice = createSlice({
  name: 'SchoolList',
  initialState: {
    SchoolList: [],
    SchoolSettings: {},
    MenuList: [],
  },
  reducers: {
    getSchoolList(state, action) {
      state.SchoolList = action.payload.GetAllSchoolsResult;
    },
    getSchoolSettingsValue(state, action) {
      state.SchoolSettings = action.payload.GetSchoolSettingsResult;
    },
    getMenuList(state, action) {
      state.MenuList = action.payload;
    }
  }
});

export const getSchoolList =
  (data: ISchoolList): AppThunk =>
    async (dispatch) => {
      const response = await SchoolListApi.SchoolList(data);
      dispatch(SchoolListslice.actions.getSchoolList(response.data));
    };

export const UpdateMenuList =
  (data: any): AppThunk =>
    async (dispatch) => {
      dispatch(SchoolListslice.actions.getMenuList(data));
    };

export const getSchoolSettingsValue =
  (data: ISchoolSettings): AppThunk =>
    async (dispatch) => {
      const response = await SchoolListApi.SchoolSettings(data);
      dispatch(SchoolListslice.actions.getSchoolSettingsValue(response.data));
    };

export default SchoolListslice.reducer;
