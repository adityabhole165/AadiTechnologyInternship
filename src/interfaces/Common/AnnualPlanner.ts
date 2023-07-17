export interface IEventList {
    asMonth: number,
    asAcademicYearId: string,
    asSchoolId: string,
    asYear: string,
    asUserId: string
}

export interface GetEventsInMonthResult {
    GetEventsInMonthResult: [{
        Description: string;
        StartDate: string;
        EndDate: string;
        StandardList: string;
        Id: string;
        EventComment: string
    }]
}

//Event details

export interface IEventDetails {
    asAcademicYearId: string,
    asSchoolId: string,
    asEventId: string
}

export interface GetEventsDetailsResult {
    Description: string,
    EndDate: string,
    StartDate: string,
    StandardList: string,
    EventImage: string,
    EventComment: string
}

export default interface IGetUpcomingEventBody {
 
    aiAcademicYrId: string,
    aiSchoolId: string,
    aiUserId: string,
    aiUserRoleId: string,
    isScreenFullAccess: string
}



export interface IGetUpcomingEventResult {
    StartDate: string,
    EndDate: string,
    EndDateUniversal: string,
    EventDescription: null,
    EventTitle: string,
    StandardName: string,
    EventType:string,
    EventId:number
}

export interface IGetUpcomingeventResult{
    UpcomingEventsData:IGetUpcomingEventResult[]
};