import { string } from "prop-types"

export interface IGetPrePrimaryResultBody {
    
        asSchoolId:number,
        asAcademicYearId:number
    
}

export interface IGetPrePrimaryResultResult {
    SchoolWise_Standard_Division_Id: string,
    TeacherName: string,
    Teacher_Id: string
}

export interface IGetAssessmentBody {
    
    asAcademicYearId:number,
    asSchoolId:number
}
export interface IGetAssessmentResult {
    AssessmentId: string,
    Name: string
}

export interface IGetTeacherXseedSubjectsBody {
    
    asSchoolId:number,
    asAcademicYear_ID:number,
    asTeacherId:number,
    asAssessmentId:number
}
export interface IGetTeacherXseedSubjectsResult {
    StandardDivision: string,
    StandardDivisionID: string,
    SubjectId: string,
    Subject_Name: string,
    Original_Subject_Id: string,
    EditStatus: string,
    SubmitStatus: string,
    IsXseedSubject: string,
    IncompleteRollNoString: string
}