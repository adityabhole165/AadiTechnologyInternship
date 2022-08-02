import { createSlice } from "@reduxjs/toolkit";
import GetSMSApi from "src/api/AdminSMSCenter/SentSMS";
import ISent, { GetAllSentSMSPermissionAndCountsResult } from "src/Interface/AdminSMSCenter/SentSMS";
import { AppThunk } from "src/store";



const SentSlice = createSlice({
    name : 'SentSMS',
    initialState: {
        SentSMS: [],
    },
    reducers:{
        getSMSList (state,action){
            state.SentSMS = action.payload
        }
    }
});

export const getSMSListt =
(data: ISent) : AppThunk =>
async (dispatch) => {
    const response = await GetSMSApi.GetSentSMS(data);
    dispatch(SentSlice.actions.getSMSList(response.data));
}

export default SentSlice.reducer