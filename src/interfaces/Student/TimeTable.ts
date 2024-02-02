export default interface ITimetable {
  asSchoolId: string;
  asAcademicYearId: string;
  asStandardDivId: string;
  asTeacherId: string;
  asIsTeacher: string;
}

export interface IWeekdays {
  asSchoolId: string;
  asAcademicYearId: string;
}
export interface GetWeekDaysResult {
  GetWeekDaysResult: [
    {
      WeekDay: string;
    }
  ];
}

export interface GetTimetableResult {
  GetTimeTableResult: {
    TimeTableList: [
      {
        LectureNumber: string;
        Subject: string;
        WeekDay: string;
        WeekDayId: string;
      }
    ];
    AdditionalLecture: [
      {
        Name: string;
        Number: 2;
        ClassName: string;
        Day: string;
      }
    ];
  };
}
