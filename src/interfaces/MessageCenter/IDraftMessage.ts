export interface ISaveDraftMessageBody  {
    aiDraftId:string,
    aoMessage:{
        SenderUserId:string,
        SchoolId:string,
        AcademicYearId:string,
        ReceiverUserId:string,
        DisplayText:string,
        Subject:string,
        Body:string,
        ReceiverUserIdCc:string,
        DisplayTextCc:string
}
}

export interface ISaveDraftMessageResult  {
    Message: string
}


export interface IGetAllDraftMessageBody  {
    aiSchoolId:string,
    aiAcademicYearId:string,
    aiUserId:string,
    asFilter:string,
    aiMonthId:string,
    asOperator:string,
    asDate:string
}

export interface IGetAllDraftMessageResult  {
    Id: string,
    Subject: string,
    DraftDate: string
}

export interface IGetAllDraftResult  {
    GetAllDraftMessageDetails:[IGetAllDraftMessageResult]
}

export interface IGetDraftMessageBody  {
    aiSchoolId:string,
    aiAcademicYearId:string,
    aiUserId:string,  
    aiDraftId:string 
}

export interface IGetDraftMessageResult  {
  
}

export interface IDeleteDraftMessageBody  {
    aiSchoolId:string,
    aiAcademicYearId:string,
    aiUserId:string,  
    aiDraftId:string 

    
}

export interface IDeleteDraftMessageResult  {
    Message: string
}