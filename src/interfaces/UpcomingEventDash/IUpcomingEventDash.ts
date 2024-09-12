export interface IUpcomingEventDashBody {
    aiSchoolId: number;
    aiAcademicYrId: number;
    aiUserId: number;
    aiUserRoleId: number;
    isScreenFullAccess: boolean;
}

export interface IUpcomingEventDashResult {
    UpcomingEventsData: [
        {
            StartDate: string;
            EndDate: string;
            EndDateUniversal: string;
            EventDescription: string;
            EventTitle: string;
            StandardName: string;
            EventType: string;
            EventId: string;
        }
    ];
}