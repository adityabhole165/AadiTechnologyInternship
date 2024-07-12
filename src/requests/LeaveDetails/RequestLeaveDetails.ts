import { createSlice } from '@reduxjs/toolkit';
import LeaveDetailsAPI from 'src/api/LeaveDetails/ApiLeaveDetails';
import { getDateMonthYearDayDash } from 'src/components/Common/Util';
import { IGetAcademicYearBody, IGetAllReportingUsersBody, IGetCategoryDropdownBody, IGetDeleteLeaveBody, IGetLeaveDetailsListBody, IGetStatusDropdownBody, IGetViewLeaveBody } from 'src/interfaces/LeaveDetails/ILeaveDetails';

import { AppThunk } from 'src/store';

const LeaveDetailsslice = createSlice({
    name: 'LeaveDetails',

    initialState: {
        AcademicYearDropdown: [],
        CategoryDropdownList: [],
        StatusList: [],
        LeaveDetailsList: [],
        AllReportingUsers: [],
        ViewLeaveDetails: [],
        DeleteLeaveMsg: '',
        Loading: true
    },
    reducers: {
        getAcademicYear(state, action) {
            state.AcademicYearDropdown = action.payload;
        },
        CategoryList(state, action) {
            state.CategoryDropdownList = action.payload;
        },
        StatusDropdownList(state, action) {
            state.StatusList = action.payload;
        },

        getLeaveDetailsList(state, action) {
            state.Loading = false;
            state.LeaveDetailsList = action.payload;
        },
        getAllReportingUsers(state, action) {
            state.Loading = false;
            state.AllReportingUsers = action.payload;
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
            Text4: Item.Description,
            Text5: Item.TotalDays,
            Text6: Item.LeaveName,
            Text7: Item.LeaveBalance,
            ListUserId: Item.UserId,
            StatusId: Item.StatusId,
            IsApprovedByApprover: Item.IsApprovedByApprover,
            Status: Item.Status,
            TotalRows: Item.TotalRows

        };
    });
    dispatch(LeaveDetailsslice.actions.getLeaveDetailsList(responseData));
};

export const getAllReportingUsers = (data: IGetAllReportingUsersBody): AppThunk => async (dispatch) => {
    dispatch(LeaveDetailsslice.actions.getLoading(true));
    const response = await LeaveDetailsAPI.GetAllReportingUsers(data);
    console.log(response, "response---");

    const responseData = response.data.map((Item, i) => {
        return {
            Id: Item.UserId,
            Text1: Item.UserName,
            Text2: Item.ReportingParameterName,
            Text3: Item.ReportingPrameterId,
            Text4: Item.ReportingParameterName,
            Text5: Item.ReportingId
        };
    });
    dispatch(LeaveDetailsslice.actions.getAllReportingUsers(responseData));
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


export const AcademicYearDropdown =
    (data: IGetAcademicYearBody): AppThunk =>
        async (dispatch) => {
            const response = await LeaveDetailsAPI.GetAcademicYearDropdown(data);
            let abc = [{ Id: '0', Name: '-- Select --', Value: '0' }];
            console.log(response, 'response')
            response.data.map((item, i) => {
                abc.push({
                    Id: item.Academic_Year_ID,
                    Name: item.YearValue,
                    Value: item.Academic_Year_ID
                });
            });
            // console.log(academicYear, 'academicYear')
            dispatch(LeaveDetailsslice.actions.getAcademicYear(abc));

        };

export const StatusDropdown =
    (data: IGetStatusDropdownBody): AppThunk =>
        async (dispatch) => {
            const response = await LeaveDetailsAPI.GetStatusDropdown(data);
            let abc = response.data.map((item, i) => {
                return {
                    Id: item.StatusId,
                    Name: item.Status,
                    Value: item.StatusId
                };
            });
            dispatch(LeaveDetailsslice.actions.StatusDropdownList(abc));
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
                    Id: Item.Id,
                    Text1: Item.UserName,
                    Text2: getDateMonthYearDayDash(Item.StartDate),
                    Text3: getDateMonthYearDayDash(Item.EndDate),
                    Text4: parseInt(Item.TotalDays),
                    Text5: Item.Description,
                    UserId: Item.UserId
                }
            })
            dispatch(LeaveDetailsslice.actions.getViewLeaveDetails(responseData))
        };


export const resetViewDetails = (): AppThunk => async (dispatch) => {
    dispatch(LeaveDetailsslice.actions.resetViewDetails());
};
export default LeaveDetailsslice.reducer;
