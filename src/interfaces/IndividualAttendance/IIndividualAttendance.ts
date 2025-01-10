export interface IGetStudentNameBody {
  asSchoolId: number;
  asAcademicYrId: number;
  asDivisionId: number;
}



export interface IGetStudentNameResult {
  StudentList: [
    {
      StudentId: string,
      rollno:string,
      StudentName: string
    }
  ]
}




export interface IGetCalendarForStudentBody {
  asSchoolId: number;
  aStudentId: number;
  aAcademicYearId: number;
  aMonthId: number;
  aYear: number;
}



export interface IGetCalendarForStudentResult {
  RollNo: string;
  StudentId: string;
  RegistrationNo: string;
  StudentName: string;
  DOB: string;
  Day: string;
  Attendance_Date: string;
  Status: string;
  StatusDesc: string;
  StatusDescription: string;
  StatusForeColur: string;
  StatusBackColur: string;
  PresentNumber: string;
  TotalWorkingDays: string;
  JoiningDate: string;
}
export interface ISaveStudentAttendanceBody {
  asSchoolId: number;
  asInsertedById: number;
  asStudentsAttendance: string;
  aStudentId: number;
  aYear: number;
  aMonthId: number;
}
export interface ISaveStudentAttendanceResult {}
