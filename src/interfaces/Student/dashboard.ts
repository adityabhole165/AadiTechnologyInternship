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
