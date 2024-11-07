import { createSlice } from '@reduxjs/toolkit';
import APIStudentDetails from 'src/api/StudentDetails/APIStudentDetails';
import {
    IGenerateTransportFeeEntriesBody,
    IGetAcademicDatesForStandardBody,
    IGetFormNumberBody,
    IGetStandardwiseMinMaxDOBBody,
    IGetStudentMandatoryFieldsBody,
    IGetStudentsSiblingDetailBody,
    IGetStudentUIPreConditionMsgBody,
    IsClassTeacherBody,
    IUpdateStudentTrackingDetailsBody,
} from 'src/interfaces/StudentDetails/IStudentDetails';
import { AppThunk } from 'src/store';

const GetStandardwiseMinMaxDOBslice = createSlice({
    name: 'GetStandardwiseMinMaxDOB',
    initialState: {
        StandardwiseMinMaxDOB: [],
        StudentUIPreConditionMsg: [],
        IsClassTeacher: [],
        IGenerateTransportFeeEntries: '',
        IGetFormNumber: [],
        IGetStudentsSiblingDetail: [],
        ISGetAcademicDatesForStandard: [],
        ISGetStudentMandatoryFields: [],
        IUpdateStudentTrackingDetails: ''

    },
    reducers: {
        GetStandardwiseMinMaxDOB(state, action) {
            state.StandardwiseMinMaxDOB = action.payload;
        },
        GetStudentUIPreConditionMsg(state, action) {
            state.StudentUIPreConditionMsg = action.payload;
        },
        GetIsClassTeacher(state, action) {
            state.IsClassTeacher = action.payload;
        },

        GetGenerateTransportFeeEntries(state, action) {
            state.IGenerateTransportFeeEntries = action.payload;
        },
        GetFormNumber(state, action) {
            state.IGetFormNumber = action.payload;
        },
        GetStudentsSiblingDetail(state, action) {
            state.IGetStudentsSiblingDetail = action.payload;
        },

        GetAcademicDatesForStandard(state, action) {
            state.ISGetAcademicDatesForStandard = action.payload;
        },

        GetStudentMandatoryFields(state, action) {
            state.ISGetStudentMandatoryFields = action.payload;
        },

        GetUpdateStudentTrackingDetails(state, action) {
            state.IUpdateStudentTrackingDetails = action.payload;
        },



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

export const GetFormNumber =
    (data: IGetFormNumberBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetFormNumber(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetFormNumber(response.data));
        };
export const GetStudentsSiblingDetail =
    (data: IGetStudentsSiblingDetailBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStudentsSiblingDetail(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetStudentsSiblingDetail(response.data));
        };

export const GetAcademicDatesForStandard =
    (data: IGetAcademicDatesForStandardBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetAcademicDatesForStandard(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetAcademicDatesForStandard(response.data));

        };

export const GetStudentMandatoryFields =
    (data: IGetStudentMandatoryFieldsBody): AppThunk =>
        async (dispatch) => {

            const response = await APIStudentDetails.GetStudentMandatoryFields(data);


            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetStudentMandatoryFields(GetStudentMandatoryFields));

        };


export const GetUpdateStudentTrackingDetails =
    (data: IUpdateStudentTrackingDetailsBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.UpdateStudentTrackingDetails(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetUpdateStudentTrackingDetails(response.data));
        };


export default GetStandardwiseMinMaxDOBslice.reducer;