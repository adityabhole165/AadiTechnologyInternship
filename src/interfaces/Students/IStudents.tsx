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
    Name: string,
    Roll_No: string,
    Is_Locked: string,
    Enrolment_Number: string,
    DOB: string,
    Sex: string,
    SchoolWise_Standard_Division_Id: string,
    StandardDivision: string,
    Is_Leave: string,
    SchoolLeft_Date: string,
    IsAttendanceAvailable: string,
    StudentIsOnLeave: string,
    Photo_file_Path_Image: string,
    TotalRows: string
}
