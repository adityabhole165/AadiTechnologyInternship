export interface IEventList  {
    asMonth : number,
    asAcademicYearId : string,
    asSchoolId: string,
    asYear: number,
    asUserId : string
}

export interface GetEventsInMonthResult {
    Description:    string;
    StartDate:       string;
    StandardList:  string;
    Id: string;
}

//Event details

export interface IEventDetails{
    asAcademicYearId : string,
    asSchoolId :string,
    asEventId :string
}

export interface GetEventsDetailsResult {
    Description : string,
    EndDate : string,
    StartDate : string,
    StandardList : string,
    EventImage : string,
    EventComment : string
}