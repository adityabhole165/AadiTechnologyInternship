export interface IGetUpcomingStaffBdayListBody {

    aiSchoolId: string,
    aiAcademicYrId: string,
    aiUserRoleId: string,
    asView: string
}

export interface IGetUpcomingStaffBdayListResult {
 
    Date: string,
    UserName: string,
    PhotoPath: string,
    Classes: null
}



export interface IGetUpcomingStaffBdayList{
    BirthdayDetailsData:IGetUpcomingStaffBdayListResult[]
}