import { createSlice } from '@reduxjs/toolkit';
import APIStudentDetails from 'src/api/StudentDetails/APIStudentDetails';
import { IGenerateTransportFeeEntriesBody, IGetBinaryImagesBody, IGetStandardwiseMinMaxDOBBody, IGetStudentMandatoryFieldsBody, IGetStudentsFormBody, IGetStudentUIPreConditionMsgBody, IRemoveStudentPhotoBody, IsAnyExamPublishedBody, IsClassTeacherBody, IStaffNameBody, IStandrdwiseStudentsDocumentBody } from 'src/interfaces/StudentDetails/IStudentDetails';
import { AppThunk } from 'src/store';
import { boolean } from 'yup/lib/locale';

const GetStandardwiseMinMaxDOBslice = createSlice({
    name: 'GetStandardwiseMinMaxDOB',
    initialState: {
        StandardwiseMinMaxDOB: [],
        StudentUIPreConditionMsg: [],
        IsClassTeacher: [],
        IGetBinaryImages: [],
        IGenerateTransportFeeEntries: '',
        IsAnyExamPublished: boolean,
        IGetStudentMandatoryFields: [],
        IStandrdwiseStudentsDocument: [],
        IStudentsForm: '',
        IStaffName: [],
        IRemoveStudentPhoto: ''
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
        GetBinaryImages(state, action) {
            state.IGetBinaryImages = action.payload;
        },
        GetGenerateTransportFeeEntries(state, action) {
            state.IGenerateTransportFeeEntries = action.payload;
        },
        GetIsAnyExamPublished(state, action) {
            state.IsAnyExamPublished = action.payload;
        },
        GetStudentMandatoryFields(state, action) {
            state.IGetStudentMandatoryFields = action.payload;
        },
        GetStandrdwiseStudentsDocument(state, action) {
            state.IStandrdwiseStudentsDocument = action.payload;
        },
        GetStudentsForm(state, action) {
            state.IStudentsForm = action.payload;
        },
        GetStaffName(state, action) {
            state.IStaffName = action.payload;
        },
        GetRemoveStudentPhoto(state, action) {
            state.IRemoveStudentPhoto = action.payload;
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
export const GetBinaryImages =
    (data: IGetBinaryImagesBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetBinaryImages(data);
            const responseData = response.data.CteacherListResult.map((item, i) => {
                return {

                    UserId: item.UserId,
                    TotalBytes: item.TotalBytes
                };
            });
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetBinaryImages(responseData));
        };
export const GetGenerateTransportFeeEntries =
    (data: IGenerateTransportFeeEntriesBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetGenerateTransportFeeEntriesBody(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetGenerateTransportFeeEntries(response.data));
        };
export const GetIsAnyExamPublished =
    (data: IsAnyExamPublishedBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetIsAnyExamPublished(data);
            const responseData = response.data.examListResult.map((item, i) => {
                return {

                    IsExamPublishedStatus: item.IsExamPublishedStatus
                };
            });
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetIsAnyExamPublished(responseData));
        };
export const GetStudentMandatoryFields =
    (data: IGetStudentMandatoryFieldsBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStudentMandatoryFields(data);
            const responseData = response.data.FileListResult.map((item, i) => {
                return {

                    FieldName: item.FieldName
                };
            });
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetStudentMandatoryFields(responseData));
        };
export const GetStandrdwiseStudentsDocument =
    (data: IStandrdwiseStudentsDocumentBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStandrdwiseStudentsDocument(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetStandrdwiseStudentsDocument(response.data));
        };
export const GetStudentsForm =
    (data: IGetStudentsFormBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStudentsForm(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetStudentsForm(response.data));
        };
export const GetStaffName =
    (data: IStaffNameBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetStaffName(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetStaffName(response.data));
        };
export const GetRemoveStudentPhoto =
    (data: IRemoveStudentPhotoBody): AppThunk =>
        async (dispatch) => {
            const response = await APIStudentDetails.GetRemoveStudentPhoto(data);
            dispatch(GetStandardwiseMinMaxDOBslice.actions.GetRemoveStudentPhoto(response.data));
        };
export default GetStandardwiseMinMaxDOBslice.reducer;
