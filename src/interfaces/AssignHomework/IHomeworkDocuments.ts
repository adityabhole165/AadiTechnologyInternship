
export interface IGetAllHomeworkDocumentsBody {
    asSchoolId:number,
    asHomeworkId:number,
    asAcademicyearId:number
   
}
export interface IGetAllHomeworkDocumentsResult {
       Id: number,
        AttachmentName: string,
        HomeworkId: string,
        SchoolId: string,
        AcademicYearId: string,
        IsDeleted: false,
        InsertedById: string,
        InsertDate: string,
        UpdatedById: number,
        UpdateDate: string
   
}
export interface IDeleteHomeworkDocumentBody {
    asSchoolId:number,
    asUpdatedById:number,
    asHomeworkId:number,
    asAcademicYearId:number
   
}
