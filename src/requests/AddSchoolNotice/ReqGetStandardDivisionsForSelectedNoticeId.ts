import { createSlice } from '@reduxjs/toolkit';
import AddSchoolNoticApi from 'src/api/AddSchoolNotic/ApiAddSchoolNotice';
import { IGetStandardDivisionsForSelectedNoticeIdBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import { AppThunk } from 'src/store';

const GetStandardDivisionsForSelectedNoticeId = createSlice({
    name: 'School Notice',
    initialState: {
        ISGetStandardDivisionsForSelectedNoticeId: [],

    },

    reducers: {
        RGetStandardDivisionsForSelectedNoticeId(state, action) {
            state.ISGetStandardDivisionsForSelectedNoticeId = action.payload;
        },

    }
});


export const CDAGetStandardDivisionsForSelectedNoticeId =
    (data: IGetStandardDivisionsForSelectedNoticeIdBody): AppThunk =>
        async (dispatch) => {
            const response = await AddSchoolNoticApi.GetStandardDivisionsForSelectedNoticeId(data);
            dispatch(GetStandardDivisionsForSelectedNoticeId.actions.RGetStandardDivisionsForSelectedNoticeId(response.data));
        };




export default GetStandardDivisionsForSelectedNoticeId.reducer;
