export interface IGetClassTeachersBody {
    asSchoolId: number
    asAcademicYearId: number
    asTeacherId: number
}
export interface IGetClassTeachersResult {
    TeacherName: string
    Teacher_Id: string
    Designation_Id: string
    Teacher_First_Name: string
    Standard_Name: string
    Division_Name: string
    Original_Standard_Id: string
    Original_Division_Id: string
    SchoolWise_Standard_Division_Id: string
}


export interface IGetStudentsToTransferMarksBody {
    asSchoolId: number
    asAcademicYearId: number
    asStandardDivisionId: number
    asName: string
    asEndIndex: number
    asStartRowIndex: number
}



export interface ITransferStudentSubjectsMarkDetailsListResult {
    TransferStudentSubjectsMarkDetailsList: [{
        YearwiseStudentId: string
        RegNo: string
        RollNo: string
        StudentName: string
        ClassName: string
        Standard_Division_Id: string
        SubjectId: string
        CurrentApplicableSubjects: string
    }]
    TransferStudentSubjectsMarkDetailsCountList: [{
        Count: string
    }]


}


export interface IGetOptionalSubjectsForMarksTransferBody {
    asSchoolId: number
    asAcademicYearId: number
    asStandardDivisionId: number
}


export interface IGetOptionalSubjectsForMarksTransferResult {
    OptionalSubjectsId: string
    ParentOptionalSubjectId: string
    OptionalSubjectName: string
    NoOfSubjects: string
    SchoolWiseStandardDivisionId: string
    SubjectId: string
    SubjectGroupId: string
    ChildOptionalSubjectId: string
    IsDefault: string
    SubjectName: string
  }


export interface ITransferOptionalSubjectMarksBody {
    asSchoolId: number
    asAcademicYearId: number
    asUserId: number
    asStudentTransferMarksXml: string
}
