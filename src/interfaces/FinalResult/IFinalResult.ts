export interface IClassTeacherListBody{
    asSchoolId: number,
    asAcademicYearId: number
}
export interface IClassTeacherListRsult
    {
        Teacher_Id: string,
        StdDivId: string,
        TeacherName:string,
        Original_Standard_Id: string,
        Original_Division_Id: string
}
export interface IGetPagedStudentBody{
    asSchoolId:string,
    asAcademicyearId:string,
    asStandardDivisionId:string,
    SortExp:string,
    prm_StartIndex:number,
    PageSize:number
}
export interface IGetPagedStudentResult{
    RowID:number,
    TotalRows:number,
    Name:string,
    StudentName:string,
    Roll_No:number,
    SchoolWise_Standard_Division_Id:number,
    School_Id:number,
    Academic_Year_ID: number,
    Standard_Id: number,
    Division_id: number,
    Student_Id: number,
    Expr1: number,
    Enrolment_Number: number,
    Admission_Date: string,
    First_Name: string,
    Middle_Name: string,
    Last_Name: string,
    Mother_Name:string,
    DOB: string,
    Sex: string,
    Parent_Name: string,
    Parent_Occupation: number,
    Address: string,
    City: string,
    Pincode:string,
    State: string,
    Residence_Phone_Number: string,
    Mobile_Number:string,
    Category_Id: number,
    CasteAndSubCaste: string,
    User_Id: number,
    SchoolWise_Student_Id: number,
    Is_Deleted:string,
    Result: string,
    Is_ResultGenrated:string,
    Total_Marks_Scored: number,
    Total_Marks: number,
    Marks: string,
    Percentage: string,
    Grade_Name: string,
    Status:string
}
