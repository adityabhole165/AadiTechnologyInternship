//Unread Messages
export interface IUnreadMessages {
    aiSchoolId: string,
    aiAcademicYrId: string,
    aiReceiverId: string,
    aiReceiverRoleId: string,
    asProfilePicUpdDt: string
}

//Upcoming Events
export interface IUpcomingEventsList {
    aiSchoolId: string,
    aiAcademicYrId: string,
    asUserRoleId: string,
    aiUserId: string,
    aiUserRoleId: string,
    isScreenFullAccess: string
}

export interface GetUpcomingEventsResult {
    EventTitle: string,
    StandardName: string,
    EndDateUniversal: string,
    StartDate: string,
    EventType:string

}

//Birthdays
export interface IBirthdays {
    aiSchoolId: string,
    aiAcademicYrId: string,
    aiUserRoleId: string,
    asView: any
}

export interface GetUpcomingStaffBdayList {
    Date: string,
    UserName: string,
    PhotoPath: string
}

//Photo album
export interface IPhotoAlbum {
    aiSchoolId: string,
    aiMonth: any,
    aiYear: any,
    abSetPreviousMonth: string,
    aiUserId: string

}
// Feedback
export interface IFeedbackList {
    
    aiUserRoleId:number,
    aiFeedbackTypeId:number,
    asFeedBackFor:string,
    aiSchoolId:number,
    sortDirection:string,
    asStartDate:string,
    asEndDate:string,
    sortExpression:string,
    startRowIndex:number,
    iEndIndex:number,
    abIsServiceCall:boolean,
    asDesignationId:string, 
    abIsAccountsCumAdminOfficer:boolean

}
export interface GetFeedbackResult {
    UserName:string,
    Text: string,
    Date: string,
   
}

export interface IMsgfrom {
    
        aiSchoolId:number 
}

export interface GetFMsgfromResult {
   
    ConfigureMenuContent:string,
   
}

