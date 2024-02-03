export default interface ISent {
  asUserId: string;
  asAcademicYearId: string;
  asSchoolId: string;
}

export interface GetAllSentSMSPermissionAndCountsResult {
  AllowedSMSCount: string;
  ExceededSMSCount: string;
  IsAllSentSMSAllowed: boolean;
  SentSMSCount: string;
}
