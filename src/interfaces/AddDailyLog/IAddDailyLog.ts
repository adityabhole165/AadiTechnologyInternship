export interface ISaveDailyLogBody{
    asHomeWorkLogId:number,
    asStdDivId:number,
     asAttachmentName:string,
      asSchoolId:number,
      asAcademicYearId:number,
       asInsertedById:number
}

export interface ISaveDailyLogResult{
        
}

export interface IGetAllHomeworkDailyLogsBody{
    asSchoolId:number,
    asFilter:string,
    asStdDivId:number,
    asSortExpression:string,
    asStartIndex:number,
    asEndIndex:number,
    asUserId:number
}

export interface IGetAllHomeworkDailyLogsResult{
    Id: string,
    Date: string,
    AttchmentName: string,
    IsPublished: string   
}
