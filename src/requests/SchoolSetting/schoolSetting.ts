import { createSlice } from "@reduxjs/toolkit";
import SchoolSettingApi from "src/api/SchoolSetting";
import { ISchoolId,IgetModulesPermission, IGetScreensAccessPermissions } from "src/interfaces/SchoolSetting/schoolSettings";
import { AppThunk } from "src/store";

const SchoolSettingSlice = createSlice({
    name:'SchoolSetting',
    initialState:{
        ModulesPermission:[],
        ModulesPermissionsResult:[],    
    },
    reducers:{
        getModulesPermission(state,action){
            state.ModulesPermission=action.payload.GetModulesPermissionsResult
        },
        getModulesPermissionsResult(state,action){
            state.ModulesPermissionsResult=action.payload
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


export default SchoolSettingSlice.reducer