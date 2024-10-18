//Unread Messages
export interface IUnreadMessages {
  aiSchoolId: number;
  aiAcademicYrId: number;
  aiReceiverId: number;
  aiReceiverRoleId: number;
}
export interface IUnreadMessagesResult {
  UnreadMessages: [
    {
      SenderUserId: string;
      Subject: string;
      UserName: string;
      Date: string;
      MessageCount: number;
      ReturnUrl: string;
      MessageDetailsId: number;
      MessageReceiverDetailsId: number;
    }
  ],
  SenderPhoto: [
    {
      Id: string;
      Photo: string;
    }
  ],
  UnreadMessageCount: number;
  UserProfilePicData: [
    {
      UpdateDate: string;
      ProfilePicture: string;
    }
  ]
}

//Upcoming Events
export interface IUpcomingEventsList {
  aiSchoolId: string;
  aiAcademicYrId: string;
  asUserRoleId: string;
  aiUserId: string;
  aiUserRoleId: string;
  isScreenFullAccess: string;
}

export interface GetUpcomingEventsResult {
  EventTitle: string;
  StandardName: string;
  EndDateUniversal: string;
  StartDate: string;
  EventType: string;
}

//Birthdays
export interface IBirthdays {
  aiSchoolId: string;
  aiAcademicYrId: string;
  aiUserRoleId: string;
  asView: any;
}

export interface GetUpcomingStaffBdayList {
  Date: string;
  UserName: string;
  PhotoPath: string;
}

//Photo album
export interface IPhotoAlbum {
  aiSchoolId: string;
  aiMonth: any;
  aiYear: any;
  abSetPreviousMonth: string;
  aiUserId: string;
}
export interface IPhotoAlbumResult {
  Name: string;
  UserId: Number;
  Id: Number;
  Year: Number;
  ImageList: [
    {
      Description: string;
      ImageId: Number;
      ImagePath: string;
    }
  ];
  Month: Number;
}

//Photo album
export interface IPhotoAlbumBody {
  aiSchoolId: number;
  aiMonth: number;
  aiYear: number;
  iFirstLoad: boolean;
  aiUserId: number;
}
export interface IPhotoAlbumDResult {
  Id: number;
  Name: string;
  ImageList: [
    {
      Description: string;
      ImageId: Number;
      ImagePath: string;
    }
  ];
  Month: number;
  Year: number;
  UserId: number;
}

// Feedback
export interface IFeedbackList {
  aiUserRoleId: number;
  aiFeedbackTypeId: number;
  asFeedBackFor: string;
  aiSchoolId: number;
  sortDirection: string;
  asStartDate: string;
  asEndDate: string;
  sortExpression: string;
  startRowIndex: number;
  iEndIndex: number;
  abIsServiceCall: boolean;
  asDesignationId: string;
  abIsAccountsCumAdminOfficer: boolean;
}
export interface GetFeedbackResult {
  UserName: string;
  Text: string;
  Date: string;
}

export interface IMsgfrom {
  aiSchoolId: number;
}

export interface GetFMsgfromResult {
  ConfigureMenuContent: string;
}
export interface INewMessageCount {
  asSchoolId: string;
  asUserId: string;
  asAcademicYearId: string;
}
export interface GetNewMessageCountResult {
  MESSAGECOUNT: number;
}
// user save login details

export interface ISaveUserLoginDetailsBody {
  asSchoolId: string;
  asUserId: string;
}
export interface ISaveUserLoginDetailsResult {
  LastLoginDetails: string;
}

export interface IWeeklyAttendanceBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asStandardDivisionId: number;
}

export interface IWeeklyAttendanceResult {
  GetDayDates: [
    {
      Attendance_Date: string;
      DayName: string;
    }
  ],
  listAttendanceCalender: [
    {
      Att_date: string;
      Status: string;
      Status_Desc: string;
      Status_ForeColur: string;
      Status_BackColur: string;

    }
  ],
  WeeklyAttendanceDetails: [
    {
      Attendance_Date: string;
      PresentBoys: string;
      PresentGirls: string;
      AbsentBoys: string;
      AbsentGirls: string;
      TotalBoys: string;
      TotalGirls: string;
      TotalBoys_Girls: string;
      TotalPresent: string;
      TotalAbsent: string;
      TotalPresentPercentage: string;
      TotalBoysPresentPercentage: string;
      TotalGirlsPresentPercentage: string;
      TotalBoysAbsentPercentage: string;
      TotalGirlsAbsentPercentage: string;
      TotalBoysPercentage: string;
      TotalGirlsPercentage: string;
      TotalAbsentPercentage: string
    }
  ],

}

export interface IApprovalProcessBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asUserId: number;
}

export interface IApprovalProcessResult {
  GetTopLeaveDetails: [
    {
      RowNo: number;
      Id: number;
      UserId: number;
      LeaveId: number;
      Status: string;
      StartDate: string;
      EndDate: string;
      TotalDays: string;
      Description: string;
      StatusId: number;
      UserName: string;
      IsApprovedByApprover: boolean;
      LeaveName: string;
      LeaveFullName: string;
      LeaveBalance: string;
      IsLeaveUpdatedInPayroll: boolean;
    }
  ],
  GetTopRequisitionDetails: [
    {
      RequisitionID: string;
      RequisitionCode: string;
      RequisitionName: string;
      StatusName: string;
      School_Id: number;
      Created_Date: number;
      StatusID: number;
      CreatedId: number;
      CreaterName: string;
      NextDesignationId: number;
      ExpiryDate: string;
      Editable: boolean;
      IsDelete: boolean;
      IsFinalApproval: boolean;
      RequisitionDescription: string;
    }
  ],
  GetTopAppraisalDetails: [],
}


