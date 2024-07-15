import { createSlice } from '@reduxjs/toolkit';
import AddSchoolNoticApi from 'src/api/AddSchoolNotic/ApiAddSchoolNotice';
import { IDeleteSchooNoticeBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import { AppThunk } from 'src/store';

const DeleteSchoolNotice = createSlice({
    name: 'School Notice',
    initialState: {
        ISDeleteSchoolNotice: [],

    },

    reducers: {
        RDeleteschoolNotice(state, action) {
            state.ISDeleteSchoolNotice = action.payload;
        },

    }
});


export const CDADeleteSchoolNotice =
    (data: IDeleteSchooNoticeBody): AppThunk =>
        async (dispatch) => {
            const response = await AddSchoolNoticApi.DeleteSchoolNotice(data);
            dispatch(DeleteSchoolNotice.actions.RDeleteschoolNotice(response.data));
        };




export default DeleteSchoolNotice.reducer;
