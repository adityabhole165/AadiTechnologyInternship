import { createSlice } from "@reduxjs/toolkit";
import SchoolSettingApi from "src/api/SchoolSetting";
import { ISchoolId,IgetModulesPermission, IGetScreensAccessPermissions,IGetSettingValueBody } from "src/interfaces/SchoolSetting/schoolSettings";
import { AppThunk } from "src/store";

const SchoolSettingSlice = createSlice({
    name:'SchoolSetting',
    initialState:{
        ModulesPermission:[],
        ModulesPermissionsResult:[],
        SchoolTrasnportIsEnabled: false
    },
    reducers:{
        getModulesPermission(state,action){
            state.ModulesPermission=action.payload.GetModulesPermissionsResult
        },
        getModulesPermissionsResult(state,action){
            sessionStorage.setItem("ScreensAccessPermission",JSON.stringify(action.payload))
            state.ModulesPermissionsResult=action.payload
        },
        getSchoolTrasnportIsEnabled(state, action) {
          state.SchoolTrasnportIsEnabled = action.payload;;
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
(data:IGetScreensAccessPermissions): AppThunk=>
async (dispatch) =>{
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
export default SchoolSettingSlice.reducer