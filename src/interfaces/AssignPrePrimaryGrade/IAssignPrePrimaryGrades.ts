export interface   IGetTestwiseTermBody{
           
            asAcademicYearId:Number,
            asSchoolId:Number

    }

    export interface   IGetTestwiseTermResult
    {
        AssessmentId : string,
        Name: string
    }




export interface   IGetClassTeachersBody{
        asSchoolId:Number,
        asAcademicYearId:Number

}



export interface   IGetClassTeachersResult
{
        Teacher_Id: string,
        TeacherName: string,
        Designation_Id: string,
        Teacher_First_Name: string,
        DesignationSortOrder: string,
        Teacher_Middle_Name: string,
        Teacher_Last_Name: string

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


    export interface   ISubmitExamMarksStatusBody{
        
            asStandard_Division_Id:Number,
            asAssessmentId:Number,
            asSubjectId:Number,
            asAcademicYearId:Number,
            asSchoolId:Number,
            asInserted_By_id:Number,
            asInsertDate:string
        
    }
