export interface IGetStandardDivisionOfTeacherBody {
    asSchoolId: Number,
    asAcademic_Year_Id: Number,
    asTeacher_Id: Number
}

export interface IGetStandardDivisionOfTeacherResult {
    standard_Id: string,
    division_Id: string,
    standard_Name: string,
    division_Name: string,
    SchoolWise_Standard_Division_Id: string,
    StandardDivision: string
}

export interface IGetStudentsListBody {
    asSchoolId: Number,
    asAcadmicYearId: Number,
    asStandard_Id: Number,
    asDivision_Id: Number,
    asSchoolWise_Standard_Division_Id: Number,
    asStartIndex: Number,
    asEndIndex: Number,
    asSortExpression: String
}

export interface IGetStudentsListResult {
    Name: string
    First_Name: string
    Last_Name: string
    Middle_Name: string
    Roll_No: string
    SchoolWise_Standard_Division_Id: string
    School_Id: string
    User_Login: string
    Is_Locked: string
    Email_Address: string
    Designation_Id: string
    Mobile_Number: string
    Academic_Year_ID: string
    YearWise_Student_Id: string
    Deactivation_Reason: string
    Enrolment_Number: string
    DOB: string
    Sex: string
    Parent_Name: string
    User_Id: string
    SchoolWise_Student_Id: string
    StandardDivision: string
    RollNoName: string
    Is_Leave: string
    Photo_file_Path: string
    RowNo: string
    SchoolLeft_Date: string
    CancellationFormNo: string
    Admission_date: string
    Joining_Date: string
    Standard_Id: string
    Division_id: string
    Category_Name: string
    IsConsideredForMessage: string
    IsAttendanceAvailable: string
    StudentIsOnLeave: string
    Photo_file_Path_Image: string
    TotalRows: string
}
