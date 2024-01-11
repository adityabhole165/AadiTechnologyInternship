export interface IGetHomeworkDetailBody {
    asSchoolId:number,
   asAcademicyearId:number,
   asHomeworkId:number
  
    
 }
 export interface IGetHomeworkDetailResult {
    Id: number,
    Title: string,
    AttachmentPath: string,
    AssignedDate: string,
    CompleteByDate: string,
    IsPublished: boolean,
    Subject: string,
    StandardDivisionId: null,
    Details: string,
    SubjectId: number,
    flag: string
 
    
    
   
 }
 