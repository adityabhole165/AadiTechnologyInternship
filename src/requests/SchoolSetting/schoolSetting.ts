import { createSlice } from "@reduxjs/toolkit";
import SchoolSettingApi from "src/api/SchoolSetting";
import { ISchoolId,IgetModulesPermission, IGetScreensAccessPermissions } from "src/interfaces/SchoolSetting/schoolSettings";
import { AppThunk } from "src/store";

const SchoolSettingSlice = createSlice({
    name:'SchoolSetting',
    initialState:{
        SchoolSettingList:[],
        ModulesPermission:[],
        ModulesPermissionsResult:[],
    },
    reducers:{
        getSchoolSettings(state,action){
            state.SchoolSettingList=action.payload.GetSchoolSettingsResult
        },
        getModulesPermission(state,action){
            state.ModulesPermission=action.payload.GetModulesPermissionsResult
            // alert(JSON.stringify(state.ModulesPermission))
        },
        getModulesPermissionsResult(state,action){
            state.ModulesPermissionsResult=action.payload
        }

    }
});

export const getSchoolSettings =
(data: ISchoolId):AppThunk =>
async (dispatch) => {
    const response= await SchoolSettingApi.GetSchoolSettings(data)
    dispatch(SchoolSettingSlice.actions.getSchoolSettings(response.data))
};

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


export default SchoolSettingSlice.reducer