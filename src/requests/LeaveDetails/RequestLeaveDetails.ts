import { createSlice } from '@reduxjs/toolkit';
import LeaveDetailsAPI from 'src/api/LeaveDetails/ApiLeaveDetails';
import { IGetCategoryDropdownBody, IGetDeleteLeaveBody } from 'src/interfaces/LeaveDetails/ILeaveDetails';

import { AppThunk } from 'src/store';

const LeaveDetailsslice = createSlice({
    name: 'LeaveDetails',

    initialState: {

        CategoryDropdownList: [],
        DeleteLeaveMsg: '',
        Loading: true
    },
    reducers: {

        CategoryList(state, action) {
            state.CategoryDropdownList = action.payload;
        },
        getDeleteLeaveMsg(state, action) {
            state.Loading = false;
            state.DeleteLeaveMsg = action.payload;
        },
        resetDeleteLeaveDetails(state) {
            state.Loading = false;
            state.DeleteLeaveMsg = '';
        },
        getLoading(state, action) {
            state.Loading = true;
        }
    }
});

export const CategoryDropdown =
    (data: IGetCategoryDropdownBody): AppThunk =>
        async (dispatch) => {
            const response = await LeaveDetailsAPI.GetCategoryDropdown(data);
            let abc = response.data.map((item, i) => {
                return {
                    Id: item.Id,
                    Name: item.Category,
                    Value: item.Id
                };
            });
            dispatch(LeaveDetailsslice.actions.CategoryList(abc));
        };

export const DeleteHolidayDetails = (data: IGetDeleteLeaveBody): AppThunk => async (dispatch) => {
    dispatch(LeaveDetailsslice.actions.getLoading(true));
    const response = await LeaveDetailsAPI.GetDeleteLeaveDetails(data);
    dispatch(LeaveDetailsslice.actions.getDeleteLeaveMsg(response.data));
};

export const resetDeleteHolidayDetails = (): AppThunk => async (dispatch) => {
    dispatch(LeaveDetailsslice.actions.resetDeleteLeaveDetails());
};


export default LeaveDetailsslice.reducer;
