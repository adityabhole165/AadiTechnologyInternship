import { createSlice } from '@reduxjs/toolkit';
import AddSchoolNoticApi from 'src/api/AddSchoolNotic/ApiAddSchoolNotice';
import { IGetUserRolesForSelectedNoticeIdBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import { AppThunk } from 'src/store';

const GetUserRolesForSelectedNoticeId = createSlice({
    name: 'School Notice',
    initialState: {
        ISGetUserRolesForSelectedNoticeId: [],

    },

    reducers: {
        RGetUserRolesForSelectedNoticeId(state, action) {
            state.ISGetUserRolesForSelectedNoticeId = action.payload;
        },

    }
});


export const CDAGetUserRolesForSelectedNoticeId =
    (data: IGetUserRolesForSelectedNoticeIdBody): AppThunk =>
        async (dispatch) => {
            const response = await AddSchoolNoticApi.GetUserRolesForSelectedNoticeId(data);
            dispatch(GetUserRolesForSelectedNoticeId.actions.RGetUserRolesForSelectedNoticeId(response.data));
        };




export default GetUserRolesForSelectedNoticeId.reducer;
