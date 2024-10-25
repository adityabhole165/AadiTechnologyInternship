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
  GetTopAppraisalDetails: [
    {
      UserId: number;
      UserName: string;
      IsSupervisor: boolean;
      UpdateDate: string;
      Status: string;
    }
  ],
}

export interface IProfileBody {
  asSchoolId: number;
  asAcademicYearId: number;
  asTeacherID: number;
  asUserId: number;
}

export interface IProfileResult {
  TeacherPersonalDetails: {
    Teacher_Id: number;
    User_Id: number;
    School_Id: number;
    Teacher_First_Name: string;
    Teacher_Middle_Name: string;
    Teacher_Last_Name: string;
    Teacher_Designation_Name: string;
    Local_Address: string;
    Local_City: string;
    Local_Pincode: string;
    Local_State: string;
    Permanent_Address: string;
    Permanent_City: string;
    Permanent_Pincode: string;
    Permanent_State: string;
    Phone_Number: string;
    Mobile_Number: string;
    Date_of_Birth: string;
    Nationality: string;
    Salutation_Id: number;
    Is_LocalAddress: string;
    Is_Temporary: number;
    GradePay: number;
    Exprince_In_Years: number;
    Exprince_In_Months: number;
    Achivements: string;
    Religion_Id: number;
    Category_Id: number;
    Designation_Id: number;
    Caste_SubCaste: string;
    Salutation_Name: string;
    Category_Name: string;
    Religion_Name: string;
    Date_of_Retirement: string;
    EmergencyContactNumber: string;
    IsInternalUser: boolean;
    AssociatedStandardCategory: number;
    TypeId: number;
  },
  TeacherEducationDetails: [
    {
      Qualification_Id: number;
      Qualification_Name: string;
      Specialization: string;
      Year_Of_Passing: number;
      Passing_University: string;
      Class_Id: number;
      Class_Name: string;
    }
  ],
  SubjectDetails: [
    {
      Subject_Id: number;
      Original_Subject_Id: number;
      Teacher_Id: number;
      Subject_Name: string;
      Teacher_Subject_Id: number;
    }
  ],
  StandardDetails: [
    {
      Standard_Id: number;
      Original_Standard_Id: number;
      Teacher_Id: number;
      Standard_Name: string;
      Teacher_Standard_Id: number;
    }
  ],
  TeacherLoginDetails: {
    User_Login: string;
    User_Password: string;
    Email_Address: string;
    CanApproveRequisition: string;
    CanCreateGeneralRequisition: string;
    CanSanctionLeave: string;
    CanCreateVoucher: boolean;
    CanApproveVoucher: boolean;
    CanSelfApprove: boolean;
    CanDeleteVoucher: boolean;
    CanEditOldFinancialYear: boolean;
    CanPublishUnpublishExam: boolean;
    ShowAllSentSMS: boolean;
  },
  GetTopRequisitionDetails: [],
  EmployeeDetails: [
    {
      PanNo: string;
      JoiningDate: string;
      PermanentDate: string;
      ResignationDate: string;
      PanAttachment: string;
      StaffStatusId: string;
      StatusName: string;
    }
  ]
}


