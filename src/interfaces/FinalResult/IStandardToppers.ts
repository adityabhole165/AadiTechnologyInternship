export interface IGetStandardExamDropdownBody {
    asSchoolId:Number, 
     asAcademicYearId:Number,
       asStandardId:Number
    }
    export interface IGetStandardExamDropdownResult{
        SchoolWise_Test_Id: String,
        SchoolWise_Test_Name:String,
        Original_SchoolWise_Test_Id: String,
        Sort_Order: String
    }
    export interface IGetSubjectDropdownBody{
        asSchoolId: number,
    asAcademicYearId: number,
    asStandardDivId: number,
    asExamId: number
}
export interface IGetSubjectDropdownResult {
    Subject_Id: string,
    Subject_Name: string

}
export interface IGetStandardToppersListBOdy {
    asSchoolId: number,
    asAcademicYearId: number,
    asStandardId: number,
    asExamId: number,
    asSubjectId: number
}
export interface IGetStandardToppersListResult {

    GetTopperList: [{
        TopperRank: string,
        Rank_Image: string,
        Student_Id: string,
        Roll_No: string,
        Student_Name: string,
        Marks_Scored: string,
        Total_Marks: string,
        Marks: string,
        Standard: string
    }];
    GetSelectedSubjectTopperList: [
        {
            TopperRank: string,
            Rank_Image: string,
            Student_Id: string,
            Subject_Id: string,
            Subject_Name: string,
            Roll_No: string,
            Student_Name: string,
            Total_Marks_Scored: string,
            Subject_Total_Marks: string,
            Marks: string,
            Standard: string
        }
    ]

}
