export interface IAllPrimaryClassTeachersBody
{
asSchoolId:Number,
asAcademicYearId:Number
}


export interface IAllPrimaryClassTeachersResult
{
    TeacherName: string,
    Teacher_Id: string,
    Designation_Id: string,
    Teacher_First_Name: string,
    Standard_Name: string,
    Division_Name: string,
    Original_Standard_Id: string,
    Original_Division_Id: string,
    StandardDivisionId: string
}


export interface   IGetTestwiseTermBody{
    asSchoolId:Number

}

export interface   IGetTestwiseTermResult
{
Term_Id: string,
Term_Name: string
}



export interface IStudentswiseRemarkDetailsToExportBody
{
    asSchoolId:Number,
    asAcademicYearId:Number,
    asStandardDivId:Number,
    asStudentId:Number,
    asTermId:Number
}


export interface IStudentswiseRemarkDetailsToExportResult{

    listStudentDetails: [
        {
            YearwiseStudentId: string,
            RollNo: string,
            ClassName: string,
            StudentName: string
        },
    ]

    listTermDetails: [
        {
            YearwiseStudentId: string,
            Remark: string,
            RemarkName: string
        },
    ]


    listRemarkDetails: [
        {
            RemarkConfigId: string,
            RemarkName: string
        }
    ]

}


export interface IUpdateAllStudentsRemarkDetailsBody{

StudentwiseRemarkXML:string
asSchoolId:Number,
asAcademicYearId:Number,
asInsertedById:Number,
asStandardDivId:Number,
asTermId:Number


}



export interface IStudentListToCaptureHeighthWeightBody

    {
        asStdDivId:Number ,
    asAcademic_Year_Id:Number ,
    asSchoolId:Number,
    asTerm_Id:Number
}
    


export interface IStudentListToCaptureHeighthWeightResult

{
    Standard_Id: string,
    Division_Id: string,
    YearWiseStudentId: string,
    StudentName: string,
    Academic_Year_Id: string,
    RollNo: string,
    SchoolWise_Standard_Division_Id: string
    IsLeftStudent: string,
    Joining_Date: string,
    Teacher_Id:string,
    Height: string,
    Weight:string
}
    
export interface IGetAllStudentswiseRemarkDetailsBody

{
    asSchoolId:Number,
    asAcademicYearId:Number,
    asStandardDivId:Number,
    asStudentId:Number,
    asTermId:Number
}




export interface IGetAllStudentswiseRemarkDetailsResult
{
    RollNo: string,
    YearwiseStudentId: string,
    StudentName: string,
    Remark: string,
    StudentwiseRemarkId: string,
    StandardDivisionId: string,
    RemarkName: string,
    RemarkConfigId:string,
    TermId: string,
    SalutationId: string,
    FName: string,
    MName: string,
    LName: string,
    IsPassedAndPromoted: Number,
    IsLeftStudent: string,
    OldRemark: string
}