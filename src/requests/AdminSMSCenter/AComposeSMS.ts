import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import GetMessageTemplateAdminSMSListApi from "src/api/AdminSMSCenter/AComposeSMS";
import {MessageTemplateSMSCenter} from "src/interfaces/AdminSMSCenter/ACompose_SendSMS"; 
import ACompose_SendSMS from "src/interfaces/AdminSMSCenter/ACompose_SendSMS";

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
        sendSMS(state,action) {
            state.ASendSMS = action.payload
        }
    }
});

export const getAComposeSMSTemplateList = (data:MessageTemplateSMSCenter): AppThunk => 
async(dispatch)=>{
    const response = await GetMessageTemplateAdminSMSListApi.GetMessageTemplateAdminSMSList(data);
    dispatch(AComposeSMSSlice.actions.getAComposeSMSTemplateList(response.data));
};

export const sendSMS = (data:ACompose_SendSMS): AppThunk => 
async(dispatch)=>{
    const response = await GetMessageTemplateAdminSMSListApi.SendSMS(data);
    dispatch(AComposeSMSSlice.actions.sendSMS(response.data));
};

export default AComposeSMSSlice.reducer;