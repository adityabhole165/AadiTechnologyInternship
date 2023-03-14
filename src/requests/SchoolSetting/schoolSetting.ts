import { createSlice } from "@reduxjs/toolkit";
import SchoolSettingApi from "src/api/SchoolSetting";
import { ISchoolId, IgetModulesPermission, IGetScreensAccessPermissions, IGetSettingValueBody } from "src/interfaces/SchoolSetting/schoolSettings";
import { AppThunk } from "src/store";

const SchoolSettingSlice = createSlice({
  name: 'SchoolSetting',
  initialState: {
    ModulesPermission: [],
    ModulesPermissionsResult: [],
    SchoolTrasnportIsEnabled: false,
    SubTeacher: false,
    isLibrarySchoolSetting: false
  },
  reducers: {
    getModulesPermission(state, action) {
      state.ModulesPermission = action.payload.GetModulesPermissionsResult
    },
    getModulesPermissionsResult(state, action) {
      sessionStorage.setItem("ScreensAccessPermission", JSON.stringify(action.payload))
      state.ModulesPermissionsResult = action.payload
    },
    getSchoolTrasnportIsEnabled(state, action) {
      state.SchoolTrasnportIsEnabled = action.payload;;
    },
    getSubTeacherIsEnabled(state, action) {
      state.SubTeacher = action.payload;;
    },
    getLibrarySchoolSetting(state, action) {
      state.isLibrarySchoolSetting = action.payload;;
    }


  }
});

export const getModulesPermission =
  (data: IgetModulesPermission): AppThunk =>
    async (dispatch) => {
      const response = await SchoolSettingApi.GetModulesPermissions(data)
      dispatch(SchoolSettingSlice.actions.getModulesPermission(response.data))
    };

export const getModulesPermissionsResultt =
  (data: IGetScreensAccessPermissions): AppThunk =>
    async (dispatch) => {
      const response = await SchoolSettingApi.GetScreensAccessPermission(data)
      dispatch(SchoolSettingSlice.actions.getModulesPermissionsResult(response.data))
    };


export const getGetSettingValue =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let trasnportIsEnabled = false
      data.asKey = "EnableTransportModule";
      let response = await SchoolSettingApi.GetSettingValueapi(data)
      if (response.data.GetSettingValueResult) {
        data.asKey = "EnableTransportLinkForStudentLogin";
        response = await SchoolSettingApi.GetSettingValueapi(data)
        if (response.data.GetSettingValueResult) {
          {
            trasnportIsEnabled = true;
          }
        }
      }
      dispatch(SchoolSettingSlice.actions.getSchoolTrasnportIsEnabled(trasnportIsEnabled));
    }
export const getGetSettingSubTeacher =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let subTeacherIsEnabled = false
      data.asKey = "IsEnableSubjecTeacherScreen";
      let response = await SchoolSettingApi.GetSettingValueapi(data)
      if (response.data.GetSettingValueResult) {
        {
          subTeacherIsEnabled = true;
        }
      }
      dispatch(SchoolSettingSlice.actions.getSubTeacherIsEnabled(subTeacherIsEnabled));
    }
export const getLibrarySchoolSetting =
  (data: IGetSettingValueBody): AppThunk =>
    async (dispatch) => {
      let isLibrarySchoolSetting = false
      data.asKey = "EnableLibraryModule";
      let response = await SchoolSettingApi.GetSettingValueapi(data)
      if (response.data.GetSettingValueResult) {
        data.asKey = "EnableLibraryLinkForStudentLogin";
        response = await SchoolSettingApi.GetSettingValueapi(data)
        if (sessionStorage.getItem('RoleId') === "3")
          isLibrarySchoolSetting = response.data.GetSettingValueResult.toString() === 'true'
        else
          isLibrarySchoolSetting = true;

      }
      dispatch(SchoolSettingSlice.actions.getLibrarySchoolSetting(isLibrarySchoolSetting));
    }
export default SchoolSettingSlice.reducer