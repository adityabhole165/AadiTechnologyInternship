import { createSlice } from '@reduxjs/toolkit';
import AddSchoolNoticApi from 'src/api/AddSchoolNotic/ApiAddSchoolNotice';
import { IAddNoticeBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import { AppThunk } from 'src/store';

const AddNotice = createSlice({
    name: 'School Notice',
    initialState: {
        ISAddNotice: [],

    },

    reducers: {
        RAddNotice(state, action) {
            state.ISAddNotice = action.payload;
        },

    }
});


export const CDAddNotice =
    (data: IAddNoticeBody): AppThunk =>
        async (dispatch) => {
            const response = await AddSchoolNoticApi.AddNotice(data);
            dispatch(AddNotice.actions.RAddNotice(response.data));
        };




export default AddNotice.reducer;
