//aatendance list
export default interface IGetClassAttendance {
  asStdDivId: string;
  asDate: string;
  asAcademicYearId: string;
  asSchoolId: string;
}

export interface GetStudentDetailsResult {
  IsPresent: string;
  JoinDate: string;
  RollNumber: string;
  Status: string;
  StudentId: number;
  StudentName: string;
}
export interface IGetClassAttendanceResult {
  IsPresent: string;
  JoinDate: string;
  RollNumber: string;
  Status: string;
  StudentId: number;
  StudentName: string;
}
export interface IGetAttendanceStatusResult {
  StatusMessage: string;
  AbsentRollNos: string;
  AcademicYearMsg: string;
  AcYrStatusCode: string;
  IsAllPresentOrAbsentMessage: string;
}

export interface IGetStudentDetails {
  asStdDivId: string;
  asDate: string;
  asAcademicYearId: string;
  asSchoolId: string;
}

export interface ISaveAttendance {
  asStandardDivisionId: string;
  asDate: string;
  asAbsentRollNos: string;
  asAllPresentOrAllAbsent: string;
  asUserId: string;
  asSchoolId: string;
  asAcademicYearId: string;
}
export interface ISaveStudentAttendenceBody {
  asSchoolId: number
  asInsertedById: number
  asStudentsAttendanceXML: string
  asAttendanceDate: string
  asStandardDivisionId: number
  asSendMessage: boolean
}

export interface IGetAttendanceStatus {
  asAttendanceDate: string;
  asStanardDivisionId: string;
  asAcademicYearId: string;
  asSchoolId: string;
}

export interface IGetSummaryCountforAttendanceBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asStandardDivisionId: number;
  asAttendanceDate: string;
  asUserId: number;
}

export interface IGetSummaryCountforAttendanceResult {
  summaryCountforAttendance: null;

  listSummaryCountforAttendance: {
    Boys: string;
    Girls: string;
    Total: string;
  };

  listAbsentCountforAttendance: {
    Boys: string;
    Girls: string;
    Total: string;
  };

  listtotalCountforAttendance: {
    Boys: string;
    Girls: string;
    Total: string;
  };

  listAttendanceLists: [
    {
      School_Id: number;
      Standard_Division_Id: number;
      Student_Id: number;
      Academic_Year_Id: number;
      Roll_No: number;
      FullName: string;
      Attendance_Date: string;
      SchoolWise_Attendance_Id: number;
      Is_Present: boolean;
      isApplicable: boolean;
      JoinDate: string;
      Is_HalfDayPresent: boolean;
    }
  ];

  listAttendanceCalender: [
    {
      Att_date: string;
      Status: string;
      Status_Desc: string;
      Status_ForeColur: string;
      Status_BackColur: string;
    }
  ];
  listTotalStudentAttendance: {
    TotalStudents: string;
    PresentStudents: string;
    PresentDivisions: string;
    TotalDivisions: string;
  };

  listPresentGendersAttendance: {
    PresentBoys: string;
    PresentGirls: string;
    Total: string;
  };
}

export interface IDeleteAttendanceBody {
  asSchoolId: number;
  asAttendanceDate: string;
  asAcademicYearId: number;
  asStdDivId: number;
}

export interface IGetClassTeachersBodynew {
  asSchoolId: number;
  asAcadmicYearId: number;
  asTeacher_id: number;
}

export interface IGetClassTeachersResultnew {
  TeacherName: string;
  Teacher_Id: string;
  Designation_Id: string;
  Teacher_First_Name: string;
  Standard_Name: string;
  Division_Name: string;
  Original_Standard_Id: string;
  Original_Division_Id: string;
  SchoolWise_Standard_Division_Id: string;
  Is_PrePrimary: string;
}
