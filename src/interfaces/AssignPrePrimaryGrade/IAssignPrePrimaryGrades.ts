export interface   IGetTestwiseTermBody{
            asSchoolId:Number

    }

    export interface   IGetTestwiseTermResult
    {
        Term_Id: string,
        Term_Name: string
    }




export interface   IGetClassTeachersBody{
        asSchoolId:Number,
        asAcademicYearId:Number

}



export interface   IGetClassTeachersResult
{
        TeacherName: string,
        Teacher_Id: string,
        Designation_Id: string,
        Teacher_First_Name:string,
        Standard_Name: string,
        Division_Name: string,
        Original_Standard_Id: string,
        Original_Division_Id: string,
        SchoolWise_Standard_Division_Id:string
}



export interface   IGetTeacherXseedSubjectsBody
{
        asSchoolId:Number,
        asAcademicYear_ID:Number,
        asTeacherId:Number,
        asAssessmentId:Number
    }

    export interface   IGetTeacherXseedSubjectsResult
    {
        StandardDivision: string,
        StandardDivisionID:string,
        SubjectId: string,
        Subject_Name:string,
        Original_Subject_Id: string,
        EditStatus: string,
        SubmitStatus: string,
        IsXseedSubject: string,
        IncompleteRollNoString: string
    }