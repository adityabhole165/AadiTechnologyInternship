export interface IGetUserFeedbackBody{
    
        aiUserRoleId: string,
        aiFeedbackTypeId:number,
        asFeedBackFor: string,
        aiSchoolId: string
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

    aiSchoolId: string, 
    aiAcademicYrId: string, 
    aiFeedbackfor: string, 
    aiUserId: string, 
    aiFeedbackDescription: string, 
    aiFeedbackTypeId: string, 
    aiInsertedById: string, 
    aiemail: string, 
     aiUserName: string, 
    asMailSubject: string, 
    asAdminMailAddress: string, 
    asLogin: string

}

export interface ISaveFeedbackDetailsResult{

    Message: string
}