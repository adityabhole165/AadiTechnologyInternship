export default interface IViewschoolnotice {
  asSchoolId: string;
  asNoticeId: string;
  asUserId: string;
}

export interface GetSchoolNoticesResult {
  Content: string;
  Date: string;
  FileName: string;
  Id: string;
  IsText: string;
  Name: string;
}
