import { createSlice } from '@reduxjs/toolkit';
import LeaveDetailsAPI from 'src/api/LeaveDetails/ApiLeaveDetails';
import { getDateMonthYearDayDash } from 'src/components/Common/Util';
import { IGetCategoryDropdownBody, IGetDeleteLeaveBody, IGetLeaveDetailsListBody, IGetViewLeaveBody } from 'src/interfaces/LeaveDetails/ILeaveDetails';

import { AppThunk } from 'src/store';

const LeaveDetailsslice = createSlice({
    name: 'LeaveDetails',

    initialState: {

        CategoryDropdownList: [],
        LeaveDetailsList: [],
        ViewLeaveDetails: [],
        DeleteLeaveMsg: '',
        Loading: true
    },
    reducers: {

        CategoryList(state, action) {
            state.CategoryDropdownList = action.payload;
        },

        getLeaveDetailsList(state, action) {
            state.Loading = false;
            state.LeaveDetailsList = action.payload;
        },
        getDeleteLeaveMsg(state, action) {
            state.Loading = false;
            state.DeleteLeaveMsg = action.payload;
        },
        resetDeleteLeaveDetails(state) {
            state.Loading = false;
            state.DeleteLeaveMsg = '';
        },
        getViewLeaveDetails(state, action) {
            state.Loading = false;
            state.ViewLeaveDetails = action.payload
        },
        resetViewDetails(state) {
            state.ViewLeaveDetails = []
        },
        getLoading(state, action) {
            state.Loading = true;
        }
    }
});


export const getLeaveDetailList = (data: IGetLeaveDetailsListBody): AppThunk => async (dispatch) => {
    dispatch(LeaveDetailsslice.actions.getLoading(true));
    const response = await LeaveDetailsAPI.GetLeaveDetailsList(data);
    console.log(response, "response---");

    const responseData = response.data.map((Item, i) => {
        return {
            Id: Item.Id,
            Text1: Item.UserName,
            Text2: getDateMonthYearDayDash(Item.StartDate),
            Text3: getDateMonthYearDayDash(Item.EndDate),
            Text4: parseInt(Item.TotalDays),
            Text6: Item.LeaveBalance,
            Text5: Item.Description
        };
    });
    dispatch(LeaveDetailsslice.actions.getLeaveDetailsList(responseData));
};

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

export const DeleteLeaveDetails = (data: IGetDeleteLeaveBody): AppThunk => async (dispatch) => {
    dispatch(LeaveDetailsslice.actions.getLoading(true));
    const response = await LeaveDetailsAPI.GetDeleteLeaveDetails(data);
    dispatch(LeaveDetailsslice.actions.getDeleteLeaveMsg(response.data));
};

export const resetDeleteHolidayDetails = (): AppThunk => async (dispatch) => {
    dispatch(LeaveDetailsslice.actions.resetDeleteLeaveDetails());
};


export const getViewLeaveDetails =
    (data: IGetViewLeaveBody): AppThunk =>
        async (dispatch) => {
            dispatch(LeaveDetailsslice.actions.getLoading(true));
            const response = await LeaveDetailsAPI.GetViewLeaveDetails(data);
            const responseData = response.data.map((Item, i) => {
                return {
                    Id: Item.LeaveId,
                    Text1: Item.UserName,
                    Text2: getDateMonthYearDayDash(Item.StartDate),
                    Text3: getDateMonthYearDayDash(Item.EndDate),
                    Text4: parseInt(Item.TotalDays),
                    Text5: Item.Description
                }
            })
            dispatch(LeaveDetailsslice.actions.getViewLeaveDetails(responseData))
        };


export const resetViewDetails = (): AppThunk => async (dispatch) => {
    dispatch(LeaveDetailsslice.actions.resetViewDetails());
};
export default LeaveDetailsslice.reducer;
