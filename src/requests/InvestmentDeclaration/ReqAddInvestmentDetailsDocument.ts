import { createSlice } from '@reduxjs/toolkit';
import AddInvestmentDetailsDocumentApi from 'src/api/InvestmentDeclaration/ApiAddInvestmentDetailsDocument';
import { ICheckPublishUnpublishDocumentBody, IDeleteInvestmentDocumentBody, IGetAllDocumentsListBody, IGetInvestmentDocumentFileBody, IGetUserInvestmentMethodDetailsBody, ISaveInvestmentDocumentBody } from 'src/interfaces/InvestmentDeclaration/IAddInvestmentDetailsDocument';
import { AppThunk } from 'src/store';
const AddInvestmentDetailsDocumentSlice = createSlice({
    name: 'InvestmentDeclarationDocument',
    initialState: {
        ISCheckPublishUnpublishDocument: '',
        ISGetUserInvestmentMethodDetails: [],
        ISSaveInvestmentDocument: '',
        ISGetAllDocumentsList: [],
        ISGetInvestmentDocumentFile: [],
        ISDeleteInvestmentDocument: ''
    },
    reducers: {
        RCheckPublishUnpublishDocument(state, action) {
            state.ISCheckPublishUnpublishDocument = action.payload
        },
        RGetUserInvestmentMethodDetails(state, action) {
            state.ISGetUserInvestmentMethodDetails = action.payload
        },
        RSaveInvestmentDocument(state, action) {
            state.ISSaveInvestmentDocument = action.payload
        },
        RGetAllDocumentsList(state, action) {
            state.ISGetAllDocumentsList = action.payload
        },
        RGetInvestmentDocumentFile(state, action) {
            state.ISGetInvestmentDocumentFile = action.payload
        },
        RDeleteInvestmentDocument(state, action) {
            state.ISDeleteInvestmentDocument = action.payload
        },
    }
});
export const getCheckPublishUnpublishDocument = (data: ICheckPublishUnpublishDocumentBody): AppThunk =>
    async (dispatch) => {
        const response = await AddInvestmentDetailsDocumentApi.CheckPublishUnpublishDocumentapi(data)
        dispatch(AddInvestmentDetailsDocumentSlice.actions.RCheckPublishUnpublishDocument(response.data));
        console.log(response, "response");


    };
export const getUserInvestmentMethodDetails = (data: IGetUserInvestmentMethodDetailsBody): AppThunk =>
    async (dispatch) => {
        const response = await AddInvestmentDetailsDocumentApi.GetUserInvestmentMethodDetailsapi(data)
        console.log(response, "----");
        dispatch(AddInvestmentDetailsDocumentSlice.actions.RGetUserInvestmentMethodDetails(response.data));
    };
export const getSaveInvestmentDocument = (data: ISaveInvestmentDocumentBody): AppThunk =>
    async (dispatch) => {
        const response = await AddInvestmentDetailsDocumentApi.SaveInvestmentDocumentapi(data)
        dispatch(AddInvestmentDetailsDocumentSlice.actions.RSaveInvestmentDocument(response.data));

    };
export const getAllDocumentsList = (data: IGetAllDocumentsListBody): AppThunk =>
    async (dispatch) => {
        const response = await AddInvestmentDetailsDocumentApi.GetAllDocumentsListapi(data)
        let DocumentList = response.data.map((item) => {
            return {
                Id: item.Id,
                Text1: item.FileName

            };
        });

        dispatch(AddInvestmentDetailsDocumentSlice.actions.RGetAllDocumentsList(DocumentList));

    };
export const getInvestmentDocumentFile = (data: IGetInvestmentDocumentFileBody): AppThunk =>
    async (dispatch) => {
        const response = await AddInvestmentDetailsDocumentApi.GetInvestmentDocumentFileapi(data)
        dispatch(AddInvestmentDetailsDocumentSlice.actions.RGetInvestmentDocumentFile(response.data));

    };
export const getDeleteInvestmentDocument = (data: IDeleteInvestmentDocumentBody): AppThunk =>
    async (dispatch) => {
        const response = await AddInvestmentDetailsDocumentApi.DeleteInvestmentDocumentapi(data)
        dispatch(AddInvestmentDetailsDocumentSlice.actions.RDeleteInvestmentDocument(response.data));

    };


export default AddInvestmentDetailsDocumentSlice.reducer;