export interface IEventList {
  asMonth: number;
  asAcademicYearId: string;
  asSchoolId: string;
  asYear: string;
  asUserId: string;
}

export interface GetEventsInMonthResult {
  GetEventsInMonthResult: [
    {
      Description: string;
      StartDate: string;
      EndDate: string;
      StandardList: string;
      Id: string;
      EventComment: string;
    }
  ];
}

//Event details

export interface IEventDetails {
  asAcademicYearId: string;
  asSchoolId: string;
  asEventId: string;
}

export interface GetEventsDetailsResult {
  Description: string;
  EndDate: string;
  StartDate: string;
  StandardList: string;
  EventImage: string;
  EventComment: string;
}

//GetEventsInMonth
export default interface IGetEventsInMonth {
  asSchoolId: string;
  asAcademicYearId: string;
  asMonth: string;
  asYear: string;
  asUserId: string;
  abIncludeEvents: string;
  abIncludeHolidays: string;
  abIncludeExams: string;
}

export interface IGetEventsInMonthResult {
  Id: number;
  Description: string;
  StartDate: string;
  EndDate: string;
  StandardList: string;
  EventComment: null;
  TypeId: number;
  DisplayDate: string;
}

export interface IGetEventsMonthResult {
  GetEventsInMonthResult: IGetEventsInMonthResult[];
}
export interface IGetFilePathBody {
  aiSchoolId: string;
  aiAcademicYearId: string;
}
