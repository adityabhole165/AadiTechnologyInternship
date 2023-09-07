export default interface IExamResult  {
    asSchoolId: string,
    asStudentId: string
}

export interface GetStudentExamResult {
    Exam: string,
    ExamId: string,
    Grade: string,
    GrandTotal: string,
    IsFailCriteriaApplicable: string,
    Percentage: string,
    Rank: string,
    Result: string,
    StudentMarksList:Array<IStudentMarksList>
    
    SubjectTotalMarks: string
}

export interface  IStudentMarksList{
    ConsiderInTotal: string,
    EndingMarksRange: string,
   


    ExamStatus: null,
    ForeColor: null,
   
    GradeOrMarks: string,
    IsAbsent: string,
    Marks: string,
    OutOf: string,
    ShowOnlyGrade: string,
    Subject: string,
    SubjectId: string,

} 


export interface IIsPendingFeesForStudent 
{
    asStudentId:string,
    asAcademicYearId:string,
    asSchoolId:string
};

export interface GetPendingFeesForStudentResult {
    
        IsPendingFeesForStudentResult: boolean
    
};


export interface IGetAcademicYearsOfStudent{
    aiSchoolId:string,
    asAcademicYearId:string,
    aiStudentId:string
}

export interface IGetAcademicYearsOfStudentResult{
    GetAcademicYears: Array<IGetAcademicYears> ,    
    GetTerms:  Array<IGetTerms>
} 

export interface IGetAcademicYears{
    AcademicYear: string,
    Id: string
}
export interface IGetTerms{
    TermName: string,
    Id: string
}

export interface IGetReasonforBlockingProgressReport{
    asSchoolId:string,
    asStudentId:string,
    asAcademicYearId:string
}

export interface IGetReasonforBlockingProgressReportResult{
   
    GetReasonforBlockingProgressReportResult : string
}

export interface IGetProgressReportFileName{
    asSchoolId:string,
    asAcademicYearId:string,
    asStudentId:string,
    asLoginUserId:string,
    asTermId:string
}

export interface IGetProgressReportFileNameResult{
   
    GetProgressReportFileNameResult : string
}

export  interface  IProgressReportBody
{
    aiSchoolId:string,
    aiAcademicYearId:string,
    aiStandardId:string,
    aiStandardDivID:string,
    aiStudentId:string,
    aiTermId:string 
}

export  interface  IAcademicYearsForProgressReportBody
{
        aiSchoolId:string,
        aiStudentId:string
    
}

export  interface  IAcademicYearsForProgressReportResult
{
    
        
            AcademicYearId: string,
            AcademicYearName: string
        
    
}

export interface IAcademicYearsForProgressResult{
    AcademicYears : [IAcademicYearsForProgressReportResult]
}

export  interface  IGetTermsForProgressReportBody
{
    aiSchoolId:string,
    aiAcademicYearId:string,
    aiStudentId:string
}
export  interface  IGetTermsForProgressReportResult
{ 
    Terms: [{
        TermName: string,
        Id: string
    }]
}



