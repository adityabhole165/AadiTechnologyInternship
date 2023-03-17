import { ReactNode } from "react"


export default interface IOnlineExamProgressReportBody {
    
        aiStudentId:string,
        aiSchoolId:string,
        aiAcademicYrId:string,
        asStdDivId:string
    
    
}export interface OnlineExamResult{
    SchoolInformation: SchoolInformation,
    Students: Students[],
    OnlineExams: OnlineExams[]
    Subjects: Subjects[],
    MarkInformation: MarkInformation[]
}
export interface SchoolInformation{
    SchoolName: string,
    SmsSenderName: null,
    SchoolId: null,
    SiteURL: null,
    TermsSchoolName: null,
    FolderName: null,
    OrgName: string
} 
export interface Students{
    StudentId: number,
    RollNo: number,
    StudentName: string,
    ClassName: string,
    AcademicYear: string
} 
export interface OnlineExams {
    Id: number,
    Name: string,
    OnlineExamConfigurationId: number
}
export interface Subjects{
    SortOrder: number,
    Name : string,
    SubjectId: number
} 
export interface MarkInformation{
    StudentId: number,
    Marks: number,
    OutOfMarks: number,
    OnlineExamConfigurationId: number,
    ExamId: number,
    SubjectId: number
    
}
// export interface OnlineExamProgressReport {
    
// }