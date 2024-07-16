import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import AddSchoolNoticApi from 'src/api/AddSchoolNotic/ApiAddSchoolNotice';
import { IUpdateSelectSchoolNoticeBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import { AppThunk } from 'src/store';

const UpdateSelectNotice = createSlice({
    name: 'School Notice',
    initialState: {
        ISUpdateSelectNotice: [],

    },

    reducers: {
        RUpadteSelectNotice(state, action) {
            state.ISUpdateSelectNotice = action.payload;
        },

    }
});


export const CDAUpdatSelectNotice =
    (data: IUpdateSelectSchoolNoticeBody): AppThunk =>
        async (dispatch) => {
            const response = await AddSchoolNoticApi.UpdeteSelecteSchoolNotice(data);
            dispatch(UpdateSelectNotice.actions.RUpadteSelectNotice(response.data)
            );
            if (response.status === 200) {
                toast.success("Selected notices saved successfully.");

            }
        };




export default UpdateSelectNotice.reducer;
