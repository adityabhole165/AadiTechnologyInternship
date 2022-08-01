import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import GetReceiveSMSListApi from "src/api/AdminSMSCenter/AReceiveSMS";
import AReceiveSMSListBody from "src/Interface/AdminSMSCenter/AReceiveSMS";

const AReceiveSMSSlice = createSlice({
    name: 'AReceiveSMS',
    initialState: {
        AReceiveSMSList:[]
    },
    reducers: {
        getReceiveSMSList(state,action) {
            state.AReceiveSMSList = action.payload.GetMessagesResult
        }
    }
});

export const getReceiveSMSList = (data:AReceiveSMSListBody): AppThunk => 
async(dispatch)=>{
    const response = await GetReceiveSMSListApi.GetAReceiveSMSList(data);
    dispatch(AReceiveSMSSlice.actions.getReceiveSMSList(response.data));
};

export default AReceiveSMSSlice.reducer;