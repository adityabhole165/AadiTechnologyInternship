export interface IAddAnnualPlannerBody{
    asSchoolId:number,
    asAcademicYearId:number,
    asLinkUrl:string,
    asUpdatedById:number
   }

   export interface IGetFileDetailsBody{
    asSchoolId:number,
    asAcademicYearId:number
   }

   export interface IGetFileDetailsResult{
        LinkId: string,
        SchoolId: number,
        AcademicYearId: number,
        LinkUrl: string,
        UpdatedById: number
   }

   export interface IDeleteFileDetailsBody{
    asSchoolId:number,
 asAcademicYearId:number
   }

 
