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