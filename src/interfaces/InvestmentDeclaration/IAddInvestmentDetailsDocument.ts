export interface ICheckPublishUnpublishDocumentBody {
    asSchoolId: number
    asFinancialYearId: number
    asUserId: number
};
export interface ICheckPublishUnpublishDocumentResult {
    string
};


export interface IGetUserInvestmentMethodDetailsBody {
    asSchoolId: number
    asFinancialYearId: number
    asUserId: number
    asDocumentId: number
    asDocumentTypeId: number
};
export interface IGetUserInvestmentMethodDetailsResult {
    DocumentName: string
    UserName: string
};
export interface ISaveInvestmentDocumentBody {
    asSchoolId: number
    asAcademicYearId: number
    asFinancialYearId: number
    asDocumentId: number
    asFileName: string
    asUserId: number
    asInsertedById: number
    asDocumnetTypeId: number
    asReportingUserId: number
    asSaveFeature: string
    asFolderName: string
    asBase64String: string
};
export interface IGetAllDocumentsListBody {
    asSchoolId: number
    asUserId: number
    asFinancialYearId: number
    asDocumentTypeId: number
    asAcademicYearId: number
    asDocumentId: number
    asReportingUserId: number
    asLoginUserId: number
};
export interface IGetAllDocumentsListResult {
    any: [{
        Id: string
        FileName: string
    }]
};
export interface IGetInvestmentDocumentFileBody {
    asSchoolId: number
    asId: number
};
export interface IGetInvestmentDocumentFileResult {
    Id: string
    FileName: string
};
export interface IDeleteInvestmentDocumentBody {
    asSchoolId: number
    asFinancialYearId: number
    asUpdatedById: number
    asDocumentId: number
    asDocumnetTypeId: number
}


