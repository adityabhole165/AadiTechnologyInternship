import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import GetMessageTemplateAdminSMSListApi from "src/api/AdminSMSCenter/AComposeSMS";
import {MessageTemplateSMSCenter} from "src/Interface/AdminSMSCenter/ACompose_SendSMS"; 
import ACompose_SendSMS from "src/Interface/AdminSMSCenter/ACompose_SendSMS";

const AComposeSMSSlice = createSlice({
    name: 'AComposeSMSTemplate',
    initialState: {
        AComposeSMSTemplateList:[],
        ASendSMS:[]
    },
    reducers: {
        getAComposeSMSTemplateList(state,action) {
            state.AComposeSMSTemplateList = action.payload
        },
        getSendSMS(state,action) {
            state.ASendSMS = action.payload
        }
    }
});

export const getAComposeSMSTemplateList = (data:MessageTemplateSMSCenter): AppThunk => 
async(dispatch)=>{
    const response = await GetMessageTemplateAdminSMSListApi.GetMessageTemplateAdminSMSList(data);
    dispatch(AComposeSMSSlice.actions.getAComposeSMSTemplateList(response.data));
};

export const getSendSMS = (data:ACompose_SendSMS): AppThunk => 
async(dispatch)=>{
    const response = await GetMessageTemplateAdminSMSListApi.GetSendSMS(data);
    dispatch(AComposeSMSSlice.actions.getSendSMS(response.data));
};

export default AComposeSMSSlice.reducer;