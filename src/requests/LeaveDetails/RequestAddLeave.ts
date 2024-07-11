import { createSlice } from '@reduxjs/toolkit';
import AddLeaveDetailsAPI from 'src/api/LeaveDetails/ApiAddLeave';
import { IGetLeaveBalanceBody } from 'src/interfaces/LeaveDetails/IAddLeaveDetails';
import { AppThunk } from 'src/store';



const AddLeaveDetailsslice = createSlice({
    name: 'AddLeaveDetails',

    initialState: {
        LeaveBalanceNote: [],
        Loading: true
    },
    reducers: {
        getLeaveBalance(state, action) {
            state.LeaveBalanceNote = action.payload;
        },
        getLoading(state, action) {
            state.Loading = true;
        }
    }
});

export const getLeaveBalance = (data: IGetLeaveBalanceBody): AppThunk => async (dispatch) => {
    dispatch(AddLeaveDetailsslice.actions.getLoading(true));
    const response = await AddLeaveDetailsAPI.GetLeaveBalanceNote(data);

    const LeavebalanceNt = response.data.map((Item, i) => {
        return {
            Id: Item.LeaveId,
            Text1: Item.ShortName,
            Text2: Item.LeaveBalance,
        };
        
    });
    dispatch(AddLeaveDetailsslice.actions.getLeaveBalance(LeavebalanceNt));
};


export default AddLeaveDetailsslice.reducer;
