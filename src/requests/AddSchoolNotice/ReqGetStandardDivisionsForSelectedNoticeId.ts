import { createSlice } from '@reduxjs/toolkit';
import AddSchoolNoticApi from 'src/api/AddSchoolNotic/ApiAddSchoolNotice';
import { IGetUserRolesForSelectedNoticeIdBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import { AppThunk } from 'src/store';

const GetStandardDivisionsForSelectedNoticeId = createSlice({
    name: 'School Notice',
    initialState: {
        ISGetStandardDivisionsForSelectedNoticeId: [],

    },

    reducers: {
        RGetUserRolesForSelectedNoticeId(state, action) {
            state.ISGetStandardDivisionsForSelectedNoticeId = action.payload;
        },

    }
});


export const CDAGetStandardDivisionsForSelectedNoticeId =
    (data: IGetUserRolesForSelectedNoticeIdBody): AppThunk =>
        async (dispatch) => {
            const response = await AddSchoolNoticApi.GetStandardDivisionsForSelectedNoticeId(data);
            dispatch(GetStandardDivisionsForSelectedNoticeId.actions.RGetUserRolesForSelectedNoticeId(response.data));
        };




export default GetStandardDivisionsForSelectedNoticeId.reducer;
