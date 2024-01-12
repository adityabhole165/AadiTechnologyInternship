import { number } from "prop-types"

export interface IGetHomeworkListForTeacherBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asStandardDivisionId: number,
    asHomeWorkStatus: string,
    asAssignedDate: string,
    asHomeworkTitle: string

}
export interface IGetHomeworkListForTeacherResult {
    Id: number,
    Title: string,
    AttachmentPath: string,
    AssignedDate: string,
    CompleteByDate: string,
    IsPublished: boolean,
    Subject: string,
    SubjectId: String,
    StandardDivisionId: String,
    className: string,
    Details: string,
    flag: boolean
}
export interface IPublishUnPublishHomeworkBody {

    asSchoolId:number,
    asAcademicYearId:number,
    asHomeworkId:number,
    asReason:string,
    asUpdatedById:string,
    asIsPublish:boolean,
    asIsSMSSent:boolean

}

export interface IGetHomeworkDetailBody {
    asSchoolId:number,
    asAcademicyearId:number,
    asHomeworkId:number,
    
  
    
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
export interface IDeleteHomeworkBody {
    asSchoolId:number, 
    asAcademicYearId:number,
    asHomeworkId:number,
    asUpdatedById:number
}
export interface ISaveHomeworkBody {
     asTitle:string,
    asSubjectId:number,
     asStandardDivisionId:number,
      asAttachmentPath:string,
       asDetails:string, 
       asAssignDate:string, 
       asCompleteByDate:string, 
       asSchoolId:number, 
       asAcademicYearId:number,
        asInsertedById:number,
         asFileName:string,
         asSaveFeature:string,
         asFolderName:string, 
          asBase64String:string,
          asBase64String2:string,
}
export interface IDeleteHomeworkDocumentBody {
    asSchoolId:number,
    asUpdatedById:number,
    asHomeworkId:number,
    asAcademicYearId:number
   
}
export interface IGetTeacherSubjectAndClassSubjectBody {
    asSchoolId:number,
    aTeacherId:number,
    asAcademicYearId:number,
    asStandardDivisionId:number
   
}
export interface IGetTeacherSubjectAndClassSubjectResult {
    Standard_Id: string,
    Standard_Name: string,
    TeacherShortName: string,
    Is_ClassTeacher: string,
    Subject_Name: string,
    Standard_Division_Id: string,
    Teacher_Subject_Id: string,
    Subject_Id: string,
    Teacher_Id: string,
    StandardDivision: string,
    Teacher_Subject: string,
    maxSubjectLecturesInWeek:string,
    MySubject: string
}
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
export interface  IGetSubjectListForTeacherBody {

    asSchoolId: number,
    asAcademicYearId: number,
    asStandardDivisionId: number,
    asHomeWorkStatus: string,
    asHomeworkTitle: string,
    asAssignedDate: string
}

export interface IGetSubjectListForTeacherResult {

    Id: string,
    Title: string,
    AttachmentPath: string,
    AssignedDate: string,
    CompleteByDate: string,
    IsPublished: string,
    Subject: string,
    SubjectId: string,
    StandardDivisionId: string,
    className: string,
    Details: string,
    flag: string

}
export interface  IAllPublishUnpublishAddHomeworkBody {
    asSchoolId:string,
   asAcademicYearId:string,
   asHomeWorkLogId:string,
   asUnpublishReason:string,
   asUpdatedById:string,
   IsPublished:number,
   IsSMSSent:number

}



