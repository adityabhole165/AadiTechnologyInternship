export default interface ISchoolnotice {
  asSchoolId: string;
  asNoticeId: number;
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
