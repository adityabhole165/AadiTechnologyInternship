export interface IAddAnnualPlannerBody{
    asSchoolId:number,
    asAcademicYearId:number,
    asSaveFeature:string,
    asFileName:string,
    asFolderName:string,
    asBase64String:string,
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

 
