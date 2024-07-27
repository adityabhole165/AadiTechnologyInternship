import {
    ICheckPublishUnpublishDocumentBody,
    IDeleteInvestmentDocumentBody,
    IGetAllDocumentsListBody, IGetAllDocumentsListResult,
    IGetInvestmentDocumentFileBody, IGetInvestmentDocumentFileResult,
    IGetUserInvestmentMethodDetailsBody, IGetUserInvestmentMethodDetailsResult,
    ISaveInvestmentDocumentBody
} from 'src/interfaces/InvestmentDeclaration/IAddInvestmentDetailsDocument';
import http from '../../requests/SchoolService/schoolServices';

const CheckPublishUnpublishDocumentapi = (data: ICheckPublishUnpublishDocumentBody) => {
    return http.post<string>('Teacher/CheckPublishUnpublishDocument', data);
};
const GetUserInvestmentMethodDetailsapi = (data: IGetUserInvestmentMethodDetailsBody) => {
    return http.post<IGetUserInvestmentMethodDetailsResult>('Teacher/GetUserInvestmentMethodDetails', data);
};
const SaveInvestmentDocumentapi = (data: ISaveInvestmentDocumentBody) => {
    return http.post<string>('Teacher/SaveInvestmentDocument', data);
};
const GetAllDocumentsListapi = (data: IGetAllDocumentsListBody) => {
    return http.post<IGetAllDocumentsListResult[]>('Teacher/GetAllDocumentsList', data);
};
const GetInvestmentDocumentFileapi = (data: IGetInvestmentDocumentFileBody) => {
    return http.post<IGetInvestmentDocumentFileResult>('Teacher/GetInvestmentDocumentFile', data);
};
const DeleteInvestmentDocumentapi = (data: IDeleteInvestmentDocumentBody) => {
    return http.post<string>('Teacher/DeleteInvestmentDocument', data);
};
const AddInvestmentDetailsDocumentApi = {
    CheckPublishUnpublishDocumentapi,
    GetUserInvestmentMethodDetailsapi,
    SaveInvestmentDocumentapi,
    GetAllDocumentsListapi,
    GetInvestmentDocumentFileapi,
    DeleteInvestmentDocumentapi

}
export default AddInvestmentDetailsDocumentApi;