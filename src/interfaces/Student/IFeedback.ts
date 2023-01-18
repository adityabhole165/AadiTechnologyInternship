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

export interface IGetUserFeedbackDetails{
    GetUserFeedbackDetails:IGetUserFeedbackResult[]
}


//Add Feedback
export interface  ISaveFeedbackDetailsBody{

    aiSchoolId: number, 
    aiAcademicYrId: number, 
    aiFeedbackfor: string, 
    aiUserId: number, 
    aiFeedbackDescription: string, 
    aiFeedbackTypeId: number, 
    aiInsertedById: number, 
    aiemail: string, 
     aiUserName: string, 
    asMailSubject: string, 
    asAdminMailAddress: string, 
    asLogin: string

}

export interface ISaveFeedbackDetailsResult{

    Message: string
}