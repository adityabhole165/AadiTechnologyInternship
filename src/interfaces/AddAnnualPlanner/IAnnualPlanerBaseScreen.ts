export interface IGetAssociatedStdLstForTeacherDropDownBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asUserId: number;
}

export interface IGetAssociatedStdLstForTeacherDropDownResult {
  StandardId: string;
  Original_Standard_Id: string;
  Teacher_Id: string;
  Standard_Name: string;
  User_Id: string;
}

export interface IGetAllDivisionsForStandardDropDownBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asStandardId: number;
}

export interface IGetAllDivisionsForStandardDropDownResult {
  SchoolWise_Standard_Division_Id: string;
  division_id: string;
  division_name: string;
}

export interface IGetAllMonthsDropDownBody {
  asSchoolId: number;
}
export interface IGetAllMonthsDropDownResult {
  MonthID: string;
  Month: string;
  MonthAbbreviation: string;
}

export interface IGetYearsForAnnualPalannerDropDownBody {
  asSchoolId: number;
}

export interface IGetYearsForAnnualPalannerDropDownResult {
  Year: string;
}

export interface IGetEventsDataListBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asMonthId: number;
  asYear: number;
  asStandardId: number;
  asDivisionId: number;
  asEventType: string
}

export interface IGetEventsDataListResult {
  Day: string;
  Event_Date: string;
  Event_Desc: string;
  Event_Title: string;
  Event_ForeColor: string;
  Event_BackColor: string;
  Sort_Order: string;
  Event_Id: string;
  Schoolwise_Event_Detail_Id: string;
  Standard_Id: string;
}
export interface IGetAssociatedStandardsBodyP {
  asSchoolId: number;
  asAcademicYearId: number;
}
export interface IGetAssociatedStandardsResultP {
  school_id: string;
  original_standard_id: string;
  standard_id: string;
  standard_name: string;
}
//eventoverview

export interface IGetAssociatedStandardsEVBody {
  asSchoolId: number;
  asAcademicYearId: number;
}

export interface IGetAssociatedStandardsEVResult {
  school_id: string;
  original_standard_id: string;
  standard_id: string;
  standard_name: string;
}

export interface IGetAllAcademicYearsForSchoolEVBody {
  asSchoolId: number;
  asUserId: number;
  asUserRoleId: number;
}

export interface IGetAllAcademicYearsForSchoolEVResult {
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

export interface IGetAllMonthsDropDownBody {
  asSchoolId: number;
}

export interface IGetAllMonthsDropDownResult {
  MonthID: string;
  Month: string;
  MonthAbbreviation: string;
}

export interface IGetAllEventsBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asMonthId: any;
  asStandardId: any;
}

export interface IGetAllEventsResult {
  EventId: string;
  EventDescription: string;
  StartDateAndTime: string;
  EndDateAndTime: string;
  StartDate: string;
  EndDate: string;
  Standards: string;
  Display_On_Homepage: string;
  DisplayDate: string;
}

export interface INewGetAssociatedStdLstForTeacherDropDownBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asUserId: number;
}

export interface INewGetAssociatedStdLstForTeacherDropDownResult {
  StandardId: string;
  Original_Standard_Id: string;
  Teacher_Id: string;
  Standard_Name: string;
  User_Id: string;
}

export interface INewGetAllMonthsDropDownotBody {
  asSchoolId: number;
}

export interface INewGetAllMonthsDropDownotResult {
  MonthID: string;
  Month: string;
  MonthAbbreviation: string;
}
