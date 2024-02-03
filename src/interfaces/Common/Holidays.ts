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
