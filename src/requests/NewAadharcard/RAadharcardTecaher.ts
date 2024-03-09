import { createSlice } from '@reduxjs/toolkit';
import ApiAadharcard from 'src/api/NewAadharcardTeacher/ApiAadharcard';
import { IDeleteAadharCardPhotoCopyBody, IGetUserDetailsForAadharCardNoBody, IUpdateTeacherAadharDetailsBody } from 'src/interfaces/NewAadharcardTeachers/IAadharcardTeacher';
import { AppThunk } from 'src/store';

const AadharcardTecaherSlice = createSlice({
    name: 'AddAadharCardDetails',
    initialState: {
        ISUpdateTeacherAadharDetails: '',
        ISDeleteAadharCardPhotoCopy: '',
        ISGetUserDetailsForAadharCardNo: []

    },
    reducers: {
        RUpdateTeacherAadharDetails(state, action) {
            state.ISUpdateTeacherAadharDetails = action.payload;
        },
        RDeleteAadharCardPhotoCopy(state, action) {
            state.ISDeleteAadharCardPhotoCopy = action.payload
        },
        RGetUserDetailsForAadharCardNo(state, action) {
            state.ISGetUserDetailsForAadharCardNo = action.payload
        },
    }
});
export const CDAUpdateTeacherAadharDetails =
    (data: IUpdateTeacherAadharDetailsBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiAadharcard.UpdateTeacherAadharDetailsApi(data);
            dispatch(AadharcardTecaherSlice.actions.RUpdateTeacherAadharDetails(response.data));
        };
export const CDADeleteAadharCardPhotoCopy =
    (data: IDeleteAadharCardPhotoCopyBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiAadharcard.DeleteAadharCardPhotoCopyapi(data)
            dispatch(AadharcardTecaherSlice.actions.RDeleteAadharCardPhotoCopy(response.data))
        };

export const CDAGetUserDetailsForAadharCardNo =
    (data: IGetUserDetailsForAadharCardNoBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiAadharcard.GetUserDetailsForAadharCardNoapi(data);
            dispatch(AadharcardTecaherSlice.actions.RGetUserDetailsForAadharCardNo(response.data));
        };

export default AadharcardTecaherSlice.reducer;   