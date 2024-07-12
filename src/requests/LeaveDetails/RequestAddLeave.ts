import { createSlice } from '@reduxjs/toolkit';
import AddLeaveDetailsAPI from 'src/api/LeaveDetails/ApiAddLeave';
import { IGetLeaveBalanceBody, IGetLeaveTypeDropdownBody } from 'src/interfaces/LeaveDetails/IAddLeaveDetails';
import { AppThunk } from 'src/store';



const AddLeaveDetailsslice = createSlice({
    name: 'AddLeaveDetails',

    initialState: {
        LeaveBalanceNote: [],
        LeaveTypeDropdown: [],
        Loading: true
    },
    reducers: {
        getLeaveBalance(state, action) {
            state.LeaveBalanceNote = action.payload;
        },
        getLeaveType(state, action) {
            state.LeaveTypeDropdown = action.payload;
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


export const LeaveTypeDropdown =
    (data: IGetLeaveTypeDropdownBody): AppThunk =>
        async (dispatch) => {
            const response = await AddLeaveDetailsAPI.GetLeaveTypeDropdown(data);
            let abc = [{ Id: '0', Name: '-- Select --', Value: '0' }];
            console.log(response, 'response')
            response.data.map((item, i) => {
                abc.push({
                    Id: item.LeaveId,
                    Name: item.ShortName,
                    Value: item.LeaveId
                });
            });
            // console.log(academicYear, 'academicYear')
            dispatch(AddLeaveDetailsslice.actions.getLeaveType(abc));

        };
export default AddLeaveDetailsslice.reducer;
