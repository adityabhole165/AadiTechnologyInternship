import { createSlice } from "@reduxjs/toolkit";
import LoginSchoolNoticeApi from "../../api/LoginSchoolNotice/LoginSchoolNotice"
import ISchoolnotice from 'src/interfaces/Student/LoginSchoolNotice';
import { AppThunk } from 'src/store';
import IViewschoolnotice from 'src/interfaces/Student/LoginViewSchoolNotice'

const LoginSchoolNoticeSlice = createSlice({
    name:'LoginSchoolNotice',
    initialState:{
        LoginSchoolNoticeData:[],
        LoginViewSchoolNoticeData:[],
    },
    reducers:{
        getLoginSchoolNoticeList(state,action){
            state.LoginSchoolNoticeData=action.payload.GetSchoolNoticesResult;
        },
        getLoginViewSchoolNoticeList(state,action){
            state.LoginViewSchoolNoticeData=action.payload.GetSchoolNoticesResult;
        }


    }
});


export const getLoginSchoolNotice =
(data:ISchoolnotice) :AppThunk=>
async (dispatch)=>{
    const response = await LoginSchoolNoticeApi.GetLoginSchoolNoticeList(data);
    dispatch(LoginSchoolNoticeSlice.actions.getLoginSchoolNoticeList(response.data));
};

export const getLoginViewSchoolNotice =
(data:IViewschoolnotice) :AppThunk=>
async (dispatch)=> {
    const response = await LoginSchoolNoticeApi.ViewLoginSchoolNoticeList(data);
    dispatch(LoginSchoolNoticeSlice.actions.getLoginViewSchoolNoticeList(response.data));
};

export default LoginSchoolNoticeSlice.reducer