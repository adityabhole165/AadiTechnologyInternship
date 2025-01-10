export interface IGetSchoolAttendanceOverviewBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asSelectedDate: string;
}

export interface IGetSchoolAttendanceOverviewResult {
  SchoolWiseStandardDivisionId: number;
  AssociatedHoliday: string;
  StandardId: number;
  StandardName: string;
  DivisionId: number;
  DivisionName: number;
  AttendanceTaken: number;
  PresentStudentWithTotal: string;
}

export interface MDTD_PSTSList {
  StandardId: number;
  Marked_TotalDivision: string;
  Present_TotalStudent: string;
  StandardsPresentStudentPercentage: string;
}

export interface IWeekendStatusList {
  HolidayName: string;
  IsWeekDay: string;
  OutSideAcademicYear: string;
}

export interface IGetSchoolAttendanceOverviewList {
  WeekendStatusList: IWeekendStatusList[];
  ClasswiseAttendanceStatusList: IGetSchoolAttendanceOverviewResult[];
  MDTD_PSTSList: MDTD_PSTSList[];
  Marked_Total_DivisionList: { MarkedDivision_TotalDivision: string }[];
  Present_Total_StudentList: { PresentStudent_TotalStudent: string }[];
  PresentStudent_PercentageList: { PresentStudentPercentage: string }[];
}
