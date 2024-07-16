import { createSlice } from '@reduxjs/toolkit';
import AddSchoolNoticApi from 'src/api/AddSchoolNotic/ApiAddSchoolNotice';
import { IEditSchoolNoticeDetailsBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import { AppThunk } from 'src/store';

const EditSchoolNoticeDetails = createSlice({
    name: 'School Notice',
    initialState: {
        ISEditSchoolNoticeDetails: [],

    },

    reducers: {
        REditSchoolNoticeDetails(state, action) {
            state.ISEditSchoolNoticeDetails = action.payload;
        },

    }
});


export const CDAEditSchoolNoticeDetails =
    (data: IEditSchoolNoticeDetailsBody): AppThunk =>
        async (dispatch) => {
            const response = await AddSchoolNoticApi.EditSchoolNoticeDetails(data);
            dispatch(EditSchoolNoticeDetails.actions.REditSchoolNoticeDetails(response.data));
        };




export default EditSchoolNoticeDetails.reducer;
