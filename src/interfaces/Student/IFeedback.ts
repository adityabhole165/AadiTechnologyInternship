export interface IGetUserFeedbackBody{
    
        aiUserRoleId: number,
        aiFeedbackTypeId:number,
        asFeedBackFor: string,
        aiSchoolId: number
        sortDirection: string,
        asStartDate: string,
        asEndDate: string,
        sortExpression: string,
        startRowIndex: number,
        iEndIndex: number,
        abIsServiceCall: boolean,
        asDesignationId: string, 
        abIsAccountsCumAdminOfficer: boolean
    
}
export interface IGetUserFeedbackResult{
    UserName: string
    Text: string
    Date: string
    IsSelected: boolean
}
