import { createSlice } from '@reduxjs/toolkit';
import APIStudentDetails from 'src/api/StudentDetails/APIStudentDetails';
import { IGenerateTransportFeeEntriesBody, IGetStandardwiseMinMaxDOBBody, IGetStudentUIPreConditionMsgBody, IsClassTeacherBody } from 'src/interfaces/StudentDetails/IStudentDetails';
import { AppThunk } from 'src/store';

const GetStandardwiseMinMaxDOBslice = createSlice({
    name: 'GetStandardwiseMinMaxDOB',
    initialState: {
        StandardwiseMinMaxDOB: [],
        StudentUIPreConditionMsg: [],
        IsClassTeacher: [],
        IGenerateTransportFeeEntries: ''
    },
    reducers: {
        GetStandardwiseMinMaxDOB(state, action) {
            state.StandardwiseMinMaxDOB = action.payload;
        },
        GetStudentUIPreConditionMsg(state, action) {
            state.StudentUIPreConditionMsg = action.payload;
        },
        GetIsClassTeacher(state, action) {
            state.StudentUIPreConditionMsg = action.payload;
        },
        GetGenerateTransportFeeEntries(state, action) {
            state.IGenerateTransportFeeEntries = action.payload;
        }
    }
});

export const GetStandardwiseMinMaxDOB =
    (data: IGetStandardwiseMinMaxDOBBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStandardwiseMinMaxDOB(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetStandardwiseMinMaxDOB(response.data));
        };

export const GetStudentUIPreConditionMsg =
    (data: IGetStudentUIPreConditionMsgBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStudentUIPreConditionMsg(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetStudentUIPreConditionMsg(response.data));
        };

export const GetIsClassTeacher =
    (data: IsClassTeacherBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetIsClassTeacher(data);
            const responseData = response.data.CteacherListResult.map((item, i) => {
                return {

                    Result: item.Result
                };
            });
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetIsClassTeacher(responseData));
        };
export const GetGenerateTransportFeeEntries =
    (data: IGenerateTransportFeeEntriesBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetGenerateTransportFeeEntriesBody(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetGenerateTransportFeeEntries(response.data));
        };
export default GetStandardwiseMinMaxDOBslice.reducer;
