//Get year

export interface IYearList {
  asSchoolId: number;
  asUserId: number;
  asUserRoleId: number;
}

export interface AllAcademicYearsForSchoolResult {
  Academic_Year_ID: string;
  School_Id: string;
  YearValue: string;
  Start_date: string;
  End_Date: string;
  School_ReOpen_Date: string;
  Is_Current_Year: string;
  Is_Close_Year: string;
  Is_NewlyCreated: string;
  Is_FinalYear_Generated: string;
  Is_Deleted: string;
  School_Name: string;
}