export interface IGetLessonPlanListBody{

   asSchoolId:number,
    asAcademicYearId:number,
     asUserId:number, 
     asReportingUserId:number, 
     asStartIndex:number,
      asEndIndex:number, 
      asIsRecordCount:number,
       asStartDate:number, 
       asEndDate:number, 
       asRecordCount:number
}

export interface IGetLessonPlanListResult{

   StartDate:string,
       EndDate:string,
       IsSubmitted:string,
       UserId:string,
       Remarks:string,
       IsSuggisionAdded:string,
       IsSuggisitionRead:string,
       SubmitedByReportingUser:string
}

export interface IDeleteLessonPlanBody{

   asSchoolId:Number, 
   asAcademicYearId:Number,
   asUpdatedById:Number,
   asUserId:Number,
   aasStartDate:string,
   aasEndDate:string
}

export interface IDeleteLessonPlanResult{
}