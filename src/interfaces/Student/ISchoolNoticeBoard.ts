export interface IGetNoticeBoardDetailsBody {
  aiSchoolId: string;
  aiAcademicYearId: string;
  aiUserRoleId: string;
}

export interface IGetNoticeBoardDetailsResult {
  Message: string;
  StartDate: string;
  EndDate: string;
}

export interface IGetAllActiveNoticesBody {
  asSchoolId: string;
  asUserId: string;
}

export interface IGetAllActiveNoticesResult {
  Name: string;
  FileName: string;
  Date: string;
  Id: string;
  IsText: string;
  Content: string;
  IsImageNotice: boolean;
  DisplayLocation: string;
}
