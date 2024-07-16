import { createSlice } from '@reduxjs/toolkit';
import AddSchoolNoticApi from 'src/api/AddSchoolNotic/ApiAddSchoolNotice';
import { IGetAllClassesAndDivisionsBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import { AppThunk } from 'src/store';

const GetAllClassesAndDivisions = createSlice({
    name: 'School Notice',
    initialState: {
        ISGetAllClassesAndDevision: [],

    },

    reducers: {
        RGetAllClassesAndDivisions(state, action) {
            state.ISGetAllClassesAndDevision = action.payload;
        },

    }
});


export const CDAGetAllClassesAndDivisions =
    (data: IGetAllClassesAndDivisionsBody): AppThunk =>
        async (dispatch) => {
            const response = await AddSchoolNoticApi.GetAllClassesAndDivisions(data);
            dispatch(GetAllClassesAndDivisions.actions.RGetAllClassesAndDivisions(response.data));
        };




export default GetAllClassesAndDivisions.reducer;
