export default interface IHolidays {
  asAcademicYearId: string;
  asSchoolId: string;
  asStandardId: string;
  asDivisionId: string;

}

export interface GetHolidayListResult {
  GetHolidayListResult: [
    {
      EndDate: string;
      Name: string;
      Standards: string;
      StartDate: string;
      ToatalDays: string;
    }
  ];
}

export interface IHolidaysFA {
  asSchoolId: number,
  asAcademicYrId: number,
  asSortExp: string,
  asStartIndex: number,
  asPageSize: number,
  asStandardId: number,
  asDivisionId: number
}

export interface GetHolidayListResult1 {
  // GetHolidayListResult1: [
  // {
  RowID: string;
  Holiday_Id: string;
  TotalRows: string;
  Holiday_Start_Date: string;
  Holiday_End_Date: string;
  Holiday_Name: string;
  AssociatedStandard: string;
  Remarks: string;
  TotalDays: string;
  Standards: string;

  // }
  // ];
}

export interface IGetHolidayBody {
  asHoliday_Id: number;
  asSchoolId: number;
  asAcademicYearID: number;
}

export interface EditHolidayDetailsResult {
  EditHolidayListResult: [
    {
      Holiday_Id: string,
      Holiday_Name: string,
      Holiday_Start_Date: string,
      Holiday_End_Date: string,
      AssociatedStandard: string,
      Remarks: string,
      Is_Deleted: string
    }
  ];
}

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

// GetAllClassAndDivisons

export interface IAllClassesAndDivisionsBody {

  asSchoolId: number,
  asAcademicYearId: number

}

export interface IAllClassesAndDivisionsResult {

  SchoolWise_Standard_Division_Id: string,
  Standard_Id: string,
  Standard_Name: string,
  Division_Id: string,
  Division_Name: string

}

export interface ISelectedStandardAndDivisionCheckBoxBody {

  asSchoolId: number,
  asEventId: number

}

export interface ISelectedStandardAndDivisionCheckBoxResult {

  StandardDivisionId: string,
  Event_Id: string,
  Standard_Name: string,
  Division_Name: string

}