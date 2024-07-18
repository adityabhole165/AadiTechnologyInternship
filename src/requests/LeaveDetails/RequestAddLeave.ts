import { createSlice } from '@reduxjs/toolkit';
import AddLeaveDetailsAPI from 'src/api/LeaveDetails/ApiAddLeave';
import { IGetIsValidateLeaveDateBody, IGetLeaveBalanceBody, IGetLeaveTypeDropdownBody, IGetSubmitLeaveBody } from 'src/interfaces/LeaveDetails/IAddLeaveDetails';
import { AppThunk } from 'src/store';



const AddLeaveDetailsslice = createSlice({
    name: 'AddLeaveDetails',

    initialState: {
        LeaveBalanceNote: [],
        LeaveTypeDropdown: [],
        SubmitLeave: '',
        StartDateEndDateValidations: undefined,
        Loading: true
    },
    reducers: {
        getLeaveBalance(state, action) {
            state.LeaveBalanceNote = action.payload;
        },
        getLeaveType(state, action) {
            state.LeaveTypeDropdown = action.payload;
        },

        getSubmitLeave(state, action) {
            state.Loading = false;
            state.SubmitLeave = action.payload;
        },
        resetSubmitLeave(state) {
            state.SubmitLeave = '';
        },
        GetStartDateEndDateLeaveValidation(state, action) {
            state.StartDateEndDateValidations = action.payload;
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
            dispatch(AddLeaveDetailsslice.actions.getLeaveType(abc));

        };

export const getSubmitLeave =
    (data: IGetSubmitLeaveBody): AppThunk =>
        async (dispatch) => {
            dispatch(AddLeaveDetailsslice.actions.getLoading(true));
            const response = await AddLeaveDetailsAPI.SubmitLeave(data);
            dispatch(AddLeaveDetailsslice.actions.getSubmitLeave(response.data))
        }
export const resetSubmitLeave =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(AddLeaveDetailsslice.actions.resetSubmitLeave())
        }

export const StartDateEndDateValidations =
    (data: IGetIsValidateLeaveDateBody): AppThunk =>
        async (dispatch) => {
            dispatch(AddLeaveDetailsslice.actions.getLoading(true));
            const response = await AddLeaveDetailsAPI.GetStartDateEndDateValidation(data);
            dispatch(AddLeaveDetailsslice.actions.GetStartDateEndDateLeaveValidation(response.data))
        }

export default AddLeaveDetailsslice.reducer;
