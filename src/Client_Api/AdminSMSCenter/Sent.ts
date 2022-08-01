import { createSlice } from "@reduxjs/toolkit";
import GetSentSMSApi from "src/api/AdminSMSCenter/Sent";
import ISentMsg from "src/Interface/AdminSMSCenter/Sent";
import { AppThunk } from "src/store";



const AdminSentSlice = createSlice({
    name : 'Sent',
    initialState : {
        Sent : [],
    },
    reducers : {
            getSentList(state,action){
            state.Sent = action.payload.GetScheduledSMSResult
        }
    }
});

export const getSentListt =
(data:ISentMsg) : AppThunk =>
async (dispatch) => {
    const response = await GetSentSMSApi.GetSentMsg(data);
    dispatch(AdminSentSlice.actions.getSentList(response.data));
}

export default AdminSentSlice.reducer