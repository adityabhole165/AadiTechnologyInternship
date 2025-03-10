
export interface SaveHolidayDetailsBody {
    asHolidayName: string,
    asRemarks: string,
    asStartDate: string,
    asEndDate: string,
    asSchoolId: number,
    asAcademicYearID: number,
    asInsertedById: number,
    asAssociatedStandard: string,
    asHoliday_Id: number
}

export interface SaveHolidayDetailsResult {
    string
}

//postman madhe aahe tashi body ani result fortmat with datatypes
export interface IGetHolidaynameAndStartDateEnddateValidationBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asStandardDivIds: number,
    asHolidayId: number,
    asHolidayName: string,
    asHolidayStartDate: string,
    asHolidayEndDate: string
}
export interface IGetHolidaynameAndStartDateEnddateValidationResult {
    HolidayDuplicatenameValidationCount: [
        {
            DuplicateHolidayNameCount: string
        }
    ],
    HolidayStartAndEndDatePredefinedValidationCount: [
        {
            PredefinedStartDateAndEndDateCount: string
        }
    ]
}

export interface IGetAllClassesAndDivisionsBody {

    asSchoolId: Number,
    asAcademicYearId: Number,
    associatedStandard: String
}

export interface IGetAllClassesAndDivisionsResult {
    map(arg0: (item: any, i: any) => void): unknown
    forEach(arg0: (item: any, i: any) => void): unknown
    filter(arg0: (item: any) => boolean): unknown
    map(arg0: (item: any, i: any) => { Id: any; Name: any; Value: any; ParentId: any; IsActive: boolean }): unknown
    SchoolWise_Standard_Division_Id: String,
    Standard_Id: String,
    Standard_Name: String,
    Division_Id: Number,
    Division_Name: String
}

export interface IGetHolidayDetailssBody {
    asSchoolId: Number,
    asAcademicYrId: Number,
    asSortExp: String,
    asStartIndex: Number,
    asPageSize: Number,
    asStandardId: Number,
    asDivisionId: Number
}

export interface IGetHolidayDetailssResult {
    map(arg0: (Item: any, i: any) => { Id: any; Text1: string; Text2: string; Text3: any; Text4: any; Text5: any; TotalRows: any }): unknown
    RowID: String,
    TotalRows: String,
    Holiday_Id: String,
    Holiday_Name: String,
    Holiday_Start_Date: String,
    Holiday_End_Date: String,
    AssociatedStandard: String,
    StartDay: String,
    EndDay: String,
    Remarks: String,
    TotalDays: String
}

export interface IGetHomeworkDetailsBody {
    asSchoolId: Number,
    asAcademicyearId: Number,
    asHomeworkId: Number
}

export interface IGetHomeworkDetailsResult {
    Id: Number,
    Title: String,
    AttachmentPath: String,
    AssignedDate: String,
    CompleteByDate: String,
    IsPublished: Boolean,
    Subject: String,
    StandardDivisionId: Number,
    Details: String,
    SubjectId: Number,
    flag: String
}

export interface IDeleteHolidayDetailsBody {
    asSchoolId: Number,
    asAcademicyearId: Number,
    asHolidayId: Number
}

export interface IDeleteHolidayDetailsResult {
    string
}

export interface IGetHolidayDetailsBody {
    asHoliday_Id:Number,
    asSchoolId:Number,
    asAcademicYearID:Number
}

export interface IGetHolidayDetailsResult {
    string
}

export interface IGetHolidayListBody
{
    asSchoolId: Number,
    asAcademicYearId: Number,
    asStandardId:Number,
    asDivisionId:Number
}
export interface IGetHolidayListResult {
    Name: string,
    StartDate: string,
    EndDate: string,
    ToatalDays: string,
    Standards: string
}

export interface IGetMonthwiseAttendance{
    asSchoolId: Number,
    asAcademicyearId: Number,
    asStanardDivisionId: Number,
}

export interface IGetMonthwiseAttendanceResult{
    StudentAttendanceDetailsList: [{
        RankImagePath: string;
        Roll_No: number;
        Student_Id: null;
        StudentName: string;
        PresentDays: string;
        TotalDays: string;
        Percentage: string;
        MonthwiseDays: [{
            MonthIndex: number;
            MonthName: string;
            Days: string;
        }]
        }]
}

export interface MonthwiseAttendanceIBody {
    asSchoolId: number;
    asAcademicyearId: number;
    asStanardDivisionId: number;
}
export interface MonthwiseAttendanceIResult {
    StudentAttendanceDetailsList: [{
        RankImagePath: string;
        Roll_No: number;
        Student_Id: null;
        StudentName: string;
        PresentDays: string;
        TotalDays: string;
        Percentage: string;
        MonthwiseDays: [{
            MonthIndex: number;
            MonthName: string;
            Days: string;
        }]
    }]
}
