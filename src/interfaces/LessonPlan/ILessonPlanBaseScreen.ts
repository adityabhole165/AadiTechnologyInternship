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