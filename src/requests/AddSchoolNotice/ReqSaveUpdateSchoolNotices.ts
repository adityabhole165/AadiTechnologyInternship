import { createSlice } from '@reduxjs/toolkit';
import AddSchoolNoticApi from 'src/api/AddSchoolNotic/ApiAddSchoolNotice';
import { ISaveUpdateSchoolNoticeBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import { AppThunk } from 'src/store';

const SaveUpdateSchoolNotice = createSlice({
    name: 'School Notice',
    initialState: {
        ISSaveUpdateSchoolNotice: [],

    },

    reducers: {
        RSaveUpdateSchoolNotice(state, action) {
            state.ISSaveUpdateSchoolNotice = action.payload;
        },

    }
});


export const CDASaveUpdateSchoolNotice =
    (data: ISaveUpdateSchoolNoticeBody): AppThunk =>
        async (dispatch) => {
            const response = await AddSchoolNoticApi.SaveUpdateSchoolNotice(data);
            dispatch(SaveUpdateSchoolNotice.actions.RSaveUpdateSchoolNotice(response.data));
        };




export default SaveUpdateSchoolNotice.reducer;
